import ImageSlot from "./ImageSlot";
import { CAFE_DA_MANHA, FOTOS_POUSADA, MIMOS, formatarPreco } from "@/data/pousada";

const AREAS = [
  { gridColumn: "1 / 2", gridRow: "1 / 3" },
  { gridColumn: "2 / 3", gridRow: "1 / 2" },
  { gridColumn: "2 / 3", gridRow: "2 / 4" },
  { gridColumn: "1 / 2", gridRow: "3 / 4" },
] as const;

export default function APousada() {
  return (
    <section
      id="experiencia"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(32px, 6vw, 80px)",
        alignItems: "center",
        padding: "clamp(64px, 10vw, 130px) clamp(20px, 5vw, 64px)",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <div>
        <p
          style={{
            margin: "0 0 20px",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#B07C3F",
          }}
        >
          A pousada
        </p>
        <h2
          style={{
            margin: "0 0 24px",
            fontFamily: "var(--fonte-titulo), serif",
            fontWeight: 300,
            fontSize: "clamp(34px, 4.6vw, 58px)",
            lineHeight: 1.1,
            textWrap: "balance",
          }}
        >
          Conheça nossa Pousada e Faça sua Escolha!
        </h2>
        <p style={{ margin: "0 0 18px", maxWidth: "52ch", fontSize: 17, lineHeight: 1.8, color: "#34535C", textWrap: "pretty" }}>
          Acomodações aconchegantes, uma varanda para o fim de tarde e a praia a cinco minutos de
          caminhada descalço.
        </p>
        <p style={{ margin: "0 0 34px", maxWidth: "52ch", fontSize: 17, lineHeight: 1.8, color: "#34535C", textWrap: "pretty" }}>
          Café da manhã é opcional por R$ {formatarPreco(CAFE_DA_MANHA)} por pessoa.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "20px 28px",
            borderTop: "1px solid rgba(14,42,51,0.12)",
            paddingTop: 28,
          }}
        >
          {MIMOS.map((mimo) => (
            <div key={mimo.titulo}>
              <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600 }}>{mimo.titulo}</p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#6B8188" }}>{mimo.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gridTemplateRows: "repeat(3, 120px)",
          gap: 14,
          minWidth: 0,
        }}
      >
        {FOTOS_POUSADA.map((foto, i) => (
          <div key={foto.placeholder} style={{ ...AREAS[i], minWidth: 0 }}>
            <ImageSlot foto={foto} radius={4} />
          </div>
        ))}
      </div>
    </section>
  );
}
