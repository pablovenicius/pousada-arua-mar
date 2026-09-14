# Pousada Aruamar — landing page (Next.js + TypeScript)

Copie a pasta `src/` para dentro do seu projeto `pousada-arua-mar` (App Router, `src/app`).

Estrutura entregue:

```
src/
  app/
    layout.tsx        # fontes (Cormorant Garamond + Karla) e metadata
    page.tsx          # composição da landing
    globals.css       # reset + estados :hover
  components/
    Header.tsx
    Hero.tsx
    Selos.tsx
    APousada.tsx
    Acomodacoes.tsx
    Localizacao.tsx
    Reserva.tsx
    Footer.tsx
    ImageSlot.tsx     # placeholder de imagem tipado
  data/
    pousada.ts        # todo o conteúdo/preços em um só lugar
  types/
    pousada.ts        # interfaces
```

## Imagens
Coloque os arquivos em `public/fotos/` e preencha os campos `src` em `src/data/pousada.ts`
(ex.: `src: "/fotos/hero.jpg"`). Enquanto o `src` estiver vazio aparece o placeholder.

## Contato
Telefone/WhatsApp e e-mail ficam em `CONTATO` dentro de `src/data/pousada.ts`.
O link do WhatsApp é gerado automaticamente a partir do telefone.
