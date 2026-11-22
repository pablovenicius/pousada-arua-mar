/**
 * Tag do Google (Google Ads) da Pousada Aruamar.
 * A tag é carregada em todas as páginas pelo app/layout.tsx.
 * Estes IDs são públicos (ficam no código do site).
 */
export const GOOGLE_ADS_ID = "AW-11133061318";

/** Conversão "Clique no WhatsApp" criada no Google Ads. */
export const CONVERSAO_WHATSAPP = "AW-11133061318/oA3uCOfIxLodEMaR1Lwp";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Dispara a conversão "Clique no WhatsApp" no Google Ads.
 * Não bloqueia nem altera a navegação: o link do WhatsApp continua abrindo normalmente.
 * Só deve ser chamada no clique (nunca no carregamento da página).
 */
export function reportWhatsAppClick(): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: CONVERSAO_WHATSAPP,
      value: 1.0,
      currency: "BRL",
    });
  }
}
