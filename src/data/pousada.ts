import type { Arredor, Contato, Foto, FotoGaleria, Mimo, Quarto, Selo } from "@/types/pousada";

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
  instagramUsuario: "@pousadaaruamar",
  mapa: "https://www.google.com/maps/search/?api=1&query=Rua+Evaldo+Campos+Junior+564+Aruana+Aracaju+SE",
};

/** Avisos exibidos junto aos preços (barra de reserva, suítes e páginas de cada suíte). */
export const AVISOS = {
  valores: "Os valores podem ser alterados em feriados e datas especiais.",
  cafe: `Café da manhã é à parte: R$ ${formatarPreco(CAFE_DA_MANHA)} por pessoa, por dia.`,
};

export const linkWhatsApp = (telefone: string = CONTATO.telefone, mensagem?: string): string => {
  const numero = telefone.replace(/\D/g, "");
  const base = `https://wa.me/55${numero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
};

export const MENSAGEM_PADRAO = "Olá! Gostaria de informações sobre a Pousada Aruamar.";

// URL da página individual de cada suíte (as rotas continuam /quarto-individual, /quarto-duplo…)
export const caminhoQuarto = (quartoId: string): string => `/quarto-${quartoId}`;

export const FOTO_HERO: Foto = {
  src: "/fotos/foto-pousada-vista-do-mar.jpeg",
  alt: "Fachada da Pousada Aruamar com o telhado azul",
  placeholder: "Foto da fachada da pousada",
};

/** Fotos da galeria horizontal da seção "A pousada". */
export const GALERIA: FotoGaleria[] = [
  { src: "/fotos/foto-pousada-vista-do-mar.jpeg", alt: "Fachada da Pousada Aruamar", placeholder: "Fachada", legenda: "Fachada", largura: 520 },
  { src: "/fotos/piscina-ou-jardim.jpg", alt: "Jardim interno entre as alas da pousada", placeholder: "Jardim interno", legenda: "Jardim interno", largura: 380 },
  { src: "/fotos/detalhe-do-cafe.jpeg", alt: "Salão do café da manhã", placeholder: "Salão do café", legenda: "Salão do café", largura: 460 },
  { src: "/fotos/quarto-com-vista.jpeg", alt: "Vista do pátio e da fachada da pousada", placeholder: "Vista do pátio", legenda: "Vista do pátio", largura: 460 },
  { src: "/fotos/varanda-ou-terraco.jpeg", alt: "Área de convivência da pousada", placeholder: "Área de convivência", legenda: "Área de convivência", largura: 420 },
  { src: "/fotos/suite-individual.jpg", alt: "Suíte Individual", placeholder: "Suíte Individual", legenda: "Suíte Individual", largura: 380 },
];

export const FOTO_LOCALIZACAO: Foto = {
  src: "/fotos/praia-ou-vista-aerea.jpeg",
  alt: "Letreiro Eu amo Aracaju na orla",
  placeholder: "Praia ou vista aérea da região",
};

export const SELOS: Selo[] = [
  { valor: "4", rotulo: "tipos de suíte, de 1 a 4 pessoas" },
  { valor: "400 m", rotulo: "até a praia" },
  { valor: "24h", rotulo: "de recepção, todos os dias" },
  { valor: "9 min", rotulo: "de carro do aeroporto" },
];

export const MIMOS: Mimo[] = [
  { titulo: "Ar-condicionado", texto: "Em todas as suítes, com controle individual." },
  { titulo: "Wi-Fi de fibra", texto: "Estável em toda extensão da pousada." },
  { titulo: "Estacionamento", texto: "Vaga gratuita para hóspedes." },
];

export const QUARTOS: Quarto[] = [
  {
    id: "individual",
    nome: "Individual",
    capacidade: 1,
    pessoas: "1 pessoa",
    preco: 130,
    camas: "1 cama de casal larga",
    idealPara: "Quem viaja só",
    texto: "Cama de casal larga, mesa e banheiro privativo. Para quem viaja só e dorme com o som do mar.",
    foto: { src: "/fotos/suite-individual.jpg", alt: "Suíte Individual da Pousada Aruamar", placeholder: "Suíte individual" },
  },
  {
    id: "duplo",
    nome: "Dupla",
    capacidade: 2,
    pessoas: "2 pessoas",
    preco: 130,
    camas: "1 cama de casal ou 2 de solteiro",
    idealPara: "Casais e amigos",
    texto: "Cama de casal ou duas de solteiro, à sua escolha, com mesa e banheiro privativo.",
    foto: { src: "/fotos/suite-dupla.jpg", alt: "Suíte Dupla da Pousada Aruamar", placeholder: "Suíte dupla" },
  },
  {
    id: "triplo",
    nome: "Tripla",
    capacidade: 3,
    pessoas: "3 pessoas",
    preco: 170,
    camas: "1 cama de casal + 1 de solteiro",
    idealPara: "Casal com um filho",
    texto: "Cama de casal mais solteiro, mesa e banheiro privativo. A favorita de quem viaja com um filho.",
    foto: { src: "/fotos/suite-tripla.jpg", alt: "Suíte Tripla da Pousada Aruamar", placeholder: "Suíte tripla" },
  },
  {
    id: "quadruplo",
    nome: "Quádrupla",
    capacidade: 4,
    pessoas: "4 pessoas",
    preco: 210,
    camas: "1 cama de casal + 2 de solteiro",
    idealPara: "Família inteira",
    texto:
      "Cama de casal e duas de solteiro, mesa, banheiro privativo e espaço para a bagagem da família inteira.",
    foto: { src: "/fotos/suite-quadrupla.jpg", alt: "Suíte Quádrupla da Pousada Aruamar", placeholder: "Suíte quádrupla" },
  },
];

export const ARREDORES: Arredor[] = [
  { lugar: "Praia principal", minutos: 5, tipo: "a-pe", rotulo: "400 m" },
  { lugar: "Restaurantes e bares", minutos: 5, tipo: "a-pe" },
  { lugar: "Food park", minutos: 5, tipo: "a-pe" },
  { lugar: "Shopping", minutos: 3, tipo: "carro" },
  { lugar: "Aeroporto", minutos: 9, tipo: "carro" },
  { lugar: "Rodoviária", minutos: 20, tipo: "carro" },
];
