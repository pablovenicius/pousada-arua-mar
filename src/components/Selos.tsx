import { SELOS } from "@/data/pousada";

export default function Selos() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 1,
        background: "rgba(14,42,51,0.1)",
        borderBottom: "1px solid rgba(14,42,51,0.1)",
      }}
    >
      {SELOS.map((selo) => (
        <div key={selo.rotulo} style={{ background: "#FBF8F3", padding: "26px clamp(18px, 3vw, 34px)" }}>
          <p
            style={{
              margin: "0 0 8px",
              fontFamily: "var(--fonte-titulo), serif",
              fontSize: 30,
              lineHeight: 1,
              color: "#0E2A33",
            }}
          >
            {selo.valor}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6B8188",
            }}
          >
            {selo.rotulo}
          </p>
        </div>
      ))}
    </section>
  );
}
