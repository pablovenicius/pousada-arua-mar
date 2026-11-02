import Image from "next/image";
import Link from "next/link";
import type { Quarto } from "@/types/pousada";
import { MENSAGEM_PADRAO, MIMOS, QUARTOS, caminhoQuarto, formatarPreco, linkWhatsApp } from "@/data/pousada";
import Avisos from "./Avisos";
import IconWhatsApp from "./IconWhatsApp";

interface DetalheQuartoProps {
  quarto: Quarto;
}

export default function DetalheQuarto({ quarto }: DetalheQuartoProps) {
  const mensagemWhatsApp = `${MENSAGEM_PADRAO}\n\nTenho interesse na Suíte ${quarto.nome} (${quarto.pessoas}).`;
  const outras = QUARTOS.filter((q) => q.id !== quarto.id);

  return (
    <main style={{ background: "var(--areia)", color: "var(--tinta)" }}>
      <section
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "clamp(28px, 5vw, 56px) clamp(16px, 4vw, 40px) clamp(64px, 9vw, 112px)",
        }}
      >
        <Link
          href="/#suites"
          className="link-nav"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, minHeight: 44, marginBottom: 20, fontSize: 14, fontWeight: 700 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Ver todas as suítes
        </Link>

        <div
          className="grid-detalhe"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
            gap: "clamp(28px, 4vw, 56px)",
            alignItems: "start",
          }}
        >
          <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", aspectRatio: "4 / 5", background: "#E9E2D6" }}>
            {quarto.foto.src && (
              <Image src={quarto.foto.src} alt={quarto.foto.alt} fill priority sizes="(max-width: 768px) 100vw, 640px" style={{ objectFit: "cover" }} />
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--coral-texto)" }}>
                Suíte · {quarto.pessoas}
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(36px, 5vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  fontWeight: 800,
                  color: "var(--azul-escuro)",
                }}
              >
                Suíte <span className="destaque" style={{ color: "#B0531B" }}>{quarto.nome}</span>
              </h1>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: "var(--tinta-suave)" }}>{quarto.texto}</p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: 20,
                borderRadius: 22,
                background: "#FFFFFF",
                border: "1px solid var(--borda)",
              }}
            >
              <span style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--azul-escuro)" }}>
                  R$ {formatarPreco(quarto.preco)}
                </span>
                <span style={{ fontSize: 14, color: "var(--tinta-clara)" }}>/ noite</span>
              </span>
              <a
                href={linkWhatsApp(undefined, mensagemWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  minHeight: 52,
                  padding: "0 22px",
                  borderRadius: 14,
                  background: "var(--azul)",
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <IconWhatsApp size={18} />
                Faça sua Reserva
              </a>
            </div>

            <Avisos />

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <li style={{ fontSize: 15, lineHeight: 1.6, color: "var(--tinta-suave)" }}>
                <strong style={{ color: "var(--tinta)" }}>Camas.</strong> {quarto.camas}.
              </li>
              {MIMOS.map((mimo) => (
                <li key={mimo.titulo} style={{ fontSize: 15, lineHeight: 1.6, color: "var(--tinta-suave)" }}>
                  <strong style={{ color: "var(--tinta)" }}>{mimo.titulo}.</strong> {mimo.texto}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--tinta-clara)" }}>
                Outras suítes
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {outras.map((q) => (
                  <Link
                    key={q.id}
                    href={caminhoQuarto(q.id)}
                    style={{
                      minHeight: 44,
                      padding: "0 16px",
                      borderRadius: 999,
                      border: "1px solid #DED3C2",
                      background: "#FFFFFF",
                      color: "var(--azul-escuro)",
                      fontSize: 14,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {q.nome} · R$ {q.preco}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
