import type { Tool } from "@/types";

export const tools: Tool[] = [
  {
    id: "protein-calculator",
    name: "Calculadora de Proteínas",
    description: "Calcule sua necessidade diária de proteína baseada no peso, objetivo e preferência alimentar.",
    href: "/ferramentas/calculadora-proteina/",
    icon: "protein",
    category: "nutrition",
  },
  {
    id: "bmi-calculator",
    name: "Calculadora de IMC",
    description: "Calcule seu Índice de Massa Corporal e entenda sua classificação.",
    href: "/ferramentas/calculadora-imc/",
    icon: "bmi",
    category: "health",
  },
  {
    id: "calorie-calculator",
    name: "Calculadora de Calorias",
    description: "Estime sua taxa metabólica basal e gasto energético diário total.",
    href: "/ferramentas/calculadora-calorias/",
    icon: "calorie",
    category: "nutrition",
  },
  {
    id: "macro-calculator",
    name: "Calculadora de Macronutrientes",
    description: "Distribuição ideal de proteínas, carboidratos e gorduras baseada no TDEE e objetivo.",
    href: "/ferramentas/calculadora-macronutrientes/",
    icon: "macro",
    category: "nutrition",
  },
  {
    id: "volume-calculator",
    name: "Calculadora de Volume de Treino",
    description: "Volume (tonelagem), 1RM estimado (Epley/RPE), trabalho mecânico e duração da sessão.",
    href: "/ferramentas/calculadora-volume-treino/",
    icon: "volume",
    category: "training",
  },
  {
    id: "bodyfat-calculator",
    name: "Calculadora de % Gordura Corporal",
    description: "Estimativa por Navy (circunferências), Jackson-Pollock (dobras 3/7 locais) ou IMC.",
    href: "/ferramentas/calculadora-gordura-corporal/",
    icon: "bodyfat",
    category: "health",
  },
];

export const toolsByCategory = {
  nutrition: tools.filter((t) => t.category === "nutrition"),
  training: tools.filter((t) => t.category === "training"),
  health: tools.filter((t) => t.category === "health"),
};

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolByHref(href: string): Tool | undefined {
  return tools.find((t) => t.href === href);
}