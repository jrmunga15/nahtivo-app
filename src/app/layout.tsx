import type { Metadata } from "next";
import { Montserrat, Karla } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nahtivo — Experiencias turísticas con guías locales certificados",
  description:
    "Reservá experiencias turísticas en Ahuachapán, El Salvador, guiadas por guías locales certificados por Nahtivo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-bosque">
        {children}
      </body>
    </html>
  );
}
