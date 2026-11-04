import type { ProteinCalculatorInput, ProteinCalculatorResult } from '@/types';
import { getTopProteinFoods } from '@/data/foods';

/**
 * Calcula a faixa de necessidade proteica baseada em referências científicas.
 *
 * Referências:
 * - EFSA (2012): 0,83 g/kg/dia para adultos saudáveis (Population Reference Intake)
 * - ISSN (2017): 1,4–2,0 g/kg/dia para hipertrofia em treinamento resistido
 * - ACSM (2016): 1,2–2,0 g/kg/dia para atletas
 * - Ministério da Saúde (Brasil): 0,8–1,0 g/kg/dia para adultos
 */
export function calculateProteinRange(input: ProteinCalculatorInput): {
  min: number;
  max: number;
} {
  const { weight, goal } = input;

  let minGPerKg: number;
  let maxGPerKg: number;

  switch (goal) {
    case 'health':
      // Saúde geral / manutenção: 0,8–1,0 g/kg/dia
      minGPerKg = 0.8;
      maxGPerKg = 1.0;
      break;
    case 'active':
      // Manutenção com atividade física: 1,0–1,4 g/kg/dia
      minGPerKg = 1.0;
      maxGPerKg = 1.4;
      break;
    case 'hypertrophy':
      // Hipertrofia / treinamento resistido: 1,6–2,2 g/kg/dia
      minGPerKg = 1.6;
      maxGPerKg = 2.2;
      break;
  }

  return {
    min: Math.round(minGPerKg * 10) / 10,
    max: Math.round(maxGPerKg * 10) / 10,
  };
}

export function calculateProteinGrams(
  weight: number,
  range: { min: number; max: number }
): { minGrams: number; maxGrams: number; averageGrams: number } {
  const minGrams = Math.round(weight * range.min);
  const maxGrams = Math.round(weight * range.max);
  const averageGrams = Math.round((minGrams + maxGrams) / 2);

  return { minGrams, maxGrams, averageGrams };
}

export function calculatePerMeal(
  totalGrams: number,
  mealsPerDay: number
): number {
  if (mealsPerDay <= 0) return 0;
  return Math.round(totalGrams / mealsPerDay);
}

export function getGoalLabel(goal: ProteinCalculatorInput['goal']): string {
  switch (goal) {
    case 'health':
      return 'Saúde geral / manutenção';
    case 'active':
      return 'Manutenção com atividade física';
    case 'hypertrophy':
      return 'Hipertrofia / ganho de massa muscular';
  }
}

export function getDietPreferenceLabel(
  preference: ProteinCalculatorInput['dietPreference']
): string {
  switch (preference) {
    case 'omnivore':
      return 'Onívora (inclui carnes, ovos, laticínios)';
    case 'vegetarian':
      return 'Vegetariana (ovos e laticínios)';
    case 'vegan':
      return 'Vegetariana estrita (vegana)';
  }
}

export function getReferences(): string[] {
  return [
    'EFSA Panel on Dietetic Products, Nutrition and Allergies (NDA). Dietary Reference Values for protein. EFSA Journal 2012;10(2):2557.',
    'Jäger R, et al. International Society of Sports Nutrition Position Stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.',
    'Thomas DT, et al. Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and ACSM: Nutrition and Athletic Performance. Med Sci Sports Exerc. 2016;48(3):543-568.',
    'Ministério da Saúde. Guia Alimentar para a População Brasileira. 2ª ed. Brasília: Ministério da Saúde; 2014.',
  ];
}

export function calculateProtein(input: ProteinCalculatorInput): ProteinCalculatorResult {
  const range = calculateProteinRange(input);
  const grams = calculateProteinGrams(input.weight, range);
  const perMeal = input.mealsPerDay
    ? calculatePerMeal(grams.averageGrams, input.mealsPerDay)
    : undefined;
  const foods = getTopProteinFoods(input.dietPreference, 8);

  return {
    weight: input.weight,
    goal: input.goal,
    dietPreference: input.dietPreference,
    mealsPerDay: input.mealsPerDay,
    range,
    minGramsPerDay: grams.minGrams,
    maxGramsPerDay: grams.maxGrams,
    averageGramsPerDay: grams.averageGrams,
    perMeal,
    foods,
    references: getReferences(),
  };
}

export function validateProteinInput(input: Partial<ProteinCalculatorInput>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (input.weight === undefined || input.weight === null) {
    errors.weight = 'Peso é obrigatório';
  } else if (typeof input.weight !== 'number' || isNaN(input.weight)) {
    errors.weight = 'Peso deve ser um número válido';
  } else if (input.weight < 20 || input.weight > 300) {
    errors.weight = 'Peso deve estar entre 20 e 300 kg';
  }

  if (!input.goal || !['health', 'active', 'hypertrophy'].includes(input.goal)) {
    errors.goal = 'Objetivo inválido';
  }

  if (
    !input.dietPreference ||
    !['omnivore', 'vegetarian', 'vegan'].includes(input.dietPreference)
  ) {
    errors.dietPreference = 'Preferência alimentar inválida';
  }

  if (input.mealsPerDay !== undefined) {
    if (typeof input.mealsPerDay !== 'number' || isNaN(input.mealsPerDay)) {
      errors.mealsPerDay = 'Número de refeições deve ser um número válido';
    } else if (input.mealsPerDay < 1 || input.mealsPerDay > 10) {
      errors.mealsPerDay = 'Número de refeições deve estar entre 1 e 10';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
