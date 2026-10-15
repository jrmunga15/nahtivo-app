"use client";

export default function DeleteButton({
  confirmMessage = "¿Seguro que querés borrar esto? No se puede deshacer.",
}: {
  confirmMessage?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
      className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
    >
      Borrar
    </button>
  );
}
