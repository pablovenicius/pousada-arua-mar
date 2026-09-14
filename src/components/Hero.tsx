import Image from "next/image";
import ImageSlot from "./ImageSlot";
import { FOTO_HERO } from "@/data/pousada";

export default function Hero() {
  return (
    <section
      className="hero-secao"
      style={{
        position: "relative",
        display: "grid",
        alignItems: "end",
        padding: "clamp(40px, 8vw, 96px) clamp(20px, 5vw, 64px) clamp(40px, 6vw, 72px)",
        overflow: "hidden",
      }}
    >
      <div className="hero-imagem-wrap" style={{ position: "absolute", inset: 0, zIndex: -10 }}>
        {FOTO_HERO.src ? (
          <Image
            src={FOTO_HERO.src}
            alt={FOTO_HERO.alt}
            fill
            priority
            sizes="100vw"
            className="hero-imagem"
          />
        ) : (
          <ImageSlot foto={FOTO_HERO} priority />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(180deg, rgba(14,42,51,0.42) 0%, rgba(14,42,51,0.15) 40%, rgba(14,42,51,0.82) 100%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 780, color: "#FBF8F3" }}>
        <p
          style={{
            margin: "0 0 22px",
            fontSize: 12,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#E4C89C",
          }}
        >
          Litoral · Pé na areia
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--fonte-titulo), serif",
            fontWeight: 300,
            fontSize: "clamp(44px, 8vw, 96px)",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            textWrap: "balance",
          }}
        >
          O mar acorda você.
          <br />
          <em style={{ fontStyle: "italic", color: "#E4C89C" }}>O resto a gente cuida.</em>
        </h1>
        <p
          style={{
            margin: "26px 0 34px",
            maxWidth: "46ch",
            fontSize: "clamp(15px, 1.6vw, 18px)",
            lineHeight: 1.7,
            color: "rgba(251,248,243,0.92)",
            textWrap: "pretty",
          }}
        >
          Silêncio de verdade e uma equipe que lembra o seu nome!
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <a
            className="btn-ouro"
            href="#reserva"
            style={{
              padding: "16px 30px",
              background: "#B07C3F",
              color: "#FBF8F3",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Falar com a reserva
          </a>
          <a
            className="btn-contorno-claro"
            href="#acomodacoes"
            style={{
              padding: "16px 30px",
              border: "1px solid rgba(251,248,243,0.5)",
              color: "#FBF8F3",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Ver acomodações
          </a>
        </div>
      </div>
    </section>
  );
}
