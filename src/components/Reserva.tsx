import { CONTATO, linkWhatsApp } from "@/data/pousada";

export default function Reserva() {
  return (
    <section
      id="reserva"
      style={{ background: "#E8DCCB", padding: "clamp(64px, 10vw, 130px) clamp(20px, 5vw, 64px)" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p style={{ margin: "0 0 20px", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8A6430" }}>
          Reservas
        </p>
        <h2
          style={{
            margin: "0 0 22px",
            fontFamily: "var(--fonte-titulo), serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 5.4vw, 66px)",
            lineHeight: 1.08,
            textWrap: "balance",
          }}
        >
          Fale com a gente e escolha seu quarto.
        </h2>
        <p style={{ margin: "0 auto 38px", maxWidth: "50ch", fontSize: 17, lineHeight: 1.8, color: "#4A5F66", textWrap: "pretty" }}>
          Atendimento direto com a recepção, todos os dias, 24 horas. Respondemos em minutos e
          seguramos a data enquanto você decide.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
          <a
            className="btn-escuro"
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "17px 34px",
              background: "#0E2A33",
              color: "#FBF8F3",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            WhatsApp {CONTATO.telefone}
          </a>
          <a
            className="btn-contorno-escuro"
            href={`mailto:${CONTATO.email}`}
            style={{
              padding: "17px 34px",
              border: "1px solid rgba(14,42,51,0.35)",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Enviar e-mail
          </a>
        </div>
      </div>
    </section>
  );
}
