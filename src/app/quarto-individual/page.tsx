import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DetalheQuarto from "@/components/DetalheQuarto";
import { QUARTOS } from "@/data/pousada";

export const metadata: Metadata = {
  title: "Suíte Individual — Pousada Aruamar",
  description:
    "Suíte individual da Pousada Aruamar: cama de casal larga, mesa e banheiro privativo, a partir de R$ 130,00 a diária.",
};

export default function QuartoIndividualPage() {
  const quarto = QUARTOS.find((item) => item.id === "individual");
  if (!quarto) notFound();

  return (
    <div style={{ fontFamily: "var(--fonte-texto), system-ui, sans-serif", overflowX: "hidden" }}>
      <Header />
      <DetalheQuarto quarto={quarto} />
      <Footer />
    </div>
  );
}
