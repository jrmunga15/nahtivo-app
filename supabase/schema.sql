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

create policy "Allow public inserts" on reservations
  for insert to anon
  with check (true);

create policy "Allow public inserts" on subscribers
  for insert to anon
  with check (true);

-- Admin panel: only signed-in Supabase Auth users can read the data.
create policy "Allow authenticated read" on reservations
  for select to authenticated
  using (true);

create policy "Allow authenticated read" on subscribers
  for select to authenticated
  using (true);
