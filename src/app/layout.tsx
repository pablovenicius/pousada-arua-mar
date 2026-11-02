import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Títulos e textos: sans moderna. Destaques em itálico: serifada.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--fonte-titulo",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fonte-texto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pousada Aruamar — hospedagem a 400 metros da praia em Aracaju",
  description:
    "Suítes da Individual à Quádrupla no bairro Aruana, a 400 metros da praia. Diárias a partir de R$ 130,00, recepção 24h e café da manhã opcional.",
};

// Viewport responsivo padrão: o site se adapta automaticamente ao tamanho da
// tela (celular ou PC), sem zoom manual e sem miniaturizar o layout do desktop.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F2E52",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${instrumentSerif.variable} ${jakarta.variable}`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
