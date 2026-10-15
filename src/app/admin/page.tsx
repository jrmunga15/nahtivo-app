import { createServerSupabaseClient } from "@/lib/supabase-server";
import { signOut, deleteReservation, deleteSubscriber } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

type Reservation = {
  id: string;
  created_at: string;
  experience_slug: string;
  reservation_date: string;
  people: number;
  full_name: string;
  email: string;
  phone: string;
  notes: string | null;
  confirmation_code: string;
  total_usd: number;
};

type Subscriber = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  interest: string;
};

const interestLabels: Record<string, string> = {
  tourist: "Reservar experiencias",
  guide: "Ser guía certificado",
  business: "Buscar creadores",
  creator: "Crear contenido",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-SV", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: reservations }, { data: subscribers }] = await Promise.all([
    supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .returns<Reservation[]>(),
    supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .returns<Subscriber[]>(),
  ]);

  return (
    <div className="min-h-screen bg-[#F4FAF7]">
      <header className="flex items-center justify-between border-b border-bosque/10 bg-white px-6 py-4">
        <h1 className="font-heading text-xl font-bold text-bosque">
          Panel de Nahtivo
        </h1>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-bosque/20 px-4 py-2 text-sm font-semibold text-bosque hover:bg-bosque/5"
          >
            Cerrar sesión
          </button>
        </form>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <section className="mb-12">
          <h2 className="mb-4 font-heading text-lg font-bold text-bosque">
            Reservas ({reservations?.length ?? 0})
          </h2>
          <div className="overflow-x-auto rounded-xl border border-bosque/10 bg-white">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-bosque/5 text-xs text-bosque/60 uppercase">
                <tr>
                  <th className="px-4 py-3">Recibida</th>
                  <th className="px-4 py-3">Experiencia</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Personas</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Contacto</th>
                  <th className="px-4 py-3">Notas</th>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {reservations && reservations.length > 0 ? (
                  reservations.map((r) => (
                    <tr key={r.id} className="border-t border-bosque/5">
                      <td className="px-4 py-3 whitespace-nowrap text-bosque/70">
                        {formatDate(r.created_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-bosque">
                        {r.experience_slug}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-bosque/70">
                        {r.reservation_date}
                      </td>
                      <td className="px-4 py-3 text-bosque/70">{r.people}</td>
                      <td className="px-4 py-3 text-bosque">{r.full_name}</td>
                      <td className="px-4 py-3 text-bosque/70">
                        <div>{r.email}</div>
                        <div>{r.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-bosque/60">
                        {r.notes ?? "—"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-verde">
                        {r.confirmation_code}
                      </td>
                      <td className="px-4 py-3 font-semibold text-bosque">
                        ${r.total_usd}
                      </td>
                      <td className="px-4 py-3">
                        <form action={deleteReservation}>
                          <input type="hidden" name="id" value={r.id} />
                          <DeleteButton />
                        </form>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-8 text-center text-bosque/50"
                    >
                      Todavía no hay reservas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-lg font-bold text-bosque">
            Suscriptores ({subscribers?.length ?? 0})
          </h2>
          <div className="overflow-x-auto rounded-xl border border-bosque/10 bg-white">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-bosque/5 text-xs text-bosque/60 uppercase">
                <tr>
                  <th className="px-4 py-3">Recibida</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Correo</th>
                  <th className="px-4 py-3">Interés</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {subscribers && subscribers.length > 0 ? (
                  subscribers.map((s) => (
                    <tr key={s.id} className="border-t border-bosque/5">
                      <td className="px-4 py-3 whitespace-nowrap text-bosque/70">
                        {formatDate(s.created_at)}
                      </td>
                      <td className="px-4 py-3 text-bosque">{s.full_name}</td>
                      <td className="px-4 py-3 text-bosque/70">{s.email}</td>
                      <td className="px-4 py-3 text-bosque/70">
                        {interestLabels[s.interest] ?? s.interest}
                      </td>
                      <td className="px-4 py-3">
                        <form action={deleteSubscriber}>
                          <input type="hidden" name="id" value={s.id} />
                          <DeleteButton />
                        </form>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-bosque/50"
                    >
                      Todavía no hay suscriptores.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
