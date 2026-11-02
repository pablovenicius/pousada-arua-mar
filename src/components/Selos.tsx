import { SELOS } from "@/data/pousada";

export default function Selos() {
  return (
    <section
      aria-label="Destaques"
      style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 40px) 0" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 1,
          background: "#E7DDCC",
          border: "1px solid #E7DDCC",
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        {SELOS.map((selo) => (
          <div
            key={selo.rotulo}
            style={{ background: "var(--areia)", padding: "24px 26px", display: "flex", flexDirection: "column", gap: 4 }}
          >
            <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--azul-escuro)" }}>
              {selo.valor}
            </span>
            <span style={{ fontSize: 14, color: "var(--tinta-clara)", fontWeight: 600 }}>{selo.rotulo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
