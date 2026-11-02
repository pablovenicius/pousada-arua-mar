export interface Selo {
  valor: string;
  rotulo: string;
}

export interface Mimo {
  titulo: string;
  texto: string;
}

export interface Quarto {
  id: string;
  nome: string;
  /** Número máximo de hóspedes da suíte (usado na barra de reserva). */
  capacidade: number;
  pessoas: string;
  preco: number;
  camas: string;
  idealPara: string;
  texto: string;
  foto: Foto;
}

export interface Arredor {
  lugar: string;
  /** Tempo em minutos (desenha a barra proporcional na seção Localização). */
  minutos: number;
  tipo: "a-pe" | "carro";
  /** Texto mostrado no lugar do tempo (ex.: "400 m" para a praia). */
  rotulo?: string;
}

export interface Foto {
  /** Caminho em /public, ex.: "/fotos/hero.jpg". Vazio mostra o placeholder. */
  src?: string;
  alt: string;
  placeholder: string;
}

export interface FotoGaleria extends Foto {
  legenda: string;
  /** Largura do card na galeria horizontal, em px (o celular limita a 82vw). */
  largura: number;
}

export interface Contato {
  telefone: string;
  email: string;
  endereco: [string, string];
  checkIn: string;
  checkOut: string;
  instagram: string;
  instagramUsuario: string;
  mapa: string;
}
