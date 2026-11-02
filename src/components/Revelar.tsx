"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Faz o conteúdo surgir suavemente quando entra na tela durante a rolagem.
 * Sem JavaScript (ou com "reduzir movimento" ligado) o conteúdo aparece normal.
 */
export default function Revelar({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.visivel = "true";
      return;
    }
    el.dataset.visivel = "false";
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          el.dataset.visivel = "true";
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className="revelar" data-visivel="true">
      {children}
    </div>
  );
}
