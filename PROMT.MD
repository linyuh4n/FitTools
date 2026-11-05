# FITTOOLS — Especificação Técnica e Instruções de Desenvolvimento

## 1. PAPEL E RESPONSABILIDADES

Atue como um engenheiro de software sênior, arquiteto de soluções, especialista em desenvolvimento frontend, SEO técnico, UX/UI e performance web.

Sua responsabilidade é projetar e implementar o FitTools, uma plataforma de ferramentas gratuitas relacionadas a fitness, nutrição, treinamento e bem-estar.

Não quero apenas uma demonstração visual ou um protótipo estático. Quero uma aplicação funcional, organizada, testável, acessível, responsiva, otimizada para mecanismos de busca e preparada para publicação em produção.

Você tem autonomia para tomar decisões técnicas, desde que respeite os requisitos deste documento.

IMPORTANTE:
- Antes de implementar, inspecione o repositório e identifique se já existe algum projeto.
- Não sobrescreva arquivos existentes sem entender sua finalidade.
- Trabalhe diretamente no projeto e crie os arquivos necessários.
- Não entregue apenas instruções ou exemplos: implemente efetivamente.
- Não deixe funcionalidades principais como TODO ou pseudocódigo.
- Execute os testes e o build antes de considerar a entrega concluída.
- Se encontrar uma limitação, explique e implemente a melhor alternativa possível.

---

# 2. VISÃO DO PRODUTO

Nome: FitTools

Idioma principal: Português brasileiro (pt-BR).

Mercado inicial: Brasil.

Objetivo: criar uma plataforma gratuita de ferramentas fitness que atraia visitantes organicamente por meio do Google, Instagram e YouTube.

Modelo de negócio:
1. Atrair visitantes por SEO.
2. Oferecer ferramentas gratuitas e úteis.
3. Construir autoridade com conteúdo original.
4. Monetizar futuramente por meio de Google AdSense e programas de afiliados.
5. Desenvolver gradualmente novas ferramentas.

Meta financeira inicial: gerar R$ 30 mensais de receita orgânica.

Não trate essa meta como faturamento garantido. O produto deve ser desenvolvido para construir tráfego e audiência de maneira sustentável.

## Público-alvo

- Pessoas que praticam musculação.
- Praticantes de atividades físicas.
- Pessoas interessadas em alimentação saudável.
- Vegetarianos e pessoas que buscam fontes alternativas de proteína.
- Pessoas que desejam acompanhar sua evolução física.
- Iniciantes que precisam de ferramentas simples e gratuitas.

## Proposta de valor

"Ferramentas gratuitas para calcular, entender e melhorar sua rotina fitness."

Princípios:
- Gratuito.
- Simples de utilizar.
- Sem cadastro obrigatório.
- Mobile-first.
- Resultados rápidos.
- Conteúdo baseado em fontes confiáveis.
- Transparência sobre fórmulas e limitações.
- Privacidade dos dados dos visitantes.

---

# 3. STACK TECNOLÓGICA

Utilize preferencialmente:

- Astro na versão estável compatível com as dependências do projeto.
- TypeScript em modo strict.
- HTML semântico.
- CSS moderno.
- JavaScript para interações.
- Astro Components para composição das páginas.
- Vitest para testes unitários.
- Playwright para testes end-to-end, se viável.
- ESLint e Prettier, se compatíveis com a configuração escolhida.
- Git e GitHub para versionamento.
- Cloudflare Pages para hospedagem.

Não utilizar React inicialmente.

Não utilizar backend, API REST ou banco de dados no MVP.

As ferramentas devem realizar seus cálculos no próprio navegador.

Evite dependências desnecessárias.

Utilize versões estáveis e compatíveis das bibliotecas. Não invente versões de pacotes.

---

# 4. ARQUITETURA E ESTRUTURA DO PROJETO

Organize o projeto para permitir crescimento sem complexidade prematura.

Estrutura desejada:

fittools/
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── images/
│   └── social/
│
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CalculatorCard.astro
│   │   ├── ResultCard.astro
│   │   ├── Breadcrumbs.astro
│   │   ├── Disclaimer.astro
│   │   ├── RelatedTools.astro
│   │   ├── ArticleCard.astro
│   │   └── AdPlaceholder.astro
│   │
│   ├── layouts/
│   │   ├── MainLayout.astro
│   │   └── ArticleLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── sobre.astro
│   │   ├── contato.astro
│   │   ├── privacidade.astro
│   │   ├── termos.astro
│   │   │
│   │   ├── ferramentas/
│   │   │   ├── index.astro
│   │   │   ├── calculadora-proteina.astro
│   │   │   ├── calculadora-imc.astro
│   │   │   └── calculadora-calorias.astro
│   │   │
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   ├── content/
│   │   └── blog/
│   │
│   ├── scripts/
│   │   ├── protein-calculator.ts
│   │   ├── bmi-calculator.ts
│   │   └── calorie-calculator.ts
│   │
│   ├── data/
│   │   ├── tools.ts
│   │   ├── foods.ts
│   │   └── navigation.ts
│   │
│   ├── lib/
│   │   ├── calculations/
│   │   ├── validation/
│   │   ├── seo/
│   │   └── formatting/
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── components.css
│   │   └── calculators.css
│   │
│   └── types/
│       └── index.ts
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── README.md
└── .gitignore

Ajuste a estrutura quando houver justificativa técnica, sem adicionar camadas desnecessárias.

Utilize Astro Content Collections para os artigos, quando apropriado e compatível com a versão instalada.

Centralize funções matemáticas em módulos independentes, sem misturar lógica de cálculo com componentes de interface.

---

# 5. IDENTIDADE VISUAL E UX/UI

Crie uma identidade visual profissional, moderna, minimalista e relacionada a fitness e saúde.

## Paleta

- Verde principal: #16A36A
- Verde escuro: #087A4B
- Verde claro: #E8F7EF
- Fundo: #FFFFFF
- Fundo secundário: #F7FAF8
- Texto principal: #17211B
- Texto secundário: #647067
- Bordas: #E5EBE7

Utilize as cores de maneira consistente e mantenha contraste adequado.

## Tipografia

Utilize uma fonte moderna e legível.

Priorize fontes com carregamento otimizado e fallback local.

## Estilo

- Layout clean.
- Cards com bordas discretas.
- Cantos levemente arredondados.
- Sombras sutis.
- Ícones consistentes.
- Espaçamento generoso.
- Animações discretas.
- Microinterações nos botões.
- Excelente experiência em dispositivos móveis.

Evite:
- Visual genérico de template.
- Excesso de gradientes.
- Excesso de animações.
- Elementos decorativos desnecessários.
- Pop-ups invasivos.
- Componentes que dificultem a leitura.

## Responsividade

Desenvolva primeiro para dispositivos móveis.

Garanta boa experiência em:
- Smartphones a partir de 320px.
- Tablets.
- Notebooks.
- Monitores desktop.

Não permita rolagem horizontal indevida.

## Navegação

Menu principal:

- Início
- Ferramentas
- Nutrição
- Treinamento
- Blog
- Sobre

No mobile, utilize menu acessível e funcional.

---

# 6. PÁGINA INICIAL

A homepage deve apresentar o produto de maneira clara e conduzir os visitantes às ferramentas.

Estrutura:

## Hero

Título:
"Cuide da sua evolução com inteligência."

Subtítulo:
"Calculadoras e ferramentas gratuitas para ajudar você a entender sua alimentação, treinamento e evolução física."

CTA principal:
"Explorar ferramentas"

CTA secundário:
"Calcular minha proteína"

## Ferramentas populares

Exibir cards para:

1. Calculadora de proteínas.
2. Calculadora de IMC.
3. Calculadora de calorias.

Cada card deve possuir:
- Ícone.
- Nome.
- Descrição curta.
- Link funcional.
- Indicação de que é gratuito.

## Seção de benefícios

Apresentar:
- Ferramentas gratuitas.
- Resultados rápidos.
- Sem cadastro.
- Privacidade.
- Informações transparentes.

## Conteúdo educativo

Exibir artigos recentes do blog.

## Fontes de proteína

Criar uma seção com alimentos ricos em proteína, especialmente opções vegetarianas:

- Lentilha.
- Grão-de-bico.
- Feijão.
- Tofu.
- Ovos.
- Leite.
- Iogurte.
- Queijos.

As informações nutricionais devem ser fundamentadas em fontes confiáveis e apresentar valores por porção e/ou por 100g, especificando o estado do alimento.

## Footer

Incluir:
- Sobre.
- Contato.
- Política de privacidade.
- Termos de uso.
- Ferramentas.
- Instagram.
- YouTube.

Não invente perfis sociais ou endereços de contato. Utilize placeholders claramente identificados até que sejam fornecidos.

---

# 7. PRIMEIRA FERRAMENTA: CALCULADORA DE PROTEÍNAS

Esta é a principal funcionalidade do MVP.

Rota:
/ferramentas/calculadora-proteina/

## Objetivo

Permitir que o visitante obtenha uma estimativa de sua necessidade diária de proteína com base no peso corporal e em parâmetros apropriados.

## Entradas

1. Peso corporal em kg.
2. Objetivo:
   - Saúde geral/manutenção.
   - Manutenção com atividade física.
   - Hipertrofia.
3. Preferência alimentar:
   - Onívora.
   - Vegetariana com ovos e laticínios.
   - Vegetariana estrita.
4. Número de refeições diárias (opcional).

A preferência alimentar deve servir para personalizar os exemplos de alimentos, não para alterar arbitrariamente a necessidade proteica.

## Fórmula e metodologia

Não invente recomendações nutricionais.

Utilize referências científicas confiáveis, por exemplo:
- EFSA.
- ISSN (International Society of Sports Nutrition).
- Posicionamentos científicos revisados por pares.
- Recomendações reconhecidas para adultos saudáveis.

Apresente a faixa de ingestão em g/kg/dia de acordo com o contexto escolhido.

Como referência de implementação, considere:
- Adultos saudáveis: aproximadamente 0,8 g/kg/dia como referência mínima geral.
- Pessoas fisicamente ativas: faixas maiores podem ser apropriadas.
- Hipertrofia e treinamento resistido: a literatura frequentemente utiliza aproximadamente 1,4–2,0 g/kg/dia, dependendo do indivíduo e do contexto.

Não apresente esses números como prescrição universal.

Permita que o resultado mostre uma faixa, e não apenas um valor único.

Explique que necessidades individuais podem variar conforme idade, condições de saúde, composição corporal, intensidade do treinamento e outros fatores.

Não faça recomendações individualizadas para pessoas com doença renal ou outras condições clínicas. Oriente a avaliação profissional nesses casos.

## Resultados

Exibir:

- Peso informado.
- Faixa estimada em g/kg/dia.
- Quantidade mínima estimada em gramas por dia.
- Quantidade máxima estimada em gramas por dia.
- Média da faixa, quando fizer sentido.
- Estimativa por refeição, se o usuário informar o número de refeições.
- Exemplos de fontes alimentares compatíveis com a preferência selecionada.

## Fontes de proteína

Criar uma base local de alimentos.

Cada item deve conter:
- Nome.
- Proteína por 100g ou porção.
- Tamanho da porção.
- Estado do alimento (cru, cozido, drenado etc.).
- Categoria alimentar.
- Fonte dos dados.

Não invente dados nutricionais.

Priorize a Tabela Brasileira de Composição de Alimentos (TACO), TBCA e fontes oficiais.

## UX da calculadora

- Formulário simples.
- Validação de campos.
- Mensagens de erro claras.
- Resultados apresentados em destaque.
- Botão para recalcular.
- Botão para limpar.
- Botão para compartilhar o resultado, usando Web Share API com fallback para copiar texto.
- Funcionalidade de impressão amigável.
- Layout mobile-first.

Não exigir login.

Não armazenar informações pessoais.

Não enviar os dados informados para serviços externos.

---

# 8. SEGUNDA FERRAMENTA: CALCULADORA DE IMC

Rota:
/ferramentas/calculadora-imc/

Entradas:
- Peso em kg.
- Altura em cm.

Fórmula:
IMC = peso / (altura em metros × altura em metros).

Resultados:
- IMC calculado.
- Categoria correspondente para adultos.
- Explicação sobre o significado.
- Limitações do IMC.

IMPORTANTE:
- Não classificar crianças utilizando referências de adultos.
- Não apresentar o IMC como avaliação completa de saúde.
- Explicar que massa muscular, idade, composição corporal e outros fatores podem limitar a interpretação.
- Não fazer diagnóstico médico.

Criar testes unitários para os cálculos e limites de classificação.

---

# 9. TERCEIRA FERRAMENTA: CALCULADORA DE CALORIAS

Rota:
/ferramentas/calculadora-calorias/

Entradas:
- Sexo utilizado pela equação selecionada, com explicação sobre a finalidade do dado.
- Idade.
- Peso.
- Altura.
- Nível de atividade física.
- Objetivo opcional.

Utilizar uma equação reconhecida, como Mifflin-St Jeor, explicando sua metodologia e limitações.

Calcular:
- Taxa metabólica basal estimada.
- Gasto energético diário total estimado.
- Explicação do fator de atividade utilizado.

Não apresentar estimativas como valores exatos.

Não prescrever dietas extremas ou déficits agressivos.

Exibir aviso sobre limitações em populações para as quais a equação pode não ser adequada.

Esta ferramenta pode ser desenvolvida após a primeira entrega da calculadora de proteínas.

---

# 10. BLOG E ESTRATÉGIA DE CONTEÚDO

Criar estrutura de blog utilizando conteúdo Markdown/MDX ou Content Collections.

Rota:
/blog/

Os artigos devem ter:
- Título.
- Slug.
- Descrição.
- Data de publicação.
- Data de atualização, quando aplicável.
- Autor ou responsável editorial.
- Conteúdo.
- Referências bibliográficas.
- Links para ferramentas relacionadas.

## Primeiros artigos

1. Quanta proteína consumir por dia?
2. Proteína vegetal: quais são as melhores fontes?
3. Lentilha tem quanta proteína?
4. Grão-de-bico é uma boa fonte de proteína?
5. Proteína para hipertrofia: como calcular?
6. Como distribuir proteínas ao longo do dia?
7. O que é taxa metabólica basal?
8. Como calcular o IMC?
9. Como funciona o gasto energético diário?

Produza inicialmente apenas artigos que possam ser sustentados por fontes confiáveis.

Não gere artigos superficiais apenas para preencher o blog.

Não invente referências científicas, autores, publicações ou dados.

Cada artigo deve:
- Responder diretamente à intenção de busca.
- Apresentar informações originais e úteis.
- Utilizar linguagem acessível.
- Ter boa estrutura de títulos.
- Incluir referências.
- Conectar o leitor a ferramentas relacionadas.

---

# 11. SEO TÉCNICO

SEO deve ser tratado como requisito fundamental do projeto.

## Metadados

Implementar:
- Title exclusivo por página.
- Meta description.
- Canonical URL.
- Open Graph.
- Twitter Cards.
- Favicon.
- Sitemap XML.
- Robots.txt.
- URLs amigáveis.

## Dados estruturados

Implementar somente schemas apropriados e compatíveis com o conteúdo real:

- WebSite.
- Organization ou outra entidade editorial adequada.
- BreadcrumbList.
- Article ou BlogPosting.

Não utilizar marcação enganosa.

Não implementar FAQ rich results como promessa de ganho de visibilidade.

## Performance

Priorizar:
- HTML estático.
- JavaScript mínimo.
- Imagens WebP/AVIF.
- Lazy loading quando apropriado.
- Dimensões explícitas nas imagens.
- Fontes otimizadas.
- CSS enxuto.
- Baixo Cumulative Layout Shift.
- Baixo Interaction to Next Paint.
- Bom Largest Contentful Paint.

Metas desejadas para Core Web Vitals:
- LCP: até 2,5 segundos.
- INP: até 200 ms.
- CLS: até 0,1.

## SEO editorial

Cada ferramenta deve possuir:
- Texto introdutório original.
- Explicação da metodologia.
- Exemplos de utilização.
- Limitações.
- Perguntas frequentes relevantes.
- Links para artigos relacionados.

Não utilizar conteúdo gerado automaticamente em massa.

---

# 12. PRIVACIDADE, SEGURANÇA E CONFORMIDADE

O projeto deve considerar a LGPD.

Requisitos:
- Não solicitar dados desnecessários.
- Não coletar dados de saúde em servidores.
- Não criar cadastro de usuários.
- Não persistir peso, altura ou resultados pessoais por padrão.
- Não inserir informações pessoais nas URLs.
- Evitar cookies desnecessários.
- Implementar política de privacidade transparente.
- Implementar página de termos de uso.
- Informar como ferramentas e analytics funcionam.

Caso sejam implementados Google Analytics, AdSense ou outras tecnologias que utilizem cookies ou identificadores, implementar uma solução adequada de consentimento quando exigida.

Não ativar rastreamento não essencial antes do consentimento quando este for necessário.

Não armazenar segredos ou credenciais no repositório.

Criar .env.example apenas se houver necessidade real de variáveis de ambiente.

---

# 13. MONETIZAÇÃO FUTURA

Preparar a arquitetura para monetização sem comprometer a experiência do usuário.

## Google AdSense

Criar componente AdPlaceholder.

Ele deve:
- Reservar espaço adequado.
- Evitar mudanças bruscas no layout.
- Não exibir anúncios falsos.
- Permanecer desabilitado até a aprovação e configuração da plataforma.

Não inserir scripts de monetização antes da configuração adequada.

## Afiliados

Preparar suporte a links de afiliados.

Requisitos:
- Identificar links patrocinados.
- Utilizar rel="sponsored" quando aplicável.
- Informar claramente quando houver comissão.
- Não recomendar produtos sem relação com o conteúdo.

## Métricas

Preparar integração opcional com:
- Google Analytics 4.
- Google Search Console.
- Google AdSense.

Essas integrações devem ser configuráveis sem alterar os componentes principais.

---

# 14. INSTAGRAM E YOUTUBE

O site será a plataforma central.

Instagram e YouTube funcionarão como canais de distribuição.

Criar uma página ou seção com links sociais configuráveis.

Preparar conteúdo para reutilização em:
- Instagram Reels.
- YouTube Shorts.

Temas iniciais:
1. Quanta proteína tem na lentilha?
2. Ovos versus tofu: comparação proteica.
3. Como calcular a proteína diária?
4. Três fontes de proteína vegetal.
5. O que é taxa metabólica basal?
6. IMC: o que ele realmente mede?

Criar um pequeno documento em README ou docs/content-strategy.md explicando como reaproveitar um artigo do blog como vídeo curto.

Não inventar contas ou links sociais.

---

# 15. TESTES E QUALIDADE

Utilizar Vitest para testar as funções matemáticas.

Cobrir:
- Valores normais.
- Valores mínimos.
- Valores máximos.
- Campos inválidos.
- Valores ausentes.
- Casas decimais.
- Limites de classificação.
- Arredondamento.
- Resultados esperados.

Separar as funções matemáticas da camada visual.

Criar testes para:
- Calculadora de proteínas.
- Calculadora de IMC.
- Calculadora de calorias, quando implementada.

Testar também:
- Navegação.
- Links internos.
- Formulários.
- Layout mobile.
- Acessibilidade básica.

Não considerar testes que apenas verificam se uma função existe como cobertura suficiente.

---

# 16. ACESSIBILIDADE

Seguir boas práticas WCAG 2.2 AA quando aplicável.

Implementar:
- HTML semântico.
- Labels associados aos inputs.
- Navegação por teclado.
- Focus states visíveis.
- Contraste adequado.
- Textos alternativos nas imagens.
- Mensagens de erro acessíveis.
- Botões com nomes claros.
- Respeito a prefers-reduced-motion.

Não depender exclusivamente de cores para transmitir informações.

---

# 17. HOSPEDAGEM E DEPLOY

Preparar o projeto para publicação no Cloudflare Pages.

Preferir geração estática.

Configurar:
- Build command.
- Diretório de saída.
- Sitemap.
- Variáveis necessárias, se existirem.
- Configurações de domínio.

Documentar como:
1. Criar o repositório no GitHub.
2. Publicar o código.
3. Conectar ao Cloudflare Pages.
4. Executar o primeiro deploy.
5. Configurar domínio próprio.
6. Cadastrar o domínio no Google Search Console.

Não assumir que o deploy foi realizado se você não tiver acesso à plataforma.

---

# 18. DOCUMENTAÇÃO

Criar README.md em português contendo:

- Visão geral.
- Tecnologias.
- Requisitos.
- Como instalar dependências.
- Como executar localmente.
- Como executar testes.
- Como gerar build.
- Como adicionar uma nova calculadora.
- Como adicionar um artigo.
- Como configurar SEO.
- Como publicar no Cloudflare Pages.

Adicionar também documentação da metodologia matemática das calculadoras.

---

# 19. ETAPAS DE EXECUÇÃO

Trabalhe em etapas.

## FASE 1 — Fundação

- Inspecionar ambiente.
- Inicializar Astro.
- Configurar TypeScript.
- Configurar estrutura de diretórios.
- Implementar identidade visual.
- Implementar layout global.
- Implementar header e footer.
- Criar homepage.
- Configurar navegação.
- Criar páginas institucionais básicas.

## FASE 2 — Primeira ferramenta

- Implementar calculadora de proteínas.
- Criar validações.
- Criar lógica matemática independente.
- Criar base de alimentos.
- Implementar apresentação dos resultados.
- Implementar compartilhamento.
- Implementar impressão.
- Criar conteúdo educativo.
- Criar testes unitários.

## FASE 3 — SEO e conteúdo

- Configurar metadados.
- Configurar canonical.
- Implementar sitemap.
- Implementar robots.txt.
- Implementar dados estruturados apropriados.
- Criar blog.
- Criar artigos iniciais com fontes verificáveis.

## FASE 4 — Qualidade e publicação

- Executar testes.
- Executar lint.
- Executar build.
- Corrigir problemas.
- Verificar responsividade.
- Verificar acessibilidade.
- Documentar deploy.

## FASE 5 — Expansão

Após o MVP estar funcionando:
- Calculadora de IMC.
- Calculadora de calorias.
- Calculadora de macronutrientes.
- Calculadora de volume de treino.
- Mais artigos.
- Integrações de analytics.
- Monetização.

---

# 20. CRITÉRIOS DE ACEITAÇÃO

A primeira entrega será considerada concluída somente quando:

1. O projeto executar localmente.
2. A homepage estiver funcional.
3. A navegação estiver funcionando.
4. O layout estiver responsivo.
5. A calculadora de proteínas estiver funcional.
6. Os cálculos estiverem separados dos componentes.
7. As entradas estiverem validadas.
8. Os resultados forem apresentados corretamente.
9. A preferência alimentar alterar os exemplos de alimentos.
10. Não houver envio de dados corporais para serviços externos.
11. Houver testes unitários das regras matemáticas.
12. O build de produção for concluído.
13. As páginas possuírem metadados básicos de SEO.
14. O README explicar como executar e publicar.
15. Não existirem links quebrados ou botões sem funcionalidade.

Não implemente funcionalidades futuras parcialmente apenas para aparentar que estão prontas.

---

# 21. INSTRUÇÃO FINAL AO CODEX

Comece inspecionando o repositório atual.

Em seguida:

1. Apresente brevemente o diagnóstico do ambiente.
2. Informe as decisões técnicas que pretende adotar.
3. Implemente a FASE 1 e a FASE 2.
4. Execute os testes.
5. Execute o build de produção.
6. Corrija os problemas encontrados.
7. Apresente um resumo dos arquivos criados e modificados.
8. Informe os comandos exatos para executar localmente.
9. Liste o que está pronto e o que ainda depende de configuração externa.

Priorize código limpo, simples, tipado, testável e fácil de manter.

Não transforme o projeto em uma arquitetura complexa sem necessidade.

Não sacrifique qualidade técnica por velocidade.

O resultado deve ser um MVP real, utilizável e preparado para evoluir para uma plataforma de ferramentas fitness com aquisição orgânica de visitantes.