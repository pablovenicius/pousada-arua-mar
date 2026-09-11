interface IconInstagramProps {
  size?: number;
  color?: string;
}

/**
 * Ícone do Instagram em SVG (equivalente ao ícone da lucide-react),
 * usado no Header e no Footer ao lado dos demais canais de contato.
 */
export default function IconInstagram({ size = 20, color = "currentColor" }: IconInstagramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
