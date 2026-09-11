import type { CSSProperties } from "react";
import { CONTATO } from "@/data/pousada";
import IconInstagram from "./IconInstagram";

const rotulo: CSSProperties = {
  margin: "0 0 12px",
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#E4C89C",
};

const texto: CSSProperties = { margin: 0, fontSize: 14, lineHeight: 1.9 };

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0E2A33",
        color: "rgba(251,248,243,0.7)",
        padding: "clamp(48px, 7vw, 84px) clamp(20px, 5vw, 64px) 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 10px",
              fontFamily: "var(--fonte-titulo), serif",
              fontSize: 28,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#FBF8F3",
            }}
          >
            Aruamar
          </p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
            Pousada à beira-mar.
            <br />
            Aberta o ano inteiro.
          </p>
        </div>
        <div>
          <p style={rotulo}>Contato</p>
          <p style={texto}>
            {CONTATO.telefone}
            <br />
            {CONTATO.email}
          </p>
          <a
            href={CONTATO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Pousada Aruamar"
            style={{
              marginTop: 12,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "rgba(251,248,243,0.7)",
            }}
          >
            <IconInstagram size={18} />
            Instagram
          </a>
        </div>
        <div>
          <p style={rotulo}>Horários</p>
          <p style={texto}>
            {CONTATO.checkIn}
            <br />
            {CONTATO.checkOut}
          </p>
        </div>
        <div>
          <p style={rotulo}>Endereço</p>
          <p style={texto}>
            {CONTATO.endereco[0]}
            <br />
            {CONTATO.endereco[1]}
          </p>
        </div>
      </div>
      <p
        style={{
          maxWidth: 1320,
          margin: "48px auto 0",
          paddingTop: 22,
          borderTop: "1px solid rgba(251,248,243,0.14)",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "rgba(251,248,243,0.45)",
        }}
      >
        © {new Date().getFullYear()} Pousada Aruamar · Todos os direitos reservados
      </p>
    </footer>
  );
}
