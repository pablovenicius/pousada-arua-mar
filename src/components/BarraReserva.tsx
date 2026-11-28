"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CAFE_DA_MANHA, MENSAGEM_PADRAO, QUARTOS, formatarPreco, linkWhatsApp } from "@/data/pousada";
import {
  PESSOA_EXTRA,
  PRIMEIRA_NOITE,
  TARIFAS_ATUALIZADAS_EM,
  ULTIMA_NOITE,
  calcularEstadia,
  type ResultadoEstadia,
} from "@/data/tarifas";
import IconWhatsApp from "./IconWhatsApp";
import { reportWhatsAppClick } from "@/lib/gtag";

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

/** "2026-11-20" → "20/11/2026" */
const dataBr = (iso: string) => iso.split("-").reverse().join("/");

/** O dia mais tarde entre dois AAAA-MM-DD. */
const maisTarde = (a: string, b: string) => (a > b ? a : b);

/** Noite seguinte a uma data AAAA-MM-DD. */
function diaSeguinte(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** Sistema da pousada, de onde vêm o preço e a vaga do dia (motor de reservas). */
const MOTOR_URL = process.env.NEXT_PUBLIC_MOTOR_URL ?? "https://aruamar.onrender.com";

/** Resposta de GET /api/publico/disponibilidade. */
interface DadosMotor {
  completo: boolean;
  total: number | null;
  dias: { data: string; diaria: number | null; disponivel: boolean }[];
}

type Estadia = ResultadoEstadia | { status: "indisponivel"; datas: string[] };

/**
 * Usa o preço e a vaga do sistema quando vieram; senão, mantém o cálculo pela tabela do site.
 * Estadias de mínimo de noites (Réveillon) continuam pela regra do site.
 */
function resolverEstadia(local: ResultadoEstadia, remoto: DadosMotor | null): Estadia {
  if (!remoto || local.status === "minimo" || local.status === "invalida") return local;
  const semVaga = remoto.dias.filter((d) => !d.disponivel).map((d) => d.data);
  if (semVaga.length > 0) return { status: "indisponivel", datas: semVaga };
  if (!remoto.completo || remoto.total === null) return local;

  const grupos: { noites: number; diaria: number }[] = [];
  for (const d of remoto.dias) {
    const diaria = d.diaria ?? 0;
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.diaria === diaria) ultimo.noites += 1;
    else grupos.push({ noites: 1, diaria });
  }
  return {
    status: "ok",
    total: remoto.total,
    grupos,
    baixaTemporada: local.status === "ok" && local.baixaTemporada,
    especial: local.status === "ok" ? local.especial : undefined,
  };
}

/** false na renderização do servidor e na hidratação; true depois, no navegador. */
const nadaMuda = () => () => {};
function useNoNavegador(): boolean {
  return useSyncExternalStore(nadaMuda, () => true, () => false);
}

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
 * Simulador: o hóspede escolhe datas, número de pessoas e café.
 * O valor de cada noite vem do calendário de preços da pousada (data/tarifas.ts),
 * igual ao mapa do sistema: diária de 1 ou 2 pessoas + R$ 40 por pessoa extra.
 * A suíte é sugerida pela capacidade e o botão abre o WhatsApp com a mensagem pronta.
 */
export default function BarraReserva() {
  // Exemplo inicial: 1 diária para 1 pessoa (Suíte Individual), até o visitante simular.
  // Nunca antes da primeira noite com preço no site.
  const [checkin, setCheckin] = useState(() => maisTarde(dataMais(7), PRIMEIRA_NOITE));
  const [checkout, setCheckout] = useState(() => diaSeguinte(maisTarde(dataMais(7), PRIMEIRA_NOITE)));
  // As datas dependem do relógio de quem visita: o valor só aparece depois que a página abre no navegador.
  const noNavegador = useNoNavegador();
  const [hospedes, setHospedes] = useState(1);
  const [cafe, setCafe] = useState(false);

  const tIn = paraUTC(checkin);
  const tOut = paraUTC(checkout);
  const noites = tIn !== null && tOut !== null ? Math.max(Math.round((tOut - tIn) / 864e5), 0) : 0;
  const suite = QUARTOS.find((q) => q.capacidade >= hospedes) ?? QUARTOS[QUARTOS.length - 1];
  // Preço e vaga vindos do sistema da pousada; enquanto não chegam, vale a tabela do site.
  const [remoto, setRemoto] = useState<{ chave: string; dados: DadosMotor | null } | null>(null);
  const chaveBusca = `${checkin}|${checkout}|${hospedes}`;
  useEffect(() => {
    if (noites <= 0) return;
    const controle = new AbortController();
    fetch(`${MOTOR_URL}/api/publico/disponibilidade?inicio=${checkin}&fim=${checkout}&adultos=${hospedes}&criancas=0`, {
      signal: controle.signal,
    })
      .then((r) => (r.ok ? (r.json() as Promise<DadosMotor>) : null))
      .then((dados) => setRemoto({ chave: chaveBusca, dados }))
      .catch(() => {
        if (!controle.signal.aborted) setRemoto({ chave: chaveBusca, dados: null });
      });
    return () => controle.abort();
  }, [chaveBusca, checkin, checkout, hospedes, noites]);
  const dadosRemotos = remoto?.chave === chaveBusca ? remoto.dados : null;

  const estadia: Estadia = resolverEstadia(calcularEstadia(checkin, checkout, hospedes), dadosRemotos);
  const valorCafe = cafe ? noites * hospedes * CAFE_DA_MANHA : 0;
  const total = estadia.status === "ok" ? estadia.total + valorCafe : null;

  const txtHospedes = `${hospedes} ${hospedes === 1 ? "pessoa" : "pessoas"}`;
  const txtNoites = `${noites} ${noites === 1 ? "noite" : "noites"}`;
  const calculo =
    estadia.status === "ok"
      ? estadia.grupos
          .map((g) => `${g.noites} ${g.noites === 1 ? "noite" : "noites"} × R$ ${formatarPreco(g.diaria)}`)
          .join(" + ") + (cafe ? ` + café R$ ${formatarPreco(valorCafe)}` : "")
      : "";

  // Selo e textos do resultado, conforme a estadia
  let selo = "";
  let destaque = "";
  let detalhe = "";
  if (estadia.status === "ok") {
    selo = estadia.especial
      ? `Valor de ${estadia.especial}`
      : estadia.baixaTemporada
        ? "Valor de baixa temporada"
        : "Valor de alta temporada / data especial";
    destaque = `R$ ${formatarPreco(total ?? 0)}`;
    detalhe = calculo;
  } else if (estadia.status === "minimo") {
    selo = estadia.nome;
    destaque = `Mínimo de ${estadia.minNoites} noites`;
    detalhe = `Para o ${estadia.nome}, escolha pelo menos ${estadia.minNoites} noites.`;
  } else if (estadia.status === "indisponivel") {
    selo = "Sem suíte livre nessas datas";
    destaque = "Consulte a recepção";
    detalhe = `Sem vaga em ${estadia.datas.map(dataBr).join(", ")}. Escolha outras datas ou fale com a recepção.`;
  } else if (estadia.status === "sem-tabela") {
    selo = "Data ainda sem preço no site";
    destaque = "Consulte o valor";
    detalhe = `Temos preços de ${dataBr(PRIMEIRA_NOITE)} a ${dataBr(ULTIMA_NOITE)}.`;
  } else {
    selo = "Escolha as datas";
    destaque = "—";
    detalhe = "A saída precisa ser depois da chegada.";
  }

  const linhaValor =
    estadia.status === "ok"
      ? `Valor no site para essas datas: R$ ${formatarPreco(total ?? 0)} (${calculo}). Gostaria de confirmar a disponibilidade.`
      : "Gostaria de saber o valor e a disponibilidade para essas datas.";
  const mensagem =
    `${MENSAGEM_PADRAO}\n\nSimulação: Suíte ${suite.nome}, ${txtHospedes}, ` +
    `de ${diaMes(checkin)} a ${diaMes(checkout)} (${txtNoites})${cafe ? ", com café da manhã" : ""}.\n` +
    linhaValor;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Cabeçalho do simulador: o valor segue o calendário de preços da pousada */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 14px", padding: "0 6px" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--azul-escuro)" }}>Simule sua estadia</h2>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 999,
            background: "var(--coral-suave)",
            color: "var(--coral-escuro)",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <path d="M12 16h.01" />
          </svg>
          O valor muda conforme a data: baixa temporada, alta temporada e feriados
        </span>
      </div>

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
            min={maisTarde(dataMais(0), PRIMEIRA_NOITE)}
            max={ULTIMA_NOITE}
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
            min={diaSeguinte(checkin)}
            max={diaSeguinte(ULTIMA_NOITE)}
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
          <span style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 2 }} aria-live="polite">
            <span style={{ fontSize: 11, color: "var(--coral-claro)", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {noNavegador ? selo : "Calculando…"}
            </span>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>
              {noNavegador ? destaque : "—"}
            </span>
            <span style={{ fontSize: 12, color: "var(--azul-claro)", fontWeight: 600 }}>
              {txtNoites} · Suíte {suite.nome}
              {cafe ? " · com café" : ""}
            </span>
            {noNavegador && detalhe && (
              <span style={{ fontSize: 12, color: "var(--azul-claro)", lineHeight: 1.4 }}>{detalhe}</span>
            )}
          </span>
          <a
            href={linkWhatsApp(undefined, mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={reportWhatsAppClick}
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
            Confirmar valor no WhatsApp
          </a>
        </div>
      </form>

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
        }}
      >
        <span style={{ flex: "1 1 320px" }}>
          <strong>O simulador segue o calendário de preços da pousada</strong> (diárias para 1 ou 2 pessoas; cada
          pessoa a mais soma R$ {formatarPreco(PESSOA_EXTRA)} por noite). Na alta temporada e nos feriados o valor é
          maior. Valores atualizados em {dataBr(TARIFAS_ATUALIZADAS_EM)}, sujeitos a disponibilidade e confirmação
          pela recepção.
        </span>
        <span style={{ flex: "1 1 240px" }}>
          <strong>Café da manhã é à parte:</strong> R$ {formatarPreco(CAFE_DA_MANHA)} por pessoa, por dia.
        </span>
      </div>
    </div>
  );
}
