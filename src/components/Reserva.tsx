import { CONTATO, MENSAGEM_PADRAO, linkWhatsApp } from "@/data/pousada";
import IconInstagram from "./IconInstagram";
import IconWhatsApp from "./IconWhatsApp";

const botaoContorno = {
  minHeight: 56,
  padding: "0 22px",
  borderRadius: 16,
  border: "2px solid #1A0E05",
  color: "#1A0E05",
  fontSize: 16,
  fontWeight: 800,
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
};

export default function Reserva() {
  return (
    <section id="contato" style={{ maxWidth: 1240, margin: "0 auto", padding: "clamp(64px, 9vw, 112px) clamp(16px, 4vw, 40px)" }}>
      <div
        style={{
          borderRadius: 32,
          background: "var(--coral)",
          padding: "clamp(32px, 5vw, 64px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 14 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(30px, 4vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: "#1A0E05",
              textWrap: "balance",
            }}
          >
            Fale com a recepção e garanta sua data.
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#3A1C08", maxWidth: "48ch" }}>
            Atendimento direto, 24 horas. Respondemos em minutos e seguramos a data enquanto você decide.
          </p>
        </div>
        <div style={{ flex: "0 1 auto", display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a
            href={linkWhatsApp(undefined, MENSAGEM_PADRAO)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              minHeight: 56,
              padding: "0 24px",
              borderRadius: 16,
              background: "var(--azul-escuro)",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <IconWhatsApp size={20} />
            Chamar no WhatsApp
          </a>
          <a href={`mailto:${CONTATO.email}`} className="btn" style={botaoContorno}>
            Enviar e-mail
          </a>
          <a
            href={CONTATO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            aria-label={`Instagram da Pousada Aruamar (${CONTATO.instagramUsuario})`}
            style={botaoContorno}
          >
            <IconInstagram size={20} />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
