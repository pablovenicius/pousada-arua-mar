import type { Arredor, Contato, Foto, Mimo, Quarto, Selo } from "@/types/pousada";

export const DIARIA_MINIMA = 130;
export const DIARIA_MAXIMA = 210;
export const CAFE_DA_MANHA = 40;

export const formatarPreco = (valor: number): string =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const CONTATO: Contato = {
  telefone: "(79) 98119-8298",
  email: "aruamarpousada@gmail.com",
  endereco: ["Rua Evaldo Campos Junior, 564", "Bairro: Aruana, Aracaju - SE, 49000-203"],
  checkIn: "Check-in a partir das 13h",
  checkOut: "Check-out até 11h",
  instagram: "https://www.instagram.com/pousadaaruamar",
};

export const linkWhatsApp = (telefone: string = CONTATO.telefone): string =>
  `https://wa.me/55${telefone.replace(/\D/g, "")}`;

export const FOTO_HERO: Foto = {
  src: "/fotos/foto-pousada-vista-do-mar.jpeg",
  alt: "Fachada da Pousada Aruamar vista do mar",
  placeholder: "Foto da pousada vista do mar — horizontal, alta resolução",
};

// Versão do banner usada no celular. Enquanto uma foto vertical/otimizada
// para mobile não é enviada, reaproveita a mesma foto do desktop — o que já
// resolve o corte do logo, pois o "object-position" do mobile é diferente
// (ver .hero-imagem-mobile no globals.css). Quando tiver uma foto vertical
// (ex.: recortada em 3:4 ou 9:16 mostrando o logo por inteiro), basta trocar
// o "src" abaixo por ela, ex.: "/fotos/foto-pousada-vista-do-mar-mobile.jpeg".
export const FOTO_HERO_MOBILE: Foto = {
  src: "/fotos/foto-pousada-vista-do-mar.jpeg",
  alt: "Fachada da Pousada Aruamar vista do mar",
  placeholder: "Foto da pousada vista do mar — vertical, otimizada para celular",
};

export const FOTOS_POUSADA: Foto[] = [
  { src: "/fotos/varanda-ou-terraco.jpeg", alt: "Varanda da pousada", placeholder: "Varanda ou terraço" },
  { src: "/fotos/detalhe-do-cafe.jpeg", alt: "Café da manhã servido na varanda", placeholder: "Detalhe do café" },
  { src: "/fotos/quarto-com-vista.jpeg", alt: "Quarto com vista para o mar", placeholder: "Quarto com vista" },
  { src: "/fotos/piscina-ou-jardim.jpg", alt: "Área externa da pousada", placeholder: "Piscina ou jardim" },
];

export const FOTO_LOCALIZACAO: Foto = {
  src: "/fotos/praia-ou-vista-aerea.jpeg",
  alt: "Praia próxima à pousada",
  placeholder: "Praia ou vista aérea da região",
};

export const SELOS: Selo[] = [
  { valor: "4", rotulo: "opções de acomodações" },
  { valor: "5 min", rotulo: "até a praia" },
  { valor: "24h", rotulo: "recepção" },
  { valor: `R$ ${formatarPreco(DIARIA_MINIMA)}`, rotulo: "diária a partir de" },
];

export const MIMOS: Mimo[] = [
  { titulo: "Ar-condicionado", texto: "Em todos os quartos, com controle individual." },
  { titulo: "Wi-Fi de fibra", texto: "Estável em toda extensão da pousada." },
  { titulo: "Estacionamento", texto: "Vaga gratuita para hóspedes." },
];

export const QUARTOS: Quarto[] = [
  {
    id: "individual",
    nome: "Individual",
    pessoas: "1 pessoa",
    preco: 130,
    texto:
      "Cama de Casal larga, mesa e banheiro privativo. Para quem viaja só e dorme com o som do mar.",
    foto: { src: "/fotos/quarto-individual.jpeg", alt: "Quarto individual", placeholder: "Quarto individual" },
  },
  {
    id: "duplo",
    nome: "Duplo",
    pessoas: "2 pessoas",
    preco: 130,
    texto:
      "Cama de casal ou duas de solteiro, à sua escolha com mesa e banheiro privativo.",
    foto: { src: "/fotos/quarto-duplo.jpeg", alt: "Quarto duplo", placeholder: "Quarto duplo" },
  },
  {
    id: "triplo",
    nome: "Triplo",
    pessoas: "3 pessoas",
    preco: 170,
    texto:
      "Cama de Casal mais solteiro, mesa e banheiro privativo. O favorito de quem viaja com um filho.",
    foto: { src: "/fotos/quarto-triplo.jpeg", alt: "Quarto triplo", placeholder: "Quarto triplo" },
  },
  {
    id: "quadruplo",
    nome: "Quádruplo",
    pessoas: "4 pessoas",
    preco: 210,
    texto:
      "Camas de casal e duas de solteiro. Mesa e banheiro privativo e espaço para bagagem de família inteira sem tropeço.",
    foto: { src: "/fotos/quarto-quadruplo.jpeg", alt: "Quarto quádruplo", placeholder: "Quarto quádruplo" },
  },
];

export const ARREDORES: Arredor[] = [
  { lugar: "Praia principal", tempo: "5 min a pé" },
  { lugar: "Restaurantes e bares", tempo: "5 min a pé" },
  { lugar: "Aeroporto", tempo: "a 9min de carro" },
  { lugar: "Rodoviária", tempo: "a 20min de carro" },
  { lugar: "Shopping", tempo: "a 3min de carro" },
  { lugar: "Food park", tempo: "5 min a pé" },
];
