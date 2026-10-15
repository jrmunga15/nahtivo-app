import { signIn } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <div className="flex min-h-screen items-center justify-center bg-bosque px-6">
      <form
        action={signIn}
        className="w-full max-w-sm rounded-2xl bg-white p-8"
      >
        <h1 className="font-heading text-xl font-bold text-bosque">
          Panel de Nahtivo
        </h1>
        <p className="mt-1 text-sm text-bosque/60">
          Solo para el equipo. Ingresá con tu cuenta.
        </p>

        {hasError && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
            Correo o contraseña incorrectos.
          </p>
        )}

        <div className="mt-5">
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-semibold text-bosque/70"
          >
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-bosque/20 px-3 py-2 text-sm text-bosque focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="password"
            className="mb-1 block text-xs font-semibold text-bosque/70"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-bosque/20 px-3 py-2 text-sm text-bosque focus:border-verde focus:outline-none focus:ring-1 focus:ring-verde"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-acento px-6 py-3 font-semibold text-bosque transition-opacity hover:opacity-90"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
