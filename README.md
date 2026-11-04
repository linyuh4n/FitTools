# FitTools

Plataforma de ferramentas gratuitas para fitness, nutrição, treinamento e bem-estar.

## Visão Geral

O FitTools é uma aplicação web estática construída com Astro que oferece calculadoras e ferramentas gratuitas para ajudar pessoas a entender sua alimentação, treinamento e evolução física. O projeto foca em SEO, performance, acessibilidade e experiência do usuário.

## Tecnologias

- **Astro 4.x** - Framework para sites estáticos rápidos
- **TypeScript** - Tipagem estática em modo strict
- **Vitest** - Testes unitários
- **ESLint + Prettier** - Qualidade e formatação de código
- **Cloudflare Pages** - Hospedagem e deploy

## Requisitos

- Node.js 18+
- npm 9+

## Como instalar dependências

```bash
npm install
```

## Como executar localmente

```bash
npm run dev
```

O servidor iniciará em `http://localhost:4321`

## Como executar testes

```bash
# Executar todos os testes uma vez
npm test

# Executar testes em modo watch
npm run test:watch
```

## Como gerar build de produção

```bash
npm run build
```

O build será gerado na pasta `dist/`

## Como adicionar uma nova calculadora

1. Crie o módulo de cálculo em `src/lib/calculations/`
2. Crie o script de interação em `src/scripts/`
3. Crie a página em `src/pages/ferramentas/`
4. Adicione a ferramenta em `src/data/tools.ts`
5. Crie testes em `tests/unit/`
6. Atualize a navegação se necessário

## Como adicionar um artigo

1. Crie um arquivo `.md` em `src/content/blog/`
2. Adicione o frontmatter obrigatório (title, description, pubDate, etc.)
3. Escreva o conteúdo em Markdown
4. O artigo aparecerá automaticamente no blog

## Como configurar SEO

1. Configure `PUBLIC_SITE_URL` no `.env`
2. Cada página define seus metadados via `getStaticPaths` e props
3. Dados estruturados são adicionados via componentes `JsonLd`
4. Sitemap e robots.txt são gerados automaticamente

## Como publicar no Cloudflare Pages

1. Crie o repositório no GitHub e faça push do código
2. Acesse [Cloudflare Pages](https://pages.cloudflare.com/)
3. Conecte o repositório GitHub
4. Configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 (ou superior)
5. Clique em "Save and Deploy"
6. Configure domínio próprio nas configurações do projeto
7. Adicione o domínio no Google Search Console

## Estrutura do Projeto

```
fittools/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── images/
│   └── social/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   ├── scripts/
│   ├── data/
│   ├── lib/
│   ├── styles/
│   └── types/
├── tests/
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Metodologia das Calculadoras

### Calculadora de Proteínas

Baseada em referências científicas:
- **EFSA** (European Food Safety Authority) - 0,83 g/kg/dia para adultos saudáveis
- **ISSN** (International Society of Sports Nutrition) - 1,4–2,0 g/kg/dia para hipertrofia
- **ACSM** (American College of Sports Medicine) - 1,2–2,0 g/kg/dia para atletas

A calculadora apresenta uma **faixa** baseada no objetivo selecionado, não um valor único.

### Calculadora de IMC

Fórmula: `IMC = peso / (altura em metros)²`

Classificação para adultos (OMS):
- < 18,5: Baixo peso
- 18,5–24,9: Peso normal
- 25,0–29,9: Sobrepeso
- ≥ 30,0: Obesidade

### Calculadora de Calorias

Equação **Mifflin-St Jeor** (mais precisa que Harris-Benedict):
- Homens: `10 × peso + 6,25 × altura - 5 × idade + 5`
- Mulheres: `10 × peso + 6,25 × altura - 5 × idade - 161`

Multiplicada pelo fator de atividade física (NAF/FAF).

## Licença

MIT
