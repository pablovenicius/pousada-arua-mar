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
  pessoas: string;
  preco: number;
  texto: string;
  foto: Foto;
}

export interface Arredor {
  lugar: string;
  tempo: string;
}

export interface Foto {
  /** Caminho em /public, ex.: "/fotos/hero.jpg". Vazio mostra o placeholder. */
  src?: string;
  alt: string;
  placeholder: string;
}

export interface Contato {
  telefone: string;
  email: string;
  endereco: [string, string];
  checkIn: string;
  checkOut: string;
  instagram: string;
}
