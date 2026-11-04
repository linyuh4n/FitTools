const fs = require("fs");
const content = `---
title: "Proteína vegetal: quais são as melhores fontes?"
description: "Conheça as principais fontes de proteína vegetal, seus valores nutricionais e como combiná-las para obter todos os aminoácidos essenciais."
pubDate: "2024-01-20"
author: "Equipe FitTools"
coverImage: "/images/vegetarian-protein.jpg"
coverCaption: "Variedade de fontes de proteína vegetal: leguminosas, cereais, oleaginosas e derivados"
ogImage: "/social/og-vegetarian-protein.svg"
tags: ["proteína vegetal", "vegetariano", "vegano", "nutrição"]
relatedTools: ["protein-calculator"]
references:
  - "FAO/WHO. Dietary protein quality evaluation in human nutrition. Report of an FAO Expert Consultation. 2013."
  - "Mariotti F, Gardner CD. Dietary protein and amino acids in vegetarian diets—A review. Nutrients. 2019;11(11):2661."
  - "Tabela Brasileira de Composição de Alimentos (TACO), 4ª ed. USP/NEPA. 2011."
  - "Ministério da Saúde. Guia Alimentar para a População Brasileira. 2ª ed. 2014."
---

A proteína vegetal pode atender perfeitamente às necessidades nutricionais, desde que haja **variedade** e **planejamento**. Diferente das proteínas animais, a maioria das vegetais tem perfil de aminoácidos incompleto ou menor digestibilidade — mas a combinação certa resolve isso.

## Entendendo a qualidade da proteína

Dois conceitos importantes:

| Conceito | O que significa |
|----------|----------------|
| **PDCAAS** | Protein Digestibility-Corrected Amino Acid Score — pontuação de 0 a 1 (1 = proteína completa) |
| **DIAAS** | Digestible Indispensable Amino Acid Score — método mais recente e preciso da FAO |

Proteínas animais (ovos, leite, carne) costumam ter PDCAAS/DIAAS ≈ 1,0. Vegetais variam entre 0,4–0,9.

## Principais fontes vegetais (proteína por 100g)

### Leguminosas (cozidas)
| Alimento | Proteína (g) | PDCAAS | Observação |
|----------|--------------|--------|------------|
| **Lentilha** | 9,0 | 0,52 | Rica em lisina, pobre em metionina |
| **Grão-de-bico** | 8,9 | 0,78 | Boa digestibilidade |
| **Feijão preto** | 8,7 | 0,68 | Clássico brasileiro |
| **Feijão carioca** | 8,4 | 0,68 | Similar ao preto |
| **Ervilha** | 5,4 | 0,65 | Base de proteínas isoladas |
| **Soja (grão cozido)** | 12,4 | 0,91 | **Proteína completa** |

### Derivados de soja
| Alimento | Proteína (g) | PDCAAS | Observação |
|----------|--------------|--------|------------|
| **Tofu firme** | 8,0–12,0 | 0,91 | Versátil, absorve temperos |
| **Tempeh** | 19,0 | 0,91 | Fermentado, mais digestível |
| **Proteína texturizada (PVT)** | 50,0 (seco) | 0,91 | Reidratar antes do uso |
| **Edamame** | 11,0 | 0,91 | Vagem de soja verde |

### Cereais e pseudocereais
| Alimento | Proteína (g/100g cozido) | Observação |
|----------|---------------------------|------------|
| **Quinoa** | 4,4 | **Proteína completa** (pseudocereal) |
| **Amaranto** | 3,8 | Rico em lisina |
| **Trigo sarraceno** | 3,4 | Sem glúten |
| **Arroz integral** | 2,6 | Pobre em lisina |
| **Aveia** | 2,5 (cozida) / 13 (seca) | Boa opção no café da manhã |

### Oleaginosas e sementes (valores por 100g)
| Alimento | Proteína (g) | Observação |
|----------|--------------|------------|
| **Amendoim** | 25,8 | Tecnicamente leguminosa |
| **Amêndoa** | 21,2 | Rica em cálcio |
| **Castanha de caju** | 18,2 | Boa para cremes |
| **Semente de abóbora** | 30,2 | Rica em zinco |
| **Semente de chia** | 16,5 | Rica em ômega-3 |
| **Semente de linhaça** | 18,3 | Moer para absorver |
| **Semente de girassol** | 20,8 | Rica em vitamina E |

### Vegetais (proteína por 100g cozido)
| Alimento | Proteína (g) | Observação |
|----------|--------------|------------|
| **Brócolis** | 2,8 | Baixa caloria |
| **Espinafre** | 3,0 | Reduz muito no cozimento |
| **Aspargo** | 2,4 | Sazonal |
| **Couve-flor** | 1,9 | Versátil |

## A regra da complementação

**Cereais + Leguminosas = Proteína completa**

- Cereais: ricos em metionina, pobres em lisina
- Leguminosas: ricas em lisina, pobres em metionina

Exemplos clássicos brasileiros:
- **Arroz + feijão** (a base da nossa alimentação)
- **Lentilha + quinoa**
- **Grão-de-bico + trigo sarraceno**
- **Tofu + arroz integral**

> **Não precisa ser na mesma refeição.** O pool de aminoácidos do corpo se renova ao longo do dia. Basta variar ao longo de 24h.

## Dica prática: adicione 10–20% à meta

Se 100% da proteína vier de fontes vegetais, alguns estudos sugerem adicionar **~10–20%** à meta total para compensar menor digestibilidade e perfil de aminoácidos.

Exemplo: meta de 100g → consuma 110–120g de proteína vegetal variada.

## Ferramenta prática

Use nossa **[Calculadora de Proteínas](/ferramentas/calculadora-proteina/)** selecionando "Vegetariana estrita" ou "Vegetariana com ovos e laticínios" para ver exemplos personalizados de alimentos.

---

*Este artigo tem fins educativos. Não substitui consulta com nutricionista.*`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\content\\\\blog\\\\proteina-vegetal-melhores-fontes.md", content, "utf8");
console.log("Done");
