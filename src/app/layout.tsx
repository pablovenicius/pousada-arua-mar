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

// Mantém o mesmo layout do desktop no celular: em vez de reorganizar os
// elementos (design responsivo tradicional), o navegador mobile renderiza a
// página com esta largura fixa e apenas reduz a escala para caber na tela.
export const viewport: Viewport = {
  width: 1320,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  );
}
