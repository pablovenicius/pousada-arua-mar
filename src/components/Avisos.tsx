import type { CSSProperties } from "react";
import { AVISOS } from "@/data/pousada";

interface AvisosProps {
  /** "claro" para fundo areia/branco; "compacto" para dentro de cards. */
  variante?: "claro" | "compacto";
  style?: CSSProperties;
}

/**
 * Avisos fixos sobre preços: valores mudam em feriados/datas especiais e
 * o café da manhã é cobrado à parte. Os textos ficam em data/pousada.ts (AVISOS).
 */
export default function Avisos({ variante = "claro", style }: AvisosProps) {
  if (variante === "compacto") {
    return (
      <p
        role="note"
        style={{
          margin: 0,
          padding: "12px 14px",
          borderRadius: 12,
          background: "var(--coral-suave)",
          color: "var(--coral-escuro)",
          fontSize: 13,
          lineHeight: 1.5,
          ...style,
        }}
      >
        {AVISOS.cafe} {AVISOS.valores}
      </p>
    );
  }

  return (
    <div
      role="note"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 22px",
        padding: "14px 18px",
        borderRadius: 16,
        background: "var(--coral-suave)",
        color: "var(--coral-escuro)",
        fontSize: 14,
        lineHeight: 1.5,
        ...style,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "flex-start", gap: 8, flex: "1 1 300px" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 1 }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
        </svg>
        <span>
          <strong>{AVISOS.valores}</strong> O valor final é confirmado pela recepção.
        </span>
      </span>
      <span style={{ display: "inline-flex", alignItems: "flex-start", gap: 8, flex: "1 1 260px" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 1 }}>
          <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
        </svg>
        <strong>{AVISOS.cafe}</strong>
      </span>
    </div>
  );
}
