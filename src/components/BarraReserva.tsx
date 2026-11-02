"use client";

import { useState } from "react";
import { CAFE_DA_MANHA, QUARTOS, formatarPreco, linkWhatsApp } from "@/data/pousada";
import Avisos from "./Avisos";
import IconWhatsApp from "./IconWhatsApp";

/** AAAA-MM-DD de hoje + N dias, no fuso do navegador. */
function dataMais(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function paraUTC(iso: string): number | null {
  const [a, m, d] = iso.split("-").map(Number);
  return a && m && d ? Date.UTC(a, m - 1, d) : null;
}

/** "2026-11-20" → "20/11" */
const diaMes = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");

const rotuloCampo = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 4,
  padding: "10px 14px",
  borderRadius: 16,
  background: "var(--areia-media)",
  fontSize: 12,
  fontWeight: 700,
  color: "var(--tinta-clara)",
  letterSpacing: "0.03em",
  textTransform: "uppercase" as const,
};

const inputData = {
  border: "1px solid transparent",
  background: "transparent",
  padding: "2px 0",
  font: "inherit",
  fontSize: 16,
  fontWeight: 700,
  color: "var(--tinta)",
  textTransform: "none" as const,
  letterSpacing: 0,
  borderRadius: 8,
  width: "100%",
};

const botaoQtd = {
  width: 44,
  height: 44,
  borderRadius: 12,
  border: "1px solid #DED3C2",
  background: "#FFFFFF",
  color: "var(--azul-escuro)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

/**
 * Barra de consulta: o hóspede escolhe datas, número de pessoas e café.
 * A suíte é sugerida pela capacidade, a estimativa é calculada na hora e o
 * botão abre o WhatsApp com a mensagem pronta.
 */
export default function BarraReserva() {
  // Exemplo inicial: 1 diária para 1 pessoa (Suíte Individual), até o visitante simular.
  const [checkin, setCheckin] = useState(() => dataMais(7));
  const [checkout, setCheckout] = useState(() => dataMais(8));
  const [hospedes, setHospedes] = useState(1);
  const [cafe, setCafe] = useState(false);

  const tIn = paraUTC(checkin);
  const tOut = paraUTC(checkout);
  const noites = tIn !== null && tOut !== null ? Math.max(Math.round((tOut - tIn) / 864e5), 0) : 0;
  const suite = QUARTOS.find((q) => q.capacidade >= hospedes) ?? QUARTOS[QUARTOS.length - 1];
  const total = noites * suite.preco + (cafe ? noites * hospedes * CAFE_DA_MANHA : 0);

  const txtHospedes = `${hospedes} ${hospedes === 1 ? "pessoa" : "pessoas"}`;
  const txtNoites = `${noites} ${noites === 1 ? "noite" : "noites"}`;
  const mensagem =
    `Olá! Gostaria de consultar disponibilidade na Pousada Aruamar: Suíte ${suite.nome}, ${txtHospedes}, ` +
    `de ${diaMes(checkin)} a ${diaMes(checkout)} (${txtNoites})${cafe ? ", com café da manhã" : ""}.`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <form
        id="reservar"
        aria-label="Consultar disponibilidade"
        onSubmit={(e) => e.preventDefault()}
        style={{
          background: "#FFFFFF",
          border: "1px solid var(--borda)",
          borderRadius: 26,
          padding: 14,
          boxShadow: "0 24px 48px -28px rgba(15,46,82,0.4)",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "stretch",
        }}
      >
        <label style={{ ...rotuloCampo, flex: "1 1 160px" }}>
          Chegada
          <input
            className="campo"
            type="date"
            value={checkin}
            min={dataMais(0)}
            onChange={(e) => setCheckin(e.target.value)}
            style={inputData}
            suppressHydrationWarning
          />
        </label>
        <label style={{ ...rotuloCampo, flex: "1 1 160px" }}>
          Saída
          <input
            className="campo"
            type="date"
            value={checkout}
            min={checkin}
            onChange={(e) => setCheckout(e.target.value)}
            style={inputData}
            suppressHydrationWarning
          />
        </label>

        <div
          style={{
            flex: "1 1 170px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "8px 8px 8px 14px",
            borderRadius: 16,
            background: "var(--areia-media)",
          }}
        >
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--tinta-clara)", letterSpacing: "0.03em", textTransform: "uppercase" }}>
              Hóspedes
            </span>
            <span style={{ fontSize: 16, fontWeight: 700 }} aria-live="polite">
              {txtHospedes}
            </span>
          </span>
          <span style={{ display: "flex", gap: 6 }}>
            <button type="button" aria-label="Menos hóspedes" onClick={() => setHospedes((h) => Math.max(1, h - 1))} style={botaoQtd}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button type="button" aria-label="Mais hóspedes" onClick={() => setHospedes((h) => Math.min(4, h + 1))} style={botaoQtd}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </button>
          </span>
        </div>

        <label
          style={{
            flex: "1 1 150px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 16,
            background: "var(--areia-media)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={cafe}
            onChange={(e) => setCafe(e.target.checked)}
            style={{ width: 20, height: 20, accentColor: "var(--azul)" }}
          />
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Com café</span>
            <span style={{ fontSize: 12, color: "var(--tinta-clara)" }}>
              + R$ {formatarPreco(CAFE_DA_MANHA)} por pessoa/dia
            </span>
          </span>
        </label>

        <div
          style={{
            flex: "2 1 300px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
            padding: "8px 8px 8px 16px",
            borderRadius: 18,
            background: "var(--azul-escuro)",
            color: "#FFFFFF",
          }}
        >
          <span style={{ flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 2 }} aria-live="polite">
            <span style={{ fontSize: 12, color: "var(--azul-claro)", fontWeight: 600 }}>
              {txtNoites} · Suíte {suite.nome}
              {cafe ? " · com café" : ""}
            </span>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>
              R$ {formatarPreco(total)}
            </span>
          </span>
          <a
            href={linkWhatsApp(undefined, mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            suppressHydrationWarning
            style={{
              minHeight: 52,
              padding: "0 20px",
              borderRadius: 14,
              background: "var(--coral)",
              color: "#1A0E05",
              fontSize: 15,
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <IconWhatsApp size={18} />
            Consultar no WhatsApp
          </a>
        </div>
      </form>

      <Avisos />
    </div>
  );
}
