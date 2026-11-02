"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AVISOS, DIARIA_MAXIMA, DIARIA_MINIMA, QUARTOS, caminhoQuarto, formatarPreco, linkWhatsApp } from "@/data/pousada";
import Avisos from "./Avisos";

const celula = { padding: "14px 18px" };
const cabecalhoLinha = { ...celula, textAlign: "left" as const, fontWeight: 600, color: "var(--azul-claro)" };
const linha = { borderTop: "1px solid rgba(255,255,255,0.1)" };

export default function Acomodacoes() {
  const [indice, setIndice] = useState(1);
  const atual = QUARTOS[indice];
  const mensagem = `Olá! Gostaria de reservar a Suíte ${atual.nome} (${atual.pessoas}) da Pousada Aruamar.`;

  return (
    <section
      id="suites"
      style={{
        marginTop: "clamp(64px, 9vw, 112px)",
        background: "var(--azul-escuro)",
        color: "#FFFFFF",
        padding: "clamp(64px, 9vw, 112px) 0",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px)",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 620 }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--coral-claro)" }}>
              Suítes
            </span>
            <h2 style={{ margin: 0, fontSize: "clamp(32px, 4.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 800 }}>
              Escolha pelo tamanho{" "}
              <span className="destaque" style={{ color: "var(--coral-claro)" }}>
                da sua turma.
              </span>
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: "36ch", fontSize: 15, lineHeight: 1.7, color: "var(--azul-claro)" }}>
            Todas com banheiro privativo, ar-condicionado e mesa. Diárias de R$ {DIARIA_MINIMA} a R$ {DIARIA_MAXIMA}, sem
            taxa escondida.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
          {/* Seletor de suítes */}
          <div role="tablist" aria-label="Suítes" style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 10 }}>
            {QUARTOS.map((quarto, i) => {
              const ativa = i === indice;
              return (
                <button
                  key={quarto.id}
                  type="button"
                  role="tab"
                  id={`aba-${quarto.id}`}
                  aria-selected={ativa}
                  aria-controls="painel-suite"
                  onClick={() => setIndice(i)}
                  style={{
                    width: "100%",
                    minHeight: 84,
                    padding: "14px 18px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    font: "inherit",
                    cursor: "pointer",
                    textAlign: "left",
                    border: ativa ? "1px solid var(--coral-claro)" : "1px solid rgba(255,255,255,0.16)",
                    background: ativa ? "#FFFFFF" : "rgba(255,255,255,0.04)",
                    color: ativa ? "var(--azul-escuro)" : "#FFFFFF",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: 800,
                      background: ativa ? "var(--coral)" : "rgba(255,255,255,0.1)",
                      color: ativa ? "#1A0E05" : "#FFFFFF",
                    }}
                  >
                    {quarto.capacidade}
                  </span>
                  <span style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 18, fontWeight: 800 }}>Suíte {quarto.nome}</span>
                    <span style={{ fontSize: 13, opacity: 0.8 }}>{quarto.pessoas}</span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ fontSize: 18, fontWeight: 800 }}>R$ {quarto.preco}</span>
                    <span style={{ fontSize: 12, opacity: 0.75 }}>por noite</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Vitrine da suíte escolhida */}
          <article
            id="painel-suite"
            role="tabpanel"
            aria-labelledby={`aba-${atual.id}`}
            style={{
              flex: "2 1 520px",
              minWidth: 0,
              background: "#FFFFFF",
              color: "var(--tinta)",
              borderRadius: 28,
              overflow: "hidden",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={caminhoQuarto(atual.id)}
              aria-label={`Ver página da Suíte ${atual.nome}`}
              style={{ flex: "1 1 300px", minWidth: 0, position: "relative", minHeight: 340, display: "block" }}
            >
              {atual.foto.src && (
                <Image
                  key={atual.id}
                  src={atual.foto.src}
                  alt={atual.foto.alt}
                  fill
                  sizes="(max-width: 960px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                />
              )}
            </Link>
            <div style={{ flex: "1 1 280px", padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--coral-texto)" }}>{atual.pessoas}</span>
                <h3 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--azul-escuro)" }}>
                  Suíte {atual.nome}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--tinta-suave)" }}>{atual.texto}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 14, fontWeight: 600 }}>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
                    <circle cx="7" cy="11" r="2" />
                  </svg>
                  {atual.camas}
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
                    <path d="M6 12V5a2 2 0 0 1 4 0" />
                  </svg>
                  Banheiro privativo
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--azul)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18" />
                  </svg>
                  Ar-condicionado individual
                </li>
              </ul>

              <Avisos variante="compacto" />

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 18,
                  borderTop: "1px solid #EFE7DA",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                }}
              >
                <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--azul-escuro)" }}>
                    R$ {formatarPreco(atual.preco)}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--tinta-clara)" }}>/ noite</span>
                </span>
                <a
                  href={linkWhatsApp(undefined, mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  aria-label={`Reservar a Suíte ${atual.nome} pelo WhatsApp`}
                  style={{
                    minHeight: 50,
                    padding: "0 20px",
                    borderRadius: 14,
                    background: "var(--azul)",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Reservar esta suíte
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* Comparativo lado a lado */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Compare lado a lado</h3>
          <div style={{ overflowX: "auto", borderRadius: 20, border: "1px solid rgba(255,255,255,0.16)" }}>
            <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.06)", textAlign: "left" }}>
                  <th scope="col" style={{ ...celula, color: "var(--azul-claro)" }}>
                    <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Item</span>
                  </th>
                  {QUARTOS.map((q) => (
                    <th key={q.id} scope="col" style={{ ...celula, fontWeight: 800 }}>
                      {q.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={linha}>
                  <th scope="row" style={cabecalhoLinha}>Pessoas</th>
                  {QUARTOS.map((q) => (
                    <td key={q.id} style={celula}>{q.capacidade}</td>
                  ))}
                </tr>
                <tr style={linha}>
                  <th scope="row" style={cabecalhoLinha}>Camas</th>
                  {QUARTOS.map((q) => (
                    <td key={q.id} style={celula}>{q.camas}</td>
                  ))}
                </tr>
                <tr style={linha}>
                  <th scope="row" style={cabecalhoLinha}>Ideal para</th>
                  {QUARTOS.map((q) => (
                    <td key={q.id} style={celula}>{q.idealPara}</td>
                  ))}
                </tr>
                <tr style={linha}>
                  <th scope="row" style={cabecalhoLinha}>Diária</th>
                  {QUARTOS.map((q) => (
                    <td key={q.id} style={{ ...celula, fontWeight: 800, color: "var(--coral-claro)" }}>
                      R$ {q.preco}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--azul-claro)" }}>
            * Diárias sem café da manhã. {AVISOS.cafe} {AVISOS.valores}
          </p>
        </div>
      </div>
    </section>
  );
}
