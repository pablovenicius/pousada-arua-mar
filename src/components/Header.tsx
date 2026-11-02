"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTATO, MENSAGEM_PADRAO, linkWhatsApp } from "@/data/pousada";
import IconInstagram from "./IconInstagram";

const LINKS_NAV = [
  { href: "/#suites", label: "Suítes" },
  { href: "/#pousada", label: "A pousada" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/#contato", label: "Contato" },
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
        background: "rgba(251,248,243,0.86)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(14,36,51,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "12px clamp(16px, 4vw, 40px)",
        }}
      >
        <Link href="/#topo" onClick={fecharMenu} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--tinta)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-aruamar.jpg"
            alt="Logo Pousada Aruamar"
            width={46}
            height={46}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.01em" }}>Aruamar</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--coral-texto)",
              }}
            >
              Pousada · Aracaju
            </span>
          </span>
        </Link>

        {/* Navegação — visível no PC, escondida no celular (ver globals.css) */}
        <nav
          className="nav-desktop"
          aria-label="Seções"
          style={{ display: "flex", gap: 28, marginLeft: "auto", fontSize: 14, fontWeight: 600 }}
        >
          {LINKS_NAV.map((link) => (
            <Link key={link.href} className="link-nav" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={CONTATO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram da Pousada Aruamar (${CONTATO.instagramUsuario})`}
          title={CONTATO.instagramUsuario}
          className="btn"
          style={{
            marginLeft: "auto",
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(14,36,51,0.15)",
            color: "var(--azul-escuro)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
          }}
        >
          <IconInstagram size={20} />
        </a>

        <Link
          href="/#reservar"
          className="btn so-desktop"
          style={{
            minHeight: 44,
            padding: "0 20px",
            borderRadius: 999,
            background: "var(--azul)",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Reservar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </Link>

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
      <nav id="nav-mobile" className="nav-mobile" data-aberto={menuAberto} aria-label="Menu">
        {LINKS_NAV.map((link) => (
          <Link key={link.href} className="link-nav-mobile" href={link.href} onClick={fecharMenu}>
            {link.label}
          </Link>
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
          {CONTATO.instagramUsuario}
        </a>
        <a
          href={linkWhatsApp(undefined, MENSAGEM_PADRAO)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp-mobile"
          onClick={fecharMenu}
        >
          Reservar pelo WhatsApp
        </a>
      </nav>
    </header>
  );
}
