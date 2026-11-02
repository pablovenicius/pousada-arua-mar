interface IconWhatsAppProps {
  size?: number;
  color?: string;
}

/** Ícone do WhatsApp em traço, no mesmo estilo do IconInstagram. */
export default function IconWhatsApp({ size = 20, color = "currentColor" }: IconWhatsAppProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .8a4 4 0 0 1-2.1-2.1l.8-1-1-2z" />
    </svg>
  );
}
