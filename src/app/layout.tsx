import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--fonte-titulo",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--fonte-texto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pousada Aruamar — hospedagem à beira-mar",
  description:
    "Casa de hóspedes com quatro acomodações, cinco minutos da praia. Diárias a partir de R$ 130,00 e recepção 24h.",
};

// Viewport responsivo padrão: o site se adapta automaticamente ao tamanho da
// tela (celular ou PC), sem zoom manual e sem miniaturizar o layout do desktop.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  );
}
