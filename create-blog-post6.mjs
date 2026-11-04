import fs from "fs";
const content = `---
title: "O que é taxa metabólica basal (TMB)? Cálculo, fatores e mitos"
description: "Entenda o que é TMB, como calcular (Mifflin-St Jeor), fatores que influenciam e por que ela não é o seu gasto calórico total. Base para a Calculadora de Calorias."
pubDate: "2024-02-20"
author: "Equipe FitTools"
coverImage: "/images/tmb-metabolic-rate.jpg"
coverCaption: "Taxa Metabólica Basal: a energia que seu corpo gasta apenas para manter você vivo"
ogImage: "/social/og-tmb.svg"
tags: ["taxa metabólica basal", "TMB", "BMR", "metabolismo", "calorias"]
relatedTools: ["calorie-calculator"]
references:
  - "Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247."
  - "Frankenfield D, et al. Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults. J Am Diet Assoc. 2005;105(5):775-789."
  - "Compher C, et al. Best practice methods to apply to measurement of resting metabolic rate in adults: a systematic review. JPEN J Parenter Enteral Nutr. 2006;30(3):181-193."
  - "Ministério da Saúde. Guia Alimentar para a População Brasileira. 2ª ed. 2014."
---

A **Taxa Metabólica Basal (TMB)** — ou **Basal Metabolic Rate (BMR)** em inglês — é a quantidade mínima de energia (calorias) que seu corpo precisa para manter as funções vitais em **repouso absoluto**: respiração, batimentos cardíacos, regulação de temperatura, função cerebral, síntese proteica, etc.

## TMB ≠ Gasto Calórico Total

| Conceito | O que inclui | % do Gasto Total |
|----------|--------------|------------------|
| **TMB (BMR)** | Funções vitais em repouso total (jejum 12h, acordado, neutro térmico) | **60–75%** |
| **GET (Efeito Térmico dos Alimentos)** | Digestão, absorção, armazenamento | ~10% |
| **AF (Atividade Física)** | Exercício + NEAT (atividades não-exercício) | 15–30% |
| **GET (Gasto Energético Total - TDEE)** | TMB + GET + AF | **100%** |

> **Erro comum**: usar TMB como "quantas calorias posso comer". **TMB é o piso, não o teto.** Comer abaixo da TMB consistentemente desacelera metabolismo e prejudica saúde.

## Equação de Mifflin-St Jeor (1990) — Padrão ouro atual

### Homens
> **TMB = (10 × peso kg) + (6,25 × altura cm) – (5 × idade anos) + 5**

### Mulheres
> **TMB = (10 × peso kg) + (6,25 × altura cm) – (5 × idade anos) – 161**

> **Por que sexos diferentes?** A equação foi derivada de dados reais — homens têm, em média, mais massa magra por kg de peso corporal. A equação **não** assume identidade de gênero; use o sexo biológico que melhor representa sua composição corporal para o cálculo.

## Exemplo prático

**Mulher, 30 anos, 65kg, 165cm:**
\`\`\`
TMB = (10 × 65) + (6,25 × 165) – (5 × 30) – 161
TMB = 650 + 1031,25 – 150 – 161
TMB = **1.370 kcal/dia**
\`\`\`

**Homem, 30 anos, 80kg, 180cm:**
\`\`\`
TMB = (10 × 80) + (6,25 × 180) – (5 × 30) + 5
TMB = 800 + 1125 – 150 + 5
TMB = **1.780 kcal/dia**
\`\`\`

## Fatores que influenciam a TMB (além dos da equação)

| Fator | Efeito na TMB | Magnitude |
|-------|---------------|-----------|
| **Massa magra (músculo)** | Aumenta | Principal determinante (~22 kcal/kg músculo) |
| **Gordura corporal** | Diminui (por kg peso total) | Tecido metabolicamente menos ativo (~4,5 kcal/kg) |
| **Idade** | Diminui | ~1–2% por década após 20 anos |
| **Tireoide** | Hiper: aumenta | Hipotireoidismo não tratado: -15–30% |
| **Genética** | Variação individual | ±5–10% entre pessoas similares |
| **Temperatura ambiente** | Frio: aumenta | Termogênese sem tremor |
| **Ciclo menstrual** | Fase lútea: +5–10% | Picos de progesterona |
| **Gestação** | Aumenta progressivamente | +300–500 kcal no 3º trimestre |
| **Amamentação** | Aumenta | +500 kcal/dia |

## Limitações das equações preditivas

| Limitação | Impacto |
|-----------|---------|
| **Não mede massa magra diretamente** | Pessoas muito musculosas: subestima. Obesas: superestima (tecido adiposo conta como peso mas gasta pouco). |
| **Baseada em populações específicas** | Original: adultos saudáveis, BMI 19–30. Fora disso, erro aumenta. |
| **Erro típico** | ±10–15% (≈150–300 kcal) para indivíduo único. |
| **Não captura adaptação metabólica** | Após emagrecimento prolongado, TMB real pode ser 10–15% menor que predito. |

> **Alternativa mais precisa**: Calorimetria indireta (mede O₂/CO₂). Disponível em alguns laboratórios/clínicas. Custo-benefício só para casos específicos.

## TMB x RMR (Repouso vs Basal)

| Termo | Condição | Diferença |
|-------|----------|-----------|
| **BMR (TMB)** | Jejum 12h, acordado, deitado, neutro térmico, 8h sono | Padrão ouro científico |
| **RMR (Taxa Metabólica de Repouso)** | Jejum 3–4h, acordado, sentado, condições normais | ~5–10% maior que BMR (mais prático) |

A maioria das equações (incluindo Mifflin) prediz **RMR**, mas o termo "TMB/BMR" ficou consagrado.

## Ferramenta prática

Nossa **[Calculadora de Calorias](/ferramentas/calculadora-calorias/)** usa Mifflin-St Jeor, aplica fatores de atividade e ajusta para seu objetivo (manutenção, perda, ganho).

---

*Este artigo tem fins educativos. TMB é estimativa. Para prescrição calórica individualizada, consulte nutricionista.*`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\content\\\\blog\\\\o-que-e-taxa-metabolica-basal.md", content, "utf8");
console.log("Done");
