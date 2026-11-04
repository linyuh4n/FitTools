import type { Tool } from '@/types';

export const tools: Tool[] = [
  {
    id: 'protein-calculator',
    name: 'Calculadora de Proteínas',
    description: 'Calcule sua necessidade diária de proteína baseada no peso, objetivo e preferência alimentar.',
    href: '/ferramentas/calculadora-proteina/',
    icon: 'protein',
    category: 'nutrition',
  },
  {
    id: 'bmi-calculator',
    name: 'Calculadora de IMC',
    description: 'Calcule seu Índice de Massa Corporal e entenda sua classificação.',
    href: '/ferramentas/calculadora-imc/',
    icon: 'bmi',
    category: 'health',
  },
  {
    id: 'calorie-calculator',
    name: 'Calculadora de Calorias',
    description: 'Estime sua taxa metabólica basal e gasto energético diário total.',
    href: '/ferramentas/calculadora-calorias/',
    icon: 'calorie',
    category: 'nutrition',
  },
];

export const toolsByCategory = {
  nutrition: tools.filter((t) => t.category === 'nutrition'),
  training: tools.filter((t) => t.category === 'training'),
  health: tools.filter((t) => t.category === 'health'),
};

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolByHref(href: string): Tool | undefined {
  return tools.find((t) => t.href === href);
}
