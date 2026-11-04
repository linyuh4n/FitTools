import type { CalorieCalculatorInput, CalorieCalculatorResult } from '@/types';

/**
 * Calcula Taxa Metabólica Basal (TMB) usando equação Mifflin-St Jeor.
 * Mais precisa que Harris-Benedict para população geral.
 *
 * Homens: TMB = 10 × peso + 6,25 × altura - 5 × idade + 5
 * Mulheres: TMB = 10 × peso + 6,25 × altura - 5 × idade - 161
 *
 * Gasto Energético Diário Total (GET) = TMB × Fator de Atividade
 *
 * Fatores de Atividade (NAF/FAF):
 * - Sedentário: 1,2
 * - Leve: 1,375
 * - Moderado: 1,55
 * - Intenso: 1,725
 * - Muito intenso: 1,9
 *
 * Limitações: não se aplica a crianças, gestantes, idosos frágeis,
 * condições metabólicas, obesidade mórbida, etc.
 */

const ACTIVITY_FACTORS: Record<CalorieCalculatorInput['activityLevel'], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

const GOAL_ADJUSTMENTS: Record<NonNullable<CalorieCalculatorInput['goal']>, number> = {
  maintain: 0,
  lose: -500,
  gain: 500,
};

export function calculateBMR(
  sex: CalorieCalculatorInput['sex'],
  weight: number,
  height: number,
  age: number
): number {
  let bmr: number;

  if (sex === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return Math.round(bmr);
}

export function getActivityFactor(level: CalorieCalculatorInput['activityLevel']): number {
  return ACTIVITY_FACTORS[level] ?? 1.2;
}

export function getActivityLabel(level: CalorieCalculatorInput['activityLevel']): string {
  switch (level) {
    case 'sedentary':
      return 'Sedentário (pouco ou nenhum exercício)';
    case 'light':
      return 'Leve (exercício leve 1–3 dias/semana)';
    case 'moderate':
      return 'Moderado (exercício moderado 3–5 dias/semana)';
    case 'very':
      return 'Intenso (exercício intenso 6–7 dias/semana)';
    case 'extra':
      return 'Muito intenso (exercício muito intenso, trabalho físico)';
  }
}

export function calculateTDEE(bmr: number, activityFactor: number): number {
  return Math.round(bmr * activityFactor);
}

export function calculateTargetCalories(
  tdee: number,
  goal?: CalorieCalculatorInput['goal']
): number | undefined {
  if (!goal) return undefined;
  const adjustment = GOAL_ADJUSTMENTS[goal];
  return Math.round(tdee + adjustment);
}

export function getCalorieLimitations(): string[] {
  return [
    'Equação Mifflin-St Jeor tem erro médio de ~10% em relação ao gasto real.',
    'Não se aplica a crianças, adolescentes, gestantes ou lactantes.',
    'Idosos e pessoas com condições clínicas podem ter necessidades diferentes.',
    'Obesidade mórbida (IMC > 40) requer fórmulas ajustadas para peso ideal.',
    'Fatores de atividade são estimativas; gasto real varia individualmente.',
    'Não substitui avaliação nutricional individualizada.',
    'Déficits ou superávits agressivos (> 1000 kcal) não são recomendados.',
  ];
}

export function calculateCalorieResult(input: CalorieCalculatorInput): CalorieCalculatorResult {
  const bmr = calculateBMR(input.sex, input.weight, input.height, input.age);
  const activityFactor = getActivityFactor(input.activityLevel);
  const tdee = calculateTDEE(bmr, activityFactor);
  const targetCalories = calculateTargetCalories(tdee, input.goal);
  const limitations = getCalorieLimitations();

  return {
    bmr,
    tdee,
    targetCalories,
    sex: input.sex,
    age: input.age,
    weight: input.weight,
    height: input.height,
    activityLevel: input.activityLevel,
    activityFactor,
    goal: input.goal,
    limitations,
  };
}

export function validateCalorieInput(input: Partial<CalorieCalculatorInput>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!input.sex || !['male', 'female'].includes(input.sex)) {
    errors.sex = 'Sexo biológico é obrigatório (para seleção da equação)';
  }

  if (input.age === undefined || input.age === null) {
    errors.age = 'Idade é obrigatória';
  } else if (typeof input.age !== 'number' || isNaN(input.age)) {
    errors.age = 'Idade deve ser um número válido';
  } else if (input.age < 15 || input.age > 100) {
    errors.age = 'Idade deve estar entre 15 e 100 anos';
  }

  if (input.weight === undefined || input.weight === null) {
    errors.weight = 'Peso é obrigatório';
  } else if (typeof input.weight !== 'number' || isNaN(input.weight)) {
    errors.weight = 'Peso deve ser um número válido';
  } else if (input.weight < 20 || input.weight > 300) {
    errors.weight = 'Peso deve estar entre 20 e 300 kg';
  }

  if (input.height === undefined || input.height === null) {
    errors.height = 'Altura é obrigatória';
  } else if (typeof input.height !== 'number' || isNaN(input.height)) {
    errors.height = 'Altura deve ser um número válido';
  } else if (input.height < 100 || input.height > 250) {
    errors.height = 'Altura deve estar entre 100 e 250 cm';
  }

  if (
    !input.activityLevel ||
    !['sedentary', 'light', 'moderate', 'very', 'extra'].includes(input.activityLevel)
  ) {
    errors.activityLevel = 'Nível de atividade inválido';
  }

  if (
    input.goal &&
    !['maintain', 'lose', 'gain'].includes(input.goal)
  ) {
    errors.goal = 'Objetivo inválido';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
