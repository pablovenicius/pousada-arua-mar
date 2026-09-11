import type { CSSProperties } from "react";
import type { Foto } from "@/types/pousada";

interface ImageSlotProps {
  foto: Foto;
  radius?: number;
  style?: CSSProperties;
  /** Prioriza o carregamento (use apenas na imagem do topo). */
  priority?: boolean;
}

/**
 * Mostra a foto quando `foto.src` está preenchido; caso contrário desenha um
 * placeholder com a instrução do que deve entrar ali.
 */
export default function ImageSlot({ foto, radius = 0, style, priority = false }: ImageSlotProps) {
  const base: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: radius,
    overflow: "hidden",
    ...style,
  };

  if (!foto.src) {
    return (
      <div
        style={{
          ...base,
          display: "grid",
          placeItems: "center",
          padding: 16,
          textAlign: "center",
          background: "#E9E2D6",
          border: "1px dashed rgba(14,42,51,0.25)",
          color: "#6B8188",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {foto.placeholder}
      </div>
    );
  }

  return (
    <div style={base}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foto.src}
        alt={foto.alt}
        loading={priority ? "eager" : "lazy"}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}
