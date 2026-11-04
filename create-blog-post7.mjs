import fs from "fs";
const content = `---
title: "Como calcular o IMC: fórmula, classificação e limitações"
description: "Aprenda a calcular o Índice de Massa Corporal (IMC), entenda a classificação da OMS, saiba as limitações para atletas e idosos, e use nossa calculadora automática."
pubDate: "2024-02-25"
author: "Equipe FitTools"
coverImage: "/images/imc-calculation.jpg"
coverCaption: "IMC: ferramenta de triagem populacional, não diagnóstico individual"
ogImage: "/social/og-imc.svg"
tags: ["IMC", "índice de massa corporal", "peso", "saúde"]
relatedTools: ["bmi-calculator"]
references:
  - "World Health Organization. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. Geneva: WHO; 2000."
  - "Nuttall FQ. Body mass index: obesity, BMI, and health: a critical review. Nutr Today. 2015;50(3):117-128."
  - "Ministério da Saúde. Vigitel Brasil 2023. Brasília: Ministério da Saúde; 2024."
  - "Romero-Corral A, et al. Accuracy of body mass index in diagnosing obesity in the adult general population. Int J Obes. 2008;32(6):959-966."
---

O **Índice de Massa Corporal (IMC)** é uma medida simples de **peso relativo à altura**, usada mundialmente como ferramenta de **triagem populacional** para risco de doenças relacionadas ao peso.

## Fórmula do IMC

> **IMC = Peso (kg) ÷ [Altura (m) × Altura (m)]**

Ou equivalentemente:
> **IMC = Peso (kg) ÷ Altura (m)²**

### Exemplo
Peso: 75kg | Altura: 1,75m
\`\`\`
IMC = 75 ÷ (1,75 × 1,75) = 75 ÷ 3,0625 = **24,5**
\`\`\`

## Classificação da OMS (Adultos ≥ 20 anos)

| IMC (kg/m²) | Classificação | Risco de comorbidades |
|-------------|---------------|----------------------|
| **< 16,0** | Magreza grave | Elevado (desnutrição) |
| **16,0 – 16,9** | Magreza moderada | Elevado |
| **17,0 – 18,4** | Magreza leve | Levemente elevado |
| **18,5 – 24,9** | **Normal (eutrofia)** | **Baixo (referência)** |
| **25,0 – 29,9** | **Sobrepeso** (Pré-obesidade) | Aumentado |
| **30,0 – 34,9** | **Obesidade Grau I** | Moderado |
| **35,0 – 39,9** | **Obesidade Grau II** | Severo |
| **≥ 40,0** | **Obesidade Grau III** (Mórbida) | Muito severo |

> **Nota**: A OMS define **sobrepeso ≥ 25** e **obesidade ≥ 30**. Alguns países asiáticos usam pontos de corte menores (≥23 e ≥27,5) por maior risco metabólico em IMC menor.

## Calculadora rápida (tabela de referência)

| Altura | Peso para IMC 18,5 | Peso para IMC 25 | Peso para IMC 30 |
|--------|-------------------|------------------|------------------|
| 1,50m | 41,6kg | 56,3kg | 67,5kg |
| 1,55m | 44,4kg | 60,1kg | 72,0kg |
| 1,60m | 47,4kg | 64,0kg | 76,8kg |
| 1,65m | 50,4kg | 68,1kg | 81,7kg |
| 1,70m | 53,5kg | 72,3kg | 86,7kg |
| 1,75m | 56,7kg | 76,6kg | 91,9kg |
| 1,80m | 59,9kg | 81,0kg | 97,2kg |
| 1,85m | 63,3kg | 85,6kg | 102,7kg |
| 1,90m | 66,7kg | 90,3kg | 108,3kg |
| 1,95m | 70,2kg | 95,1kg | 114,1kg |

## Limitações CRÍTICAS do IMC

### 1. **Não distingue gordura de músculo**
- Atleta de fisiculturismo: 100kg, 1,80m → IMC 30,9 ("Obesidade Grau I") | **% gordura: 8%**
- Sedentário "magro por fora, gordo por dentro": 70kg, 1,80m → IMC 21,6 ("Normal") | **% gordura: 28%**

### 2. **Não considera distribuição de gordura**
- **Gordura visceral (abdominal)** → maior risco metabólico
- **Gordura subcutânea (quadril/coxa)** → menor risco
- Dois IMCs iguais, riscos diferentes

### 3. **Inadequado para:**
| Grupo | Por que falha | Alternativa melhor |
|-------|--------------|-------------------|
| **Atletas/hipertrofiados** | Massa muscular infla IMC | % gordura (dobras, DEXA, bioimpedância) |
| **Idosos** | Perda de massa magra (sarcopenia) mas IMC normal | Circunferência da panturrilha, força de preensão |
| **Crianças/adolescentes** | Crescimento altera relação peso/altura | Curvas de crescimento OMS (percentis por idade/sexo) |
| **Gestantes** | Ganho de peso fisiológico | Acompanhamento pré-natal específico |
| **Amputados** | Peso não reflete massa corporal total | Fórmulas ajustadas por segmento |

### 4. **Não captura "obesidade normal" (MONW)**
- IMC normal + % gordura alto + risco metabólico alto
- Prevalência: 15–30% da população "peso normal"

## O que usar JUNTO com IMC

| Medida | O que avalia | Como medir |
|--------|--------------|------------|
| **Circunferência abdominal** | Gordura visceral | Fita métrica no umbigo (homens <94cm, mulheres <80cm) |
| **Razão cintura/quadril** | Distribuição android/ginoide | Cintura ÷ Quadril (H <0,9, M <0,85) |
| **% Gordura corporal** | Composição real | Bioimpedância, dobras cutâneas, DEXA |
| **Exames laboratoriais** | Saúde metabólica | Glicose, lipídios, hepáticas, inflamatórios |

## IMC na prática clínica brasileira (Vigitel 2023)

- **Sobrepeso (IMC ≥25)**: 57,1% dos adultos
- **Obesidade (IMC ≥30)**: 22,4% dos adultos
- **Obesidade grau II/III (IMC ≥35)**: 5,8%
- Tendência: **aumento contínuo** nas últimas 2 décadas

## Ferramenta prática

Use nossa **[Calculadora de IMC](/ferramentas/calculadora-imc/)** — insere peso e altura, mostra IMC, classificação, e **explicação das limitações** para seu contexto.

---

*IMC é triagem, não diagnóstico. Para avaliação completa de composição corporal e risco metabólico, consulte nutricionista ou médico.*`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\content\\\\blog\\\\como-calcular-imc.md", content, "utf8");
console.log("Done");
