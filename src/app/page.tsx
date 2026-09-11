import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Selos from "@/components/Selos";
import APousada from "@/components/APousada";
import Acomodacoes from "@/components/Acomodacoes";
import Localizacao from "@/components/Localizacao";
import Reserva from "@/components/Reserva";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "var(--fonte-texto), system-ui, sans-serif",
        color: "#0E2A33",
        background: "#FBF8F3",
        overflowX: "hidden",
      }}
    >
      <Header />
      <main>
        <Hero />
        <Selos />
        <APousada />
        <Acomodacoes />
        <Localizacao />
        <Reserva />
      </main>
      <Footer />
    </div>
  );
}
