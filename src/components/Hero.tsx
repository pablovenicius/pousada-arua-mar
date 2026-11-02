import Image from "next/image";
import Link from "next/link";
import { CONTATO, DIARIA_MINIMA, FOTO_HERO, MENSAGEM_PADRAO, linkWhatsApp } from "@/data/pousada";
import BarraReserva from "./BarraReserva";
import IconWhatsApp from "./IconWhatsApp";

export default function Hero() {
  return (
    <section
      id="topo"
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "clamp(28px, 5vw, 64px) clamp(16px, 4vw, 40px) 0",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px, 5vw, 64px)", alignItems: "center" }}>
        <div style={{ flex: "1 1 420px", minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 999,
              background: "var(--coral-suave)",
              color: "#8A3D10",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            Bairro Aruana · 400 metros da praia
          </span>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(42px, 6vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: "var(--azul-escuro)",
              textWrap: "balance",
            }}
          >
            O mar acorda você.{" "}
            <span className="destaque" style={{ color: "#B0531B" }}>
              O resto a gente cuida.
            </span>
          </h1>

          <p style={{ margin: 0, maxWidth: "46ch", fontSize: 18, lineHeight: 1.65, color: "var(--tinta-suave)", textWrap: "pretty" }}>
            Silêncio de verdade e uma equipe que lembra o seu nome. Suítes da Individual à Quádrupla,
            recepção 24 horas e café da manhã opcional.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link
              href="/#suites"
              className="btn"
              style={{
                minHeight: 52,
                padding: "0 26px",
                borderRadius: 999,
                background: "var(--azul-escuro)",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Ver suítes e preços
            </Link>
            <a
              href={linkWhatsApp(undefined, MENSAGEM_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                minHeight: 52,
                padding: "0 22px",
                borderRadius: 999,
                border: "1px solid rgba(14,36,51,0.2)",
                color: "var(--tinta)",
                fontSize: 15,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <IconWhatsApp size={20} color="var(--verde-whats)" />
              {CONTATO.telefone}
            </a>
          </div>
        </div>

        <div
          style={{
            flex: "1 1 520px",
            minWidth: 0,
            position: "relative",
            height: "clamp(340px, 42vw, 560px)",
            borderRadius: 32,
            overflow: "hidden",
          }}
        >
          {FOTO_HERO.src && (
            <Image
              src={FOTO_HERO.src}
              alt={FOTO_HERO.alt}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 620px"
              style={{ objectFit: "cover" }}
            />
          )}
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px 12px 12px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.94)",
              boxShadow: "0 12px 30px -10px rgba(15,46,82,0.35)",
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "var(--azul)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 15, fontWeight: 800 }}>Recepção 24h</span>
              <span style={{ fontSize: 12, color: "var(--tinta-clara)" }}>Check-in 13h · Check-out 11h</span>
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              right: 16,
              top: 16,
              padding: "10px 16px",
              borderRadius: 999,
              background: "var(--coral)",
              color: "#1A0E05",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            a partir de R$ {DIARIA_MINIMA}/noite
          </div>
        </div>
      </div>

      <BarraReserva />
    </section>
  );
}
