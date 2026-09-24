import Link from "next/link";
import ImageSlot from "./ImageSlot";
import type { Quarto } from "@/types/pousada";
import { CAFE_DA_MANHA, MIMOS, formatarPreco, linkWhatsApp } from "@/data/pousada";

interface DetalheQuartoProps {
  quarto: Quarto;
}

export default function DetalheQuarto({ quarto }: DetalheQuartoProps) {
  const mensagemWhatsApp = `Olá! Gostaria de reservar a Suíte ${quarto.nome} (${quarto.pessoas}) da Pousada Aruamar.`;

  return (
    <main style={{ background: "#FBF8F3", color: "#0E2A33" }}>
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(28px, 5vw, 56px) clamp(20px, 5vw, 64px) clamp(64px, 9vw, 120px)",
        }}
      >
        <Link
          href="/#acomodacoes"
          className="link-nav"
          style={{
            display: "inline-block",
            marginBottom: 28,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#34535C",
          }}
        >
          ← Ver todas as acomodações
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
            gap: "clamp(28px, 4vw, 56px)",
            alignItems: "start",
          }}
          className="grid-quartos"
        >
          <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "4 / 3" }}>
            <ImageSlot foto={quarto.foto} priority />
          </div>

          <div>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 12,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#B07C3F",
              }}
            >
              Acomodações · {quarto.pessoas}
            </p>
            <h1
              style={{
                margin: "0 0 18px",
                fontFamily: "var(--fonte-titulo), serif",
                fontWeight: 300,
                fontSize: "clamp(34px, 4.6vw, 52px)",
                lineHeight: 1.1,
              }}
            >
              Suíte {quarto.nome}
            </h1>
            <p style={{ margin: "0 0 28px", fontSize: 16, lineHeight: 1.8, color: "#34535C" }}>{quarto.texto}</p>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                paddingBottom: 22,
                marginBottom: 26,
                borderBottom: "1px solid rgba(14,42,51,0.14)",
              }}
            >
              <span style={{ fontFamily: "var(--fonte-titulo), serif", fontSize: 40, lineHeight: 1 }}>
                R$ {formatarPreco(quarto.preco)}
              </span>
              <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B8188" }}>
                / noite
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <a
                href={linkWhatsApp(undefined, mensagemWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-escuro"
                style={{
                  padding: "15px 28px",
                  background: "#0E2A33",
                  color: "#FBF8F3",
                  borderRadius: 999,
                  letterSpacing: "0.08em",
                  fontSize: 13,
                  textTransform: "uppercase",
                }}
              >
                Faça sua Reserva
              </a>
              <Link
                href="/#acomodacoes"
                className="btn-contorno-escuro"
                style={{
                  padding: "15px 28px",
                  border: "1px solid rgba(14,42,51,0.3)",
                  borderRadius: 999,
                  letterSpacing: "0.08em",
                  fontSize: 13,
                  textTransform: "uppercase",
                }}
              >
                Ver outras suítes
              </Link>
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
              {MIMOS.map((mimo) => (
                <li key={mimo.titulo} style={{ fontSize: 14, lineHeight: 1.6, color: "#34535C" }}>
                  <strong style={{ color: "#0E2A33" }}>{mimo.titulo}.</strong> {mimo.texto}
                </li>
              ))}
              <li style={{ fontSize: 14, lineHeight: 1.6, color: "#34535C" }}>
                <strong style={{ color: "#0E2A33" }}>Café da manhã opcional.</strong> R$ {formatarPreco(CAFE_DA_MANHA)}{" "}
                por pessoa, por dia.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
