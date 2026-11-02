import type { CSSProperties } from "react";
import { AVISOS, CONTATO, MENSAGEM_PADRAO, linkWhatsApp } from "@/data/pousada";
import IconInstagram from "./IconInstagram";

const rotulo: CSSProperties = {
  margin: "0 0 4px",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#FFFFFF",
};

const coluna: CSSProperties = { flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 10, fontSize: 14 };
const link: CSSProperties = { color: "var(--azul-claro)" };

export default function Footer() {
  return (
    <footer style={{ background: "var(--azul-noite)", color: "var(--azul-claro)", padding: "56px clamp(16px, 4vw, 40px) 32px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", gap: 36 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between" }}>
          <div style={{ ...coluna, flex: "1 1 260px", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-aruamar.jpg" alt="Logo Pousada Aruamar" width={56} height={56} style={{ borderRadius: "50%", objectFit: "cover" }} />
              <span style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>Pousada Aruamar</span>
            </div>
            <p style={{ margin: 0, lineHeight: 1.7 }}>Casa de hóspedes no bairro Aruana, a 400 metros da praia de Aracaju.</p>
            <a
              href={CONTATO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram da Pousada Aruamar (${CONTATO.instagramUsuario})`}
              className="btn"
              style={{
                alignSelf: "flex-start",
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconInstagram size={20} />
            </a>
          </div>
          <div style={coluna}>
            <p style={rotulo}>Contato</p>
            <a href={linkWhatsApp(undefined, MENSAGEM_PADRAO)} target="_blank" rel="noopener noreferrer" style={link}>
              {CONTATO.telefone}
            </a>
            <a href={`mailto:${CONTATO.email}`} style={link}>
              {CONTATO.email}
            </a>
            <a
              href={CONTATO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...link, display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <IconInstagram size={16} />
              {CONTATO.instagramUsuario}
            </a>
          </div>
          <div style={coluna}>
            <p style={rotulo}>Hospedagem</p>
            <span>{CONTATO.checkIn}</span>
            <span>{CONTATO.checkOut}</span>
            <span>Recepção 24 horas</span>
          </div>
          <div style={coluna}>
            <p style={rotulo}>Endereço</p>
            <span>{CONTATO.endereco[0]}</span>
            <span>{CONTATO.endereco[1]}</span>
            <a href={CONTATO.mapa} target="_blank" rel="noopener noreferrer" style={{ ...link, textDecoration: "underline" }}>
              Ver no mapa
            </a>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#9FB3CC" }}>
          {AVISOS.valores} {AVISOS.cafe}
        </p>
        <div style={{ paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 13, color: "#9FB3CC" }}>
          © {new Date().getFullYear()} Pousada Aruamar · Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}
