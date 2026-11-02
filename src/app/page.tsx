import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Selos from "@/components/Selos";
import APousada from "@/components/APousada";
import Acomodacoes from "@/components/Acomodacoes";
import Localizacao from "@/components/Localizacao";
import Reserva from "@/components/Reserva";
import Footer from "@/components/Footer";
import Revelar from "@/components/Revelar";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";

export default function Home() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <main>
        <Hero />
        <Selos />
        <Revelar>
          <APousada />
        </Revelar>
        <Revelar>
          <Acomodacoes />
        </Revelar>
        <Revelar>
          <Localizacao />
        </Revelar>
        <Revelar>
          <Reserva />
        </Revelar>
      </main>
      <Footer />
      <WhatsAppFlutuante />
    </div>
  );
}
