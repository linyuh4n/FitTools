import fs from "fs";
const content = `---
title: "Proteína para hipertrofia: como calcular sua necessidade real"
description: "Entenda a ciência por trás da recomendação de 1,6–2,2g/kg para hipertrofia, fatores individuais que alteram a necessidade e como ajustar na prática."
pubDate: "2024-02-10"
author: "Equipe FitTools"
coverImage: "/images/protein-hypertrophy.jpg"
coverCaption: "Treino resistido + proteína adequada = hipertrofia. A ciência por trás dos números."
ogImage: "/social/og-protein-hypertrophy.svg"
tags: ["hipertrofia", "proteína", "musculação", "nutrição esportiva"]
relatedTools: ["protein-calculator"]
references:
  - "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376-384."
  - "Jäger R, et al. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20."
  - "Stokes T, et al. Recent perspectives regarding the role of dietary protein for the promotion of muscle hypertrophy with resistance exercise training. Nutrients. 2018;10(2):180."
  - "EFSA Panel on Dietetic Products, Nutrition and Allergies (NDA). Dietary Reference Values for protein. EFSA Journal 2012;10(2):2557."
---

A recomendação de **1,6–2,2g/kg/dia** para hipertrofia é o consenso atual da ciência (ISSN, ACSM, meta-análises). Mas **não é um número mágico** — é uma faixa baseada em evidências, e sua necessidade exata depende de vários fatores.

## De onde vem o 1,6–2,2g/kg?

### Meta-análise de Morton et al. (2018) — 49 estudos, 1.863 participantes
- **Ganho de massa magra** maximizado em **~1,6g/kg/dia**
- Benefícios adicionais até **~2,2g/kg/dia** (platô depois disso)
- Suplementação proteica só ajuda se a dieta basal for **<1,6g/kg**

### Position Stand ISSN (2017)
> "Para construir massa muscular, a maioria dos indivíduos treinados necessita de 1,4–2,0g/kg/dia. Atletas em déficit calórico ou com alto volume de treino podem se beneficiar de até 2,3–3,1g/kg/dia."

## Fatores que aumentam sua necessidade (topo da faixa)

| Fator | Por que aumenta | Ajuste prático |
|-------|-----------------|----------------|
| **Déficit calórico** (cutting) | Proteína poupa massa magra | +0,2–0,5g/kg |
| **Treino alto volume/frequência** | Mais dano muscular → mais reparo | +0,2–0,3g/kg |
| **Idade >40 anos** | Resistência anabólica | +0,2–0,4g/kg |
| **Proteína 100% vegetal** | Menor digestibilidade/PDCAAS | +10–20% total |
| **Sono ruim/estresse alto** | Catabolismo elevado | +0,1–0,2g/kg |
| **Genética "hardgainer"** | Menor eficiência de síntese | Teste topo da faixa |

## Fatores que permitem base da faixa

| Fator | Por que reduz necessidade |
|-------|---------------------------|
| **Iniciante (newbie gains)** | Alta sensibilidade anabólica |
| **Superávit calórico confortável** | Energia poupa proteína |
| **Sono otimizado (8h+)** | Melhor recuperação hormonal |
| **Proteína de alta qualidade (whey, ovos, carne)** | PDCAAS ≈ 1,0 |
| **Treino moderado (3–4x/semana)** | Menor demanda de reparo |

## Exemplos práticos por perfil

| Perfil | Peso | Faixa base | Ajustes | Meta final |
|--------|------|------------|---------|------------|
| Iniciante, superávit, onívoro | 75kg | 1,6g/kg | – | **120g/dia** |
| Intermediário, cutting, onívoro | 80kg | 1,8g/kg | +0,3 (cutting) | **168g/dia** |
| Avançado, alto volume, 45 anos | 85kg | 2,0g/kg | +0,3 (idade) +0,2 (volume) | **212g/dia** |
| Vegetariano estrito, cutting | 70kg | 1,8g/kg | +20% (vegetal) +0,3 (cutting) | **176g/dia** |

## O teto: existe "proteína demais"?

- **Rins saudáveis**: sem evidência de dano até **3,5–4,4g/kg/dia** (estudos de curto prazo)
- **Desconforto digestivo**: limite prático real (~2,5–3g/kg para a maioria)
- **Deslocamento de carboidratos/gorduras**: pode prejudicar performance e hormônios
- **Custo financeiro**: diminui retorno sobre investimento

> **Consenso prático**: 1,6–2,2g/kg cobre 95% dos casos. Acima disso, apenas contextos muito específicos (cutting agressivo, atletas de elite, idosos sarcopênicos).

## Distribuição ao longo do dia

Evidência atual: **3–5 refeições** com **0,3–0,5g/kg por refeição** otimiza síntese proteica muscular (MPS).

Exemplo (80kg, meta 1,8g/kg = 144g/dia):
- 4 refeições × 36g = 144g
- 5 refeições × 29g = 145g

**Pulo do gato**: Priorize **leucina** (~2,5–3g por refeição) — gatilho principal da mTOR.

| Fonte | Leucina por 30g proteína |
|-------|-------------------------|
| Whey isolate | ~3,3g |
| Ovo | ~2,7g |
| Carne | ~2,5g |
| Soja/tofu | ~2,3g |
| Feijão/arroz | ~1,8g (precisa de mais quantidade) |

## Ferramenta prática

Use nossa **[Calculadora de Proteínas](/ferramentas/calculadora-proteina/)** — selecione "Hipertrofia" e sua preferência alimentar para obter sua faixa personalizada com exemplos de alimentos.

---

*Este artigo tem fins educativos. Não substitui consulta com nutricionista esportivo. Pessoas com doença renal devem consultar médico antes de aumentar proteína.*`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\content\\\\blog\\\\proteina-hipertrofia-como-calcular.md", content, "utf8");
console.log("Done");
