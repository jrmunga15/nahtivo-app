-- Nahtivo: tablas de reservas y suscriptores
-- Pegar y correr en Supabase: SQL Editor > New query > Run

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  experience_slug text not null,
  locale text,
  reservation_date date not null,
  people integer not null,
  full_name text not null,
  email text not null,
  phone text not null,
  notes text,
  confirmation_code text not null,
  total_usd numeric not null,
  created_at timestamptz not null default now()
);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  interest text not null,
  created_at timestamptz not null default now()
);

alter table reservations enable row level security;
alter table subscribers enable row level security;

-- Postgres has no "create policy if not exists", so drop first to make this
-- whole file safe to run more than once.
drop policy if exists "Allow public inserts" on reservations;
drop policy if exists "Allow public inserts" on subscribers;
drop policy if exists "Allow authenticated read" on reservations;
drop policy if exists "Allow authenticated read" on subscribers;
drop policy if exists "Allow authenticated delete" on reservations;
drop policy if exists "Allow authenticated delete" on subscribers;

create policy "Allow public inserts" on reservations
  for insert to anon
  with check (true);

create policy "Allow public inserts" on subscribers
  for insert to anon
  with check (true);

-- Admin panel: only signed-in Supabase Auth users can read the data.
-- (Superseded further down once cuentas de turistas are added — kept here
-- so this top section still works if run on its own against a fresh DB.)
create policy "Allow authenticated read" on reservations
  for select to authenticated
  using (true);

create policy "Allow authenticated read" on subscribers
  for select to authenticated
  using (true);

create policy "Allow authenticated delete" on reservations
  for delete to authenticated
  using (true);

create policy "Allow authenticated delete" on subscribers
  for delete to authenticated
  using (true);

-- ============================================================
-- Cuentas de turistas (correr después de lo anterior)
-- ============================================================
-- IMPORTANTE: antes de esto, cualquier usuario autenticado (incluyendo
-- turistas que se registren) podía leer/borrar TODAS las reservas y
-- suscriptores por las políticas "Allow authenticated ..." de arriba.
-- Este bloque reemplaza esas políticas por unas que solo dejan pasar a
-- administradores (profiles.is_admin = true), y le da a cada turista
-- acceso únicamente a sus propias reservas.

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile" on profiles
  for select to authenticated
  using (auth.uid () = id);

create policy "Users can update own profile" on profiles
  for update to authenticated
  using (auth.uid () = id);

-- Crea automáticamente el perfil cuando alguien se registra.
create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users for each row
execute function public.handle_new_user ();

-- Vincula cada reserva nueva con la cuenta que la hizo.
alter table reservations
add column if not exists user_id uuid references auth.users (id) on delete set null;

drop policy if exists "Allow authenticated read" on reservations;
drop policy if exists "Allow authenticated delete" on reservations;
drop policy if exists "Allow authenticated read" on subscribers;
drop policy if exists "Allow authenticated delete" on subscribers;

create policy "Admins can read all reservations" on reservations
  for select to authenticated
  using (
    exists (
      select 1 from profiles where id = auth.uid () and is_admin = true
    )
  );

create policy "Admins can delete reservations" on reservations
  for delete to authenticated
  using (
    exists (
      select 1 from profiles where id = auth.uid () and is_admin = true
    )
  );

create policy "Users can read own reservations" on reservations
  for select to authenticated
  using (auth.uid () = user_id);

-- Booking now requires an account, so reservations insert as the signed-in
-- user (not anon) — add the matching insert policy and retire the old
-- anonymous one (nothing should insert a reservation without an account).
drop policy if exists "Allow public inserts" on reservations;

create policy "Users can insert own reservations" on reservations
  for insert to authenticated
  with check (auth.uid () = user_id);

create policy "Admins can read subscribers" on subscribers
  for select to authenticated
  using (
    exists (
      select 1 from profiles where id = auth.uid () and is_admin = true
    )
  );

create policy "Admins can delete subscribers" on subscribers
  for delete to authenticated
  using (
    exists (
      select 1 from profiles where id = auth.uid () and is_admin = true
    )
  );

-- Por último, marcá tu propia cuenta de admin (la que usás para entrar a
-- /admin) como administradora. Reemplazá el correo y corré esto una vez:
--
-- update profiles set is_admin = true
-- where id = (select id from auth.users where email = 'tu-correo@ejemplo.com');
