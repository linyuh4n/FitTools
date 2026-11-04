import fs from "fs";
const content = `---
title: "Grão-de-bico é uma boa fonte de proteína? Análise completa"
description: "Valor proteico do grão-de-bico (cozido, cru, farinha, pasta), comparação com outras leguminosas e dicas de uso na dieta para hipertrofia e saúde."
pubDate: "2024-02-01"
author: "Equipe FitTools"
coverImage: "/images/grao-de-bico-protein.jpg"
coverCaption: "Grão-de-bico: versátil, nutritivo e base de pratos como homus e falafel"
ogImage: "/social/og-grao-de-bico-protein.svg"
tags: ["grão-de-bico", "proteína vegetal", "leguminosas", "nutrição"]
relatedTools: ["protein-calculator"]
references:
  - "Tabela Brasileira de Composição de Alimentos (TACO), 4ª ed. USP/NEPA. 2011."
  - "USDA FoodData Central. Chickpeas (garbanzo beans, bengal gram), mature seeds, cooked, boiled. 2019."
  - "Jukanti AK, et al. Nutritional quality and health benefits of chickpea. Br J Nutr. 2012."
---

Sim, o **grão-de-bico é uma excelente fonte de proteína vegetal** — a segunda leguminosa mais consumida no mundo depois da soja, e com boa digestibilidade (PDCAAS ~0,78).

## Valor proteico do grão-de-bico

| Forma | Proteína (g/100g) | Calorias (kcal) | Observação |
|-------|-------------------|-----------------|------------|
| **Cru** | 20,5 | 364 | Valor de referência (seco) |
| **Cozido (sem sal)** | 8,9 | 164 | **Valor prático para refeições** |
| **Farinha (besan)** | 22,4 | 387 | Para pães, bolos, empanados |
| **Homus (pasta)** | 4,9 | 166 | Varia pela receita (tahine, azeite) |
| **Falafel (frito)** | 8,2 | 333 | Alto teor de gordura por fritura |
| **Grão-de-bico tostado** | 19,0 | 450 | Snack, perde água |

> **Cozido vs cru:** 100g cru ≈ 250g cozido (absorve 2,5x seu peso em água).

## Comparação: grão-de-bico vs outras leguminosas (cozidas, 100g)

| Leguminosa | Proteína (g) | Calorias | Proteína/100kcal | PDCAAS |
|------------|--------------|----------|------------------|--------|
| **Soja** | 12,4 | 173 | 7,2g | 0,91 |
| **Lentilha** | 9,0 | 116 | **7,8g** | 0,52 |
| **Grão-de-bico** | 8,9 | 164 | 5,4g | **0,78** |
| Feijão preto | 8,7 | 132 | 6,6g | 0,68 |
| Feijão carioca | 8,4 | 130 | 6,5g | 0,68 |
| Ervilha | 5,4 | 84 | 6,4g | 0,65 |

O grão-de-bico tem **a melhor digestibilidade (PDCAAS)** entre as leguminosas comuns (exceto soja), compensando a densidade proteica levemente menor que a lentilha.

## Perfil nutricional adicional (100g cozido)

| Nutriente | Quantidade | %VD* |
|-----------|------------|------|
| Fibras | 7,6g | 30% |
| Folato (B9) | 172µg | 43% |
| Ferro | 2,9mg | 16% |
| Fósforo | 168mg | 14% |
| Cobre | 0,35mg | 39% |
| Manganês | 1,0mg | 43% |
| Zinco | 1,5mg | 14% |

*%VD = Percentual de Valores Diários baseados em dieta de 2000 kcal.

## Como usar na prática

### Para hipertrofia (meta proteica alta)
- **Pasta de grão-de-bico caseira** (homus sem excesso de tahine): ~8g proteína/100g
- **Farinha de grão-de-bico** em panquecas/ovos veganos: 22g/100g farinha
- **Grão-de-bico tostado** como snack: 19g/100g (atenção: calórico)
- **Combinado com arroz/quinoa**: proteína completa

### Receita: Panqueca de grão-de-bico (1 porção, ~25g proteína)

\`\`\`
Ingredientes:
- 60g farinha de grão-de-bico (besan)
- 100ml água
- 1 ovo (opcional, +6g proteína)
- 1 colher (chá) fermento
- Temperos: cúrcuma, cominho, sal, pimenta
- Recheio: tofu mexido, espinafre, cogumelos

Modo:
1. Misture farinha, água, ovo, fermento, temperos → massa lisa
2. Descanse 10min (hidrata a farinha)
3. Frigideira antiaderente quente, fio de azeite
4. Despeje massa, espalhe fino, doure dos dois lados
5. Recheie e dobre
\`\`\`

### Para saúde geral
- **Saladas**: grão-de-bico cozido + folhas + tomate + azeite
- **Sopas/ensopados**: substitui carne em receitas tradicionais
- **Curry (chana masala)**: prato indiano clássico, rico em especiarias anti-inflamatórias

## Dicas de preparo

1. **Demolho obrigatório**: 8–12h (reduz tempo de cozimento e antinutrientes)
2. **Cozimento**: panela pressão 20–25min / panela comum 1–1,5h
3. **Congelamento**: cozinhe em grande quantidade, congele porções (3 meses)
4. **Água do cozimento (aquafaba)**: substitui clara de ovo em receitas veganas

## Grão-de-bico vs proteína animal (por 100g cozido/preparado)

| Alimento | Proteína (g) | Calorias | Custo relativo |
|----------|--------------|----------|----------------|
| Grão-de-bico cozido | 8,9 | 164 | **Baixíssimo** |
| Ovo cozido | 12,6 | 155 | Baixo |
| Peito de frango grelhado | 31,0 | 165 | Médio |
| Carne bovina magra | 26,0 | 170 | Alto |
| Whey protein (30g) | 24,0 | 120 | Alto |

**Custo-benefício imbatível** para proteína vegetal.

---

*Valores baseados na TACO 4ª ed. e USDA. Valores podem variar por variedade e preparo.*`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\content\\\\blog\\\\grao-de-bico-boafonte-proteina.md", content, "utf8");
console.log("Done");
