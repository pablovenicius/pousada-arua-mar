"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { CONTATO, linkWhatsApp } from "@/data/pousada";
import IconInstagram from "./IconInstagram";

const linkNav: CSSProperties = { color: "#34535C" };

const LINKS_NAV = [
  { href: "/#acomodacoes", label: "Acomodações" },
  { href: "/#experiencia", label: "A pousada" },
  { href: "/#localizacao", label: "Onde estamos" },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(251,248,243,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(14,42,51,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "18px clamp(20px, 5vw, 64px)",
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

        {/* Navegação — visível no PC, escondida no celular (ver globals.css) */}
        <nav
          className="nav-desktop"
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
          {LINKS_NAV.map((link) => (
            <a key={link.href} className="link-nav" href={link.href} style={linkNav}>
              {link.label}
            </a>
          ))}
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
            href="/#reserva"
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

        {/* Botão hambúrguer — só aparece no celular (ver globals.css) */}
        <button
          type="button"
          className="btn-hamburguer"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="nav-mobile"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span className="icone-hamburguer" data-aberto={menuAberto}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Menu suspenso do celular */}
      <nav id="nav-mobile" className="nav-mobile" data-aberto={menuAberto}>
        {LINKS_NAV.map((link) => (
          <a key={link.href} className="link-nav-mobile" href={link.href} onClick={fecharMenu}>
            {link.label}
          </a>
        ))}
        <a
          href={CONTATO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="link-nav-mobile"
          onClick={fecharMenu}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <IconInstagram size={18} />
          Instagram
        </a>
        <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-mobile" onClick={fecharMenu}>
          Reservar pelo WhatsApp
        </a>
      </nav>
    </header>
  );
}
