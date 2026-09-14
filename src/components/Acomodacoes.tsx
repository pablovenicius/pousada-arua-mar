import ImageSlot from "./ImageSlot";
import {
  CAFE_DA_MANHA,
  DIARIA_MAXIMA,
  DIARIA_MINIMA,
  QUARTOS,
  formatarPreco,
} from "@/data/pousada";

export default function Acomodacoes() {
  return (
    <section
      id="acomodacoes"
      style={{
        background: "#0E2A33",
        color: "#FBF8F3",
        padding: "clamp(64px, 10vw, 130px) clamp(20px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: "clamp(36px, 5vw, 64px)",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 12,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#E4C89C",
              }}
            >
              Acomodações
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--fonte-titulo), serif",
                fontWeight: 300,
                fontSize: "clamp(34px, 4.6vw, 58px)",
                lineHeight: 1.1,
              }}
            >
              Quartos do Individual ao quadruplo.
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: "34ch", fontSize: 15, lineHeight: 1.7, color: "rgba(251,248,243,0.7)" }}>
            Diárias de R$ {formatarPreco(DIARIA_MINIMA)} a R$ {formatarPreco(DIARIA_MAXIMA)},
            conforme o número de hóspedes. Sem taxa escondida.
          </p>
        </div>

        <div
          className="grid-quartos"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "clamp(18px, 2.4vw, 30px)",
          }}
        >
          {QUARTOS.map((quarto) => (
            <article
              key={quarto.id}
              className="card-quarto"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(251,248,243,0.05)",
                border: "1px solid rgba(251,248,243,0.14)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 210 }}>
                <ImageSlot foto={quarto.foto} />
              </div>
              <div style={{ padding: "26px 24px 28px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--fonte-titulo), serif", fontWeight: 400, fontSize: 27 }}>
                    {quarto.nome}
                  </h3>
                  <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#E4C89C" }}>
                    {quarto.pessoas}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(251,248,243,0.72)", flex: 1, textWrap: "pretty" }}>
                  {quarto.texto}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    paddingTop: 14,
                    borderTop: "1px solid rgba(251,248,243,0.14)",
                  }}
                >
                  <span style={{ fontFamily: "var(--fonte-titulo), serif", fontSize: 34, lineHeight: 1 }}>
                    R$ {formatarPreco(quarto.preco)}
                  </span>
                  <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(251,248,243,0.55)" }}>
                    / noite
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p style={{ margin: "30px 0 0", fontSize: 15, color: "rgba(251,248,243,0.6)" }}>
          Café da manhã opcional: R$ {formatarPreco(CAFE_DA_MANHA)} por pessoa, por dia.
        </p>
      </div>
    </section>
  );
}
