# FitTools

Plataforma de ferramentas gratuitas para fitness, nutrição, treinamento e bem-estar.

## Visão Geral

O FitTools é uma aplicação web estática construída com Astro que oferece calculadoras e ferramentas gratuitas para ajudar pessoas a entender sua alimentação, treinamento e evolução física. O projeto foca em SEO, performance, acessibilidade e experiência do usuário.

## Tecnologias

- **Astro 7.x** - Framework para sites estáticos rápidos
- **TypeScript** - Tipagem estática em modo strict
- **Vitest** - Testes unitários
- **ESLint + Prettier** - Qualidade e formatação de código
- **@astrojs/image** - Otimização de imagens (WebP/AVIF)
- **Workbox** - Service Worker para PWA/offline
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

O build será gerado na pasta `dist/` com:
- HTML estático otimizado
- Service Worker (sw.js) para PWA/offline
- Sitemap XML
- Robots.txt
- Manifest.json para PWA

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
   - Build command: \`npm run build\`
   - Build output directory: \`dist\`
   - Node version: 18 (ou superior)
5. Clique em "Save and Deploy"
6. Configure domínio próprio nas configurações do projeto
7. Adicione o domínio no Google Search Console

## Variáveis de Ambiente

Copie \`.env.example\` para \`.env\` e preencha:

```bash
cp .env.example .env
```

Variáveis disponíveis:
- \`PUBLIC_SITE_URL\` - URL do site (usada para sitemap, canonical, OG)
- \`GA4_MEASUREMENT_ID\` - ID do Google Analytics 4 (ex: G-XXXXXXXXXX)
- \`ADSENSE_CLIENT_ID\` - ID do Google AdSense (ex: ca-pub-XXXXXXXXXXXXXXXX)
- \`ADSENSE_SLOT_*\` - Slots de anúncios (opcional)
- \`GOOGLE_SITE_VERIFICATION\` - Verificação do Google Search Console
- \`FORMSPREE_ENDPOINT\` - Endpoint do Formspree para formulário de contato
- \`INSTAGRAM_URL\` - URL do Instagram
- \`YOUTUBE_URL\` - URL do YouTube

## LGPD / Consentimento de Cookies

O projeto inclui um banner de consentimento LGPD (\`ConsentBanner.astro\`) que:
- Solicita consentimento para Analytics (GA4) e Anúncios (AdSense)
- Respeita preferências do usuário (localStorage)
- Integra com Google Consent Mode v2
- Não carrega scripts de terceiros sem consentimento

Para ativar, configure \`GA4_MEASUREMENT_ID\` e/ou \`ADSENSE_CLIENT_ID\` no \`.env\`.

## PWA / Service Worker

O build gera automaticamente um Service Worker via Workbox que:
- Faz precache de todos os assets estáticos (HTML, CSS, JS, imagens, fontes)
- Cacheia fontes do Google Fonts (CacheFirst)
- Cacheia scripts do GA4 e AdSense (StaleWhileRevalidate)
- Suporte a offline-first para navegação

Para testar offline, abra o DevTools > Application > Service Workers e marque "Offline".

## Estrutura do Projeto

\`\`\`
fittools/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── manifest.json
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
├── workbox-config.cjs
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
\`\`\`

## Ferramentas Implementadas

1. **Calculadora de Proteínas** (\`/ferramentas/calculadora-proteina/\`)
   - Faixa de proteína baseada em peso, objetivo e preferência alimentar
   - Exemplos de fontes de proteína personalizados por dieta

2. **Calculadora de IMC** (\`/ferramentas/calculadora-imc/\`)
   - Cálculo de IMC com classificação OMS
   - Explicação de limitações

3. **Calculadora de Calorias** (\`/ferramentas/calculadora-calorias/\`)
   - TMB via Mifflin-St Jeor
   - GET com fator de atividade
   - Meta calórica opcional

4. **Calculadora de Macronutrientes** (\`/ferramentas/calculadora-macronutrientes/\`)
   - Divisão de macro baseada em objetivo
   - Proteína, gordura, carboidratos em g e %

5. **Calculadora de Volume de Treino** (\`/ferramentas/calculadora-volume-treino/\`)
   - Tonelagem, 1RM (Epley + RPE)
   - Trabalho mecânico, duração estimada
   - Suporte a multi-exercício via JSON

6. **Calculadora de % Gordura Corporal** (\`/ferramentas/calculadora-gordura-corporal/\`)
   - Método Navy (circunferências)
   - Jackson-Pollock 3 e 7 dobras
   - Estimativa baseada em IMC (fallback)
   - LMI (Lean Mass Index) e peso ideal

## Metodologia das Calculadoras

### Calculadora de Proteínas

Baseada em referências científicas:
- **EFSA** (European Food Safety Authority) - 0,83 g/kg/dia para adultos saudáveis
- **ISSN** (International Society of Sports Nutrition) - 1,4–2,0 g/kg/dia para hipertrofia
- **ACSM** (American College of Sports Medicine) - 1,2–2,0 g/kg/dia para atletas

A calculadora apresenta uma **faixa** baseada no objetivo selecionado, não um valor único.

### Calculadora de IMC

Fórmula: \`IMC = peso / (altura em metros)²\`

Classificação para adultos (OMS):
- < 18,5: Baixo peso
- 18,5–24,9: Peso normal
- 25,0–29,9: Sobrepeso
- ≥ 30,0: Obesidade

### Calculadora de Calorias

Equação **Mifflin-St Jeor** (mais precisa que Harris-Benedict):
- Homens: \`10 × peso + 6,25 × altura - 5 × idade + 5\`
- Mulheres: \`10 × peso + 6,25 × altura - 5 × idade - 161\`

Multiplicada pelo fator de atividade física (NAF/FAF).

## Testes

- **132 testes unitários** passando (Vitest)
- Cobertura: calculadoras de proteína, IMC, calorias, macronutrientes, volume, gordura corporal
- Testes incluem: valores normais, limites, validação, arredondamento, edge cases

## Licença

MIT
