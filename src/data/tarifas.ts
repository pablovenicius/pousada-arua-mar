/**
 * Calendário de preços da Pousada Aruamar, copiado do mapa de preços do sistema da pousada
 * (aruamar.onrender.com → QuartoVerde, "Tarifa padrão").
 *
 * COMO FUNCIONA O PREÇO (igual à QuartoVerde):
 * - `valor` é a diária da suíte para 1 ou 2 pessoas, igual em todas as categorias
 *   (Individual/Dupla, Flex e Comfort).
 * - Cada pessoa acima de 2 soma PESSOA_EXTRA por noite (3 pessoas = +40, 4 pessoas = +80).
 * - Períodos com `minNoites` só aceitam estadias com pelo menos esse número de noites (Réveillon).
 * - Café da manhã é cobrado à parte (CAFE_DA_MANHA em data/pousada.ts).
 *
 * PARA ATUALIZAR: quando a pousada mudar os preços na QuartoVerde, troque os períodos abaixo
 * e a data de TARIFAS_ATUALIZADAS_EM. Datas fora desta tabela mostram "consulte pelo WhatsApp".
 */

export const TARIFAS_ATUALIZADAS_EM = "2026-11-21";

/** Valor somado por noite para cada pessoa acima de 2. */
export const PESSOA_EXTRA = 40;

/** Diária de baixa temporada (dias normais). */
export const DIARIA_BAIXA_TEMPORADA = 130;

export interface PeriodoTarifa {
  /** Primeira noite do período (AAAA-MM-DD). */
  inicio: string;
  /** Última noite do período (AAAA-MM-DD), inclusive. */
  fim: string;
  /** Diária para 1 ou 2 pessoas. */
  valor: number;
  /** Estadia mínima, em noites, para reservas que incluem alguma noite do período. */
  minNoites?: number;
  /** Nome do período, quando tem um (ex.: "Réveillon"). */
  nome?: string;
}

/** Noites de 21/11/2026 a 01/01/2028, conforme o mapa de preços lido em 21/11/2026. */
export const PERIODOS_TARIFA: PeriodoTarifa[] = [
  { inicio: "2026-11-21", fim: "2026-11-21", valor: 210 },
  { inicio: "2026-11-22", fim: "2026-11-30", valor: 130 },
  { inicio: "2026-12-01", fim: "2026-12-22", valor: 160 },
  { inicio: "2026-12-23", fim: "2026-12-28", valor: 210 },
  { inicio: "2026-12-29", fim: "2027-01-01", valor: 560, minNoites: 3, nome: "Réveillon" },
  { inicio: "2027-01-02", fim: "2027-02-28", valor: 210 },
  { inicio: "2027-03-01", fim: "2027-03-25", valor: 130 },
  { inicio: "2027-03-26", fim: "2027-03-28", valor: 210 },
  { inicio: "2027-03-29", fim: "2027-04-19", valor: 130 },
  { inicio: "2027-04-20", fim: "2027-04-21", valor: 210 },
  { inicio: "2027-04-22", fim: "2027-04-29", valor: 130 },
  { inicio: "2027-04-30", fim: "2027-05-01", valor: 210 },
  { inicio: "2027-05-02", fim: "2027-05-26", valor: 130 },
  { inicio: "2027-05-27", fim: "2027-05-30", valor: 210 },
  { inicio: "2027-05-31", fim: "2027-06-22", valor: 130 },
  { inicio: "2027-06-23", fim: "2027-06-30", valor: 210 },
  { inicio: "2027-07-01", fim: "2027-09-03", valor: 130 },
  { inicio: "2027-09-04", fim: "2027-09-07", valor: 210 },
  { inicio: "2027-09-08", fim: "2027-10-08", valor: 130 },
  { inicio: "2027-10-09", fim: "2027-10-12", valor: 210 },
  { inicio: "2027-10-13", fim: "2027-10-31", valor: 130 },
  { inicio: "2027-11-01", fim: "2027-11-11", valor: 210 },
  { inicio: "2027-11-12", fim: "2027-11-14", valor: 250 },
  { inicio: "2027-11-15", fim: "2027-12-28", valor: 210 },
  { inicio: "2027-12-29", fim: "2028-01-01", valor: 610, minNoites: 3, nome: "Réveillon" },
];

/** Primeira e última noite com preço no site. */
export const PRIMEIRA_NOITE = PERIODOS_TARIFA[0].inicio;
export const ULTIMA_NOITE = PERIODOS_TARIFA[PERIODOS_TARIFA.length - 1].fim;

/** Diária de uma noite para o número de pessoas, ou null se a data não está na tabela. */
export function diariaDaNoite(data: string, pessoas: number): { valor: number; periodo: PeriodoTarifa } | null {
  const periodo = PERIODOS_TARIFA.find((p) => data >= p.inicio && data <= p.fim);
  if (!periodo) return null;
  return { valor: periodo.valor + Math.max(0, pessoas - 2) * PESSOA_EXTRA, periodo };
}

export type ResultadoEstadia =
  | {
      status: "ok";
      total: number;
      /** Grupos de noites seguidas com a mesma diária, para mostrar o cálculo. */
      grupos: { noites: number; diaria: number }[];
      /** true quando todas as noites são de baixa temporada (diária normal). */
      baixaTemporada: boolean;
      /** Nome do período especial, se a estadia passa por um (ex.: "Réveillon"). */
      especial?: string;
    }
  | { status: "sem-tabela" }
  | { status: "minimo"; minNoites: number; nome: string }
  | { status: "invalida" };

/** Noites da estadia (a noite do check-out não conta). */
function noitesDaEstadia(checkin: string, checkout: string): string[] {
  const noites: string[] = [];
  const inicio = new Date(`${checkin}T00:00:00Z`);
  const fim = new Date(`${checkout}T00:00:00Z`);
  if (Number.isNaN(inicio.getTime()) || Number.isNaN(fim.getTime())) return noites;
  for (let d = inicio; d < fim; d.setUTCDate(d.getUTCDate() + 1)) noites.push(d.toISOString().slice(0, 10));
  return noites;
}

/** Valor da estadia pelo calendário de preços, sem café da manhã. */
export function calcularEstadia(checkin: string, checkout: string, pessoas: number): ResultadoEstadia {
  const noites = noitesDaEstadia(checkin, checkout);
  if (noites.length === 0) return { status: "invalida" };

  const diarias = noites.map((n) => diariaDaNoite(n, pessoas));
  if (diarias.some((d) => d === null)) return { status: "sem-tabela" };
  const validas = diarias as { valor: number; periodo: PeriodoTarifa }[];

  const comMinimo = validas.find((d) => d.periodo.minNoites && noites.length < d.periodo.minNoites);
  if (comMinimo?.periodo.minNoites) {
    return { status: "minimo", minNoites: comMinimo.periodo.minNoites, nome: comMinimo.periodo.nome ?? "esse período" };
  }

  const grupos: { noites: number; diaria: number }[] = [];
  for (const d of validas) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.diaria === d.valor) ultimo.noites += 1;
    else grupos.push({ noites: 1, diaria: d.valor });
  }

  return {
    status: "ok",
    total: validas.reduce((soma, d) => soma + d.valor, 0),
    grupos,
    baixaTemporada: validas.every((d) => d.periodo.valor === DIARIA_BAIXA_TEMPORADA),
    especial: validas.find((d) => d.periodo.nome)?.periodo.nome,
  };
}
