import fs from "fs";
const content = `---
title: "Como funciona o gasto energético diário total (TDEE/GET)"
description: "Entenda os componentes do gasto calórico diário: TMB, efeito térmico dos alimentos, atividade física (exercício + NEAT). Base da Calculadora de Calorias."
pubDate: "2024-03-01"
author: "Equipe FitTools"
coverImage: "/images/tdee-energy-expenditure.jpg"
coverCaption: "Gasto Energético Total: a soma de tudo que seu corpo gasta em 24 horas"
ogImage: "/social/og-tdee.svg"
tags: ["gasto energético", "TDEE", "GET", "metabolismo", "calorias", "NEAT"]
relatedTools: ["calorie-calculator"]
references:
  - "Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247."
  - "Levine JA. Non-exercise activity thermogenesis (NEAT). Best Pract Res Clin Endocrinol Metab. 2002;16(4):679-702."
  - "Westerterp KR. Physical activity and physical activity induced energy expenditure in humans: measurement, determinants, and effects. Front Physiol. 2013;4:90."
  - "Hall KD, et al. Energy balance and its components: implications for body weight regulation. Am J Clin Nutr. 2012;95(4):989-994."
---

O **Gasto Energético Total Diário (TDEE / GET — Gasto Energético Total)** é a quantidade total de calorias que seu corpo gasta em 24 horas. Entender seus componentes é essencial para ajustar a alimentação ao seu objetivo.

## A equação do balanço energético

> **Peso estável = Calorias ingeridas = Gasto Energético Total (GET/TDEE)**

| Objetivo | Ajuste calórico |
|----------|-----------------|
| **Manutenção** | Ingerir ≈ GET |
| **Perda de peso** | Ingerir < GET (déficit 10–25%) |
| **Ganho de massa** | Ingerir > GET (superávit 5–15%) |

## Os 4 componentes do GET

\`\`\`
GET = TMB + ETA + AFE + NEAT
\`\`\`

| Componente | Sigla | % do GET | Descrição |
|------------|-------|----------|-----------|
| **Taxa Metabólica Basal** | TMB / BMR | **60–75%** | Funções vitais em repouso (coração, cérebro, fígado, rins, síntese proteica) |
| **Efeito Térmico dos Alimentos** | ETA / TEF | **~10%** | Energia para digerir, absorver, metabolizar nutrientes |
| **Atividade Física de Exercício** | AFE / EAT | **0–15%** | Treino intencional: musculação, corrida, natação, etc. |
| **Termogênese de Atividade Não-Exercício** | NEAT | **15–30%** | Tudo o mais: andar, gesticular, postura, trabalho, lazer ativo |

> **NEAT é o componente MAIS VARIÁVEL** — pode variar **>2.000 kcal/dia** entre pessoas de mesmo tamanho (Levine, 2002).

## Detalhando cada componente

### 1. TMB (Taxa Metabólica Basal) — ~60-75%
- Calculada por equações (Mifflin-St Jeor, Harris-Benedict) ou medida por calorimetria
- **Principal determinante**: massa magra (músculo + órgãos)
- Órgãos "caros": cérebro (20% TMB), fígado (20%), coração (10%), rins (10%), músculo esquelético (20–25% em repouso)

### 2. ETA (Efeito Térmico dos Alimentos) — ~10%
| Macronutriente | % das calorias gastas na digestão |
|----------------|-----------------------------------|
| **Proteína** | **20–30%** (mais caro metabolicamente) |
| Carboidrato | 5–10% |
| Gordura | 0–3% |
| Álcool | 10–15% |

> **Proteína "emagrece" duplamente**: maior saciedade + maior ETA + preserva massa magra no déficit.

### 3. AFE (Atividade Física de Exercício) — 0–15%
| Atividade (1h, 70kg) | Gasto aproximado (kcal) |
|----------------------|------------------------|
| Musculação moderada | 250–350 |
| Musculação intensa | 350–500 |
| Corrida 8km/h | 550–650 |
| Corrida 12km/h | 800–950 |
| Natação moderada | 450–550 |
| Ciclismo moderado | 400–500 |
| HIIT | 400–600 |

**Variabilidade**: intensidade, duração, eficiência mecânica, massa corporal.

### 4. NEAT — 15–30% (O "segredo" do metabolismo)
| Atividade NEAT | Gasto extra vs sentado (kcal/h) |
|----------------|--------------------------------|
| Em pé parado | +20–30 |
| Andar devagar (casa/escritório) | +100–150 |
| Andar rápido (comutar) | +200–300 |
| Trabalho manual leve | +150–250 |
| Trabalho manual pesado | +400–600 |
| Gesticular/fidgeting | +50–150 |

**Exemplo real**: Dois homens 80kg, 1,80m, mesmo treino 4x/semana
- **Escritório sedentário**: NEAT ~400 kcal/dia → GET ~2.400 kcal
- **Entregador a pé**: NEAT ~1.200 kcal/dia → GET ~3.200 kcal
- **Diferença: 800 kcal/dia = 5.600 kcal/semana ≈ 0,7kg gordura/semana**

## Fatores de Atividade (multiplicadores sobre TMB)

| Nível | Descrição | Fator (× TMB) | Perfil típico |
|-------|-----------|---------------|---------------|
| **Sedentário** | Pouco/não exercício, trabalho escritório | **1,2** | NEAT baixo, AFE = 0 |
| **Levemente ativo** | Exercício leve 1–3x/sem | **1,375** | Caminhada, yoga, trabalho leve |
| **Moderadamente ativo** | Exercício moderado 3–5x/sem | **1,55** | Musculação 3–4x, corrida 2–3x |
| **Muito ativo** | Exercício intenso 6–7x/sem | **1,725** | Atleta amador, treino 2x/dia |
| **Extremamente ativo** | Treino muito intenso 2x/dia + trabalho físico | **1,9** | Atleta de elite, trabalho braçal + treino |

> **Atenção**: Muitos **superestimam** seu nível. "Treino 4x/semana mas passo o dia sentado" → **Levemente ativo (1,375)**, não Moderado.

## Exemplo completo de cálculo

**Homem, 30 anos, 80kg, 180cm, treino musculação 4x/sem, trabalho escritório**

\`\`\`
1. TMB (Mifflin) = (10×80) + (6,25×180) – (5×30) + 5 = 1.780 kcal

2. Nível real: "Levemente ativo" (treina 4x mas NEAT baixo)
   Fator = 1,375

3. GET = 1.780 × 1,375 = **2.448 kcal/dia**

4. Objetivos:
   - Manutenção: ~2.450 kcal
   - Cutting (–20%): ~1.960 kcal
   - Bulking (+10%): ~2.690 kcal
\`\`\`

## Adaptação Metabólica (o "metabolismo lento")

Após **perda de peso prolongada**, o GET real cai **mais que o previsto**:
- Menor massa corporal → menor TMB (esperado)
- **MAIS**: eficiência metabólica ↑, NEAT ↓ (inconsciente), hormônios (leptina ↓, grelina ↑, T3 ↓)
- **Magnitude**: –10 a –15% abaixo do previsto pelas equações

> **Solução**: "Diet breaks" (2 semanas em manutenção a cada 8–12 semanas), manter NEAT alto (passos/dia), treino de força para preservar massa magra.

## Ferramenta prática

Nossa **[Calculadora de Calorias](/ferramentas/calculadora-calorias/)** calcula:
1. TMB (Mifflin-St Jeor)
2. GET baseado no seu nível de atividade **realista**
3. Metas para manutenção, perda (–10/–20%) e ganho (+10/+15%)
4. Explicação de cada componente

---

*GET é estimativa. Ajuste baseado em resultado real (peso semanal, medidas, performance). Para prescrição individualizada, consulte nutricionista.*`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\content\\\\blog\\\\como-funciona-gasto-energetico-diario.md", content, "utf8");
console.log("Done");
