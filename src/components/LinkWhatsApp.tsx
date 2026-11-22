"use client";

import type { ComponentProps } from "react";
import { reportWhatsAppClick } from "@/lib/gtag";

/**
 * Um <a> comum que, ao ser clicado, também registra a conversão "Clique no WhatsApp"
 * no Google Ads. Repassa todos os atributos (href, target, rel, className, style…)
 * sem mudar nada no visual. Usado nos componentes que rodam no servidor, que não
 * podem ter onClick direto.
 */
export default function LinkWhatsApp({ onClick, ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      onClick={(evento) => {
        reportWhatsAppClick();
        onClick?.(evento);
      }}
    />
  );
}
