import { MENSAGEM_PADRAO, linkWhatsApp } from "@/data/pousada";
import IconWhatsApp from "./IconWhatsApp";

/** Botão redondo do WhatsApp fixo no canto da tela, em todas as páginas. */
export default function WhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp(undefined, MENSAGEM_PADRAO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a pousada no WhatsApp"
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
      }}
    >
      <IconWhatsApp size={28} />
    </a>
  );
}
