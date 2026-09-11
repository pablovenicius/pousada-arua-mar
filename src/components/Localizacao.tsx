import ImageSlot from "./ImageSlot";
import { ARREDORES, FOTO_LOCALIZACAO } from "@/data/pousada";

export default function Localizacao() {
  return (
    <section
      id="localizacao"
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
      <div style={{ minHeight: 380, position: "relative" }}>
        <ImageSlot foto={FOTO_LOCALIZACAO} radius={4} />
      </div>
      <div>
        <p style={{ margin: "0 0 20px", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#B07C3F" }}>
          Onde estamos
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
          Cinco minutos da areia, longe do barulho.
        </h2>
        <p style={{ margin: "0 0 30px", maxWidth: "50ch", fontSize: 17, lineHeight: 1.8, color: "#34535C", textWrap: "pretty" }}>
          Localizado em uma rua calma e residencial, nosso hotel combina tranquilidade com
          conveniência. Você estará a poucos passos da praia, shopping, food park e padarias
          locais.
        </p>
        <div style={{ display: "grid", gap: 14 }}>
          {ARREDORES.map((item) => (
            <div
              key={item.lugar}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                paddingBottom: 12,
                borderBottom: "1px solid rgba(14,42,51,0.12)",
              }}
            >
              <span style={{ fontSize: 15 }}>{item.lugar}</span>
              <span style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B8188" }}>
                {item.tempo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
