import type { BMICalculatorInput, BMICalculatorResult } from '@/types';

/**
 * Calcula o Índice de Massa Corporal (IMC).
 * Fórmula: IMC = peso / (altura em metros)²
 *
 * Classificação baseada na OMS para adultos:
 * - < 18,5: Baixo peso
 * - 18,5–24,9: Peso normal
 * - 25,0–29,9: Sobrepeso
 * - ≥ 30,0: Obesidade
 *
 * Limitações: não se aplica a crianças, idosos, atletas, gestantes,
 * pessoas com alta massa muscular ou condições clínicas específicas.
 */
export function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
}

export function getBMICategory(bmi: number): BMICalculatorResult['category'] {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obesity';
}

export function getBMICategoryLabel(category: BMICalculatorResult['category']): string {
  switch (category) {
    case 'underweight':
      return 'Baixo peso';
    case 'normal':
      return 'Peso normal';
    case 'overweight':
      return 'Sobrepeso';
    case 'obesity':
      return 'Obesidade';
  }
}

export function getBMILimitations(): string[] {
  return [
    'O IMC não distingue entre massa muscular e gordura corporal.',
    'Atletas e pessoas com alta massa muscular podem ser classificadas incorretamente.',
    'Não se aplica a crianças e adolescentes (usar curvas de crescimento).',
    'Idosos podem ter composição corporal diferente com mesmo IMC.',
    'Gestantes não devem usar esta classificação.',
    'Não avalia distribuição de gordura (gordura visceral vs subcutânea).',
    'Não substitui avaliação médica ou nutricional completa.',
  ];
}

export function calculateBMIResult(input: BMICalculatorInput): BMICalculatorResult {
  const bmi = calculateBMI(input.weight, input.height);
  const category = getBMICategory(bmi);
  const categoryLabel = getBMICategoryLabel(category);
  const limitations = getBMILimitations();

  return {
    bmi,
    category,
    categoryLabel,
    weight: input.weight,
    height: input.height,
    limitations,
  };
}

export function validateBMIInput(input: Partial<BMICalculatorInput>): {
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

  if (input.height === undefined || input.height === null) {
    errors.height = 'Altura é obrigatória';
  } else if (typeof input.height !== 'number' || isNaN(input.height)) {
    errors.height = 'Altura deve ser um número válido';
  } else if (input.height < 100 || input.height > 250) {
    errors.height = 'Altura deve estar entre 100 e 250 cm';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
