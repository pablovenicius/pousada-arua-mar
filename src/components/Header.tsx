import type { CSSProperties } from "react";
import { CONTATO } from "@/data/pousada";
import IconInstagram from "./IconInstagram";

const linkNav: CSSProperties = { color: "#34535C" };

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "18px clamp(20px, 5vw, 64px)",
        background: "rgba(251,248,243,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(14,42,51,0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span
          style={{
            fontFamily: "var(--fonte-titulo), serif",
            fontSize: 26,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Aruamar
        </span>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#B07C3F",
          }}
        >
          Pousada
        </span>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(14px, 2.4vw, 34px)",
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <a className="link-nav" href="#acomodacoes" style={linkNav}>
          Acomodações
        </a>
        <a className="link-nav" href="#experiencia" style={linkNav}>
          A pousada
        </a>
        <a className="link-nav" href="#localizacao" style={linkNav}>
          Onde estamos
        </a>
        <a
          href={CONTATO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram da Pousada Aruamar"
          className="link-nav"
          style={{ ...linkNav, display: "inline-flex", alignItems: "center" }}
        >
          <IconInstagram size={19} />
        </a>
        <a
          className="btn-escuro"
          href="#reserva"
          style={{
            padding: "11px 22px",
            background: "#0E2A33",
            color: "#FBF8F3",
            borderRadius: 999,
            letterSpacing: "0.1em",
          }}
        >
          Reservar
        </a>
      </nav>
    </header>
  );
}
