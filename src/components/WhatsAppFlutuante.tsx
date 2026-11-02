"use client";

import { useEffect, useRef, useState } from "react";
import { MENSAGEM_PADRAO, linkWhatsApp } from "@/data/pousada";
import IconWhatsApp from "./IconWhatsApp";

/** Seleciona todos os links de WhatsApp da página, menos o próprio botão flutuante. */
const SELETOR_WHATS = 'a[href*="wa.me"]:not([data-whats-flutuante])';

/**
 * Botão redondo do WhatsApp fixo no canto da tela.
 * Some sozinho enquanto algum outro botão/link de WhatsApp estiver visível
 * durante a rolagem (barra de reserva, suítes, contato, rodapé…), para não
 * duplicar o mesmo botão na tela. Volta a aparecer quando nenhum estiver à vista.
 */
export default function WhatsAppFlutuante() {
  const [oculto, setOculto] = useState(false);
  const visiveis = useRef(new Set<Element>());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const atualizar = () => setOculto(visiveis.current.size > 0);

    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) visiveis.current.add(entrada.target);
        else visiveis.current.delete(entrada.target);
      }
      atualizar();
    });

    const observados = new Set<Element>();
    const observarLinks = () => {
      document.querySelectorAll(SELETOR_WHATS).forEach((el) => {
        if (!observados.has(el)) {
          observados.add(el);
          observador.observe(el);
        }
      });
      // Remove do controle links que saíram da página (ex.: troca de suíte nas abas)
      for (const el of observados) {
        if (!el.isConnected) {
          observador.unobserve(el);
          observados.delete(el);
          visiveis.current.delete(el);
        }
      }
      atualizar();
    };

    observarLinks();
    const mutacoes = new MutationObserver(observarLinks);
    mutacoes.observe(document.body, { childList: true, subtree: true });

    const conjuntoVisiveis = visiveis.current;
    return () => {
      mutacoes.disconnect();
      observador.disconnect();
      conjuntoVisiveis.clear();
    };
  }, []);

  return (
    <a
      href={linkWhatsApp(undefined, MENSAGEM_PADRAO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a pousada no WhatsApp"
      aria-hidden={oculto}
      tabIndex={oculto ? -1 : undefined}
      data-whats-flutuante=""
      className="btn"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 50,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "var(--verde-whats)",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 28px -8px rgba(15,46,82,0.5)",
        opacity: oculto ? 0 : 1,
        transform: oculto ? "scale(0.6) translateY(16px)" : "none",
        pointerEvents: oculto ? "none" : "auto",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      <IconWhatsApp size={28} />
    </a>
  );
}
