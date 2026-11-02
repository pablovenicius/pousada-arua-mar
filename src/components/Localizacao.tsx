import Image from "next/image";
import { ARREDORES, CONTATO, FOTO_LOCALIZACAO } from "@/data/pousada";
import type { Arredor } from "@/types/pousada";

const MAIOR_TEMPO = Math.max(...ARREDORES.map((a) => a.minutos));

function ListaDistancias({ titulo, itens }: { titulo: string; itens: Arredor[] }) {
  return (
    <>
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--tinta-clara)",
          margin: "8px 0 6px",
        }}
      >
        {titulo}
      </span>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {itens.map((item) => (
          <li key={item.lugar} style={{ display: "flex", alignItems: "center", gap: 14, minHeight: 40 }}>
            <span style={{ flex: "0 0 clamp(120px, 30%, 170px)", fontSize: 15, fontWeight: 600 }}>{item.lugar}</span>
            <span
              aria-hidden="true"
              style={{ flex: "1 1 auto", height: 8, borderRadius: 4, background: "#F1EADF", overflow: "hidden" }}
            >
              <span
                style={{
                  display: "block",
                  height: "100%",
                  borderRadius: 4,
                  background: "var(--azul)",
                  width: `${Math.max(10, Math.round((item.minutos / MAIOR_TEMPO) * 100))}%`,
                }}
              />
            </span>
            <span style={{ flex: "0 0 64px", textAlign: "right", fontSize: 14, fontWeight: 800, color: "var(--azul-escuro)" }}>
              {item.rotulo ?? `${item.minutos} min`}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Localizacao() {
  return (
    <section
      id="localizacao"
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "clamp(64px, 9vw, 112px) clamp(16px, 4vw, 40px) 0",
        display: "flex",
        flexWrap: "wrap",
        gap: "clamp(28px, 4vw, 48px)",
        alignItems: "stretch",
      }}
    >
      <div style={{ flex: "1 1 380px", minWidth: 0, position: "relative", borderRadius: 28, overflow: "hidden", minHeight: 460 }}>
        {FOTO_LOCALIZACAO.src && (
          <Image
            src={FOTO_LOCALIZACAO.src}
            alt={FOTO_LOCALIZACAO.alt}
            fill
            sizes="(max-width: 960px) 100vw, 520px"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 16,
            padding: 18,
            borderRadius: 20,
            background: "rgba(255,255,255,0.95)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 800 }}>{CONTATO.endereco[0]}</span>
          <span style={{ fontSize: 13, color: "var(--tinta-clara)" }}>{CONTATO.endereco[1]}</span>
          <a
            href={CONTATO.mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              alignSelf: "flex-start",
              minHeight: 44,
              padding: "0 16px",
              borderRadius: 12,
              background: "var(--azul-escuro)",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Abrir no Google Maps
          </a>
        </div>
      </div>

      <div style={{ flex: "1 1 460px", minWidth: 0, display: "flex", flexDirection: "column", gap: 22 }}>
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--coral-texto)" }}>
          Localização
        </span>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(32px, 4.2vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 800,
            color: "var(--azul-escuro)",
          }}
        >
          Rua calma,{" "}
          <span className="destaque" style={{ color: "#B0531B" }}>
            tudo perto.
          </span>
        </h2>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: "var(--tinta-suave)", textWrap: "pretty" }}>
          Uma rua residencial e tranquila, a 400 metros da praia e perto do shopping, do food park e das padarias do
          bairro.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 20,
            borderRadius: 22,
            background: "#FFFFFF",
            border: "1px solid var(--borda)",
          }}
        >
          <ListaDistancias titulo="A pé" itens={ARREDORES.filter((a) => a.tipo === "a-pe")} />
          <ListaDistancias titulo="De carro" itens={ARREDORES.filter((a) => a.tipo === "carro")} />
        </div>
      </div>
    </section>
  );
}
