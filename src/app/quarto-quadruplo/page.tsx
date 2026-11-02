import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DetalheQuarto from "@/components/DetalheQuarto";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import { QUARTOS } from "@/data/pousada";

export const metadata: Metadata = {
  title: "Suíte Quádrupla — Pousada Aruamar",
  description:
    "Suíte quádrupla da Pousada Aruamar: camas de casal e duas de solteiro, mesa e banheiro privativo, a partir de R$ 210,00 a diária.",
};

export default function QuartoQuadruploPage() {
  const quarto = QUARTOS.find((item) => item.id === "quadruplo");
  if (!quarto) notFound();

  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <DetalheQuarto quarto={quarto} />
      <Footer />
      <WhatsAppFlutuante />
    </div>
  );
}
