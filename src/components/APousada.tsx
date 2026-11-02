"use client";

import { useRef, type ReactNode } from "react";
import { CAFE_DA_MANHA, GALERIA, formatarPreco } from "@/data/pousada";

const PASSO = 440; // quanto cada clique nas setas rola a galeria (px)

const COMODIDADES: { texto: string; icone: ReactNode }[] = [
  {
    texto: "Ar-condicionado em todas as suítes",
    icone: <path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18" />,
  },
  {
    texto: "Wi-Fi de fibra",
    icone: (
      <>
        <path d="M2 8.8a15 15 0 0 1 20 0" />
        <path d="M5 12.6a10 10 0 0 1 14 0" />
        <path d="M8.5 16.4a5 5 0 0 1 7 0" />
        <circle cx="12" cy="20" r="1" />
      </>
    ),
  },
  {
    texto: "Estacionamento gratuito",
    icone: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </>
    ),
  },
  {
    texto: `Café da manhã à parte · R$ ${formatarPreco(CAFE_DA_MANHA)} por pessoa`,
    icone: (
      <>
        <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
        <path d="M7 2v2M11 2v2" />
      </>
    ),
  },
];

const botaoSeta = {
  width: 52,
  height: 52,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default function APousada() {
  const galeria = useRef<HTMLDivElement>(null);
  const rolar = (direcao: 1 | -1) => galeria.current?.scrollBy({ left: direcao * PASSO, behavior: "smooth" });

  return (
    <section id="pousada" style={{ padding: "clamp(64px, 9vw, 112px) 0 0" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--coral-texto)" }}>
            A pousada
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(32px, 4.2vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: "var(--azul-escuro)",
              textWrap: "balance",
            }}
          >
            Aconchego de casa,{" "}
            <span className="destaque" style={{ color: "#B0531B" }}>
              a 400 metros da areia.
            </span>
          </h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: "var(--tinta-suave)" }}>
            Acomodações aconchegantes, jardim interno e a praia a 400 metros. Arraste para conhecer.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            aria-label="Fotos anteriores"
            onClick={() => rolar(-1)}
            className="btn"
            style={{ ...botaoSeta, border: "1px solid #DED3C2", background: "#FFFFFF", color: "var(--azul-escuro)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próximas fotos"
            onClick={() => rolar(1)}
            className="btn"
            style={{ ...botaoSeta, border: 0, background: "var(--azul-escuro)", color: "#FFFFFF" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={galeria}
        className="galeria"
        role="region"
        aria-label="Galeria de fotos da pousada"
        tabIndex={0}
        style={{
          marginTop: 32,
          display: "flex",
          gap: 16,
          overflowX: "auto",
          padding: "0 clamp(16px, 4vw, 40px) 8px",
          scrollPaddingLeft: "clamp(16px, 4vw, 40px)",
        }}
      >
        {GALERIA.map((foto) => (
          <figure
            key={foto.legenda}
            style={{
              position: "relative",
              flex: "0 0 auto",
              width: `min(${foto.largura}px, 82vw)`,
              height: "clamp(280px, 34vw, 380px)",
              margin: 0,
              borderRadius: 24,
              overflow: "hidden",
              background: "#E9E2D6",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <figcaption
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.92)",
                color: "var(--tinta)",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {foto.legenda}
            </figcaption>
          </figure>
        ))}
      </div>

      <ul
        style={{
          listStyle: "none",
          maxWidth: 1240,
          margin: "28px auto 0",
          padding: "0 clamp(16px, 4vw, 40px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {COMODIDADES.map((c) => (
          <li
            key={c.texto}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              minHeight: 48,
              padding: "0 18px",
              borderRadius: 999,
              background: "#FFFFFF",
              border: "1px solid var(--borda)",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {c.icone}
            </svg>
            {c.texto}
          </li>
        ))}
      </ul>
    </section>
  );
}
