import { describe, it, expect } from 'vitest';
import {
  calculateBMI,
  getBMICategory,
  getBMICategoryLabel,
  validateBMIInput,
  calculateBMIResult,
} from '@/lib/calculations/bmi';

describe('BMI Calculator', () => {
  describe('calculateBMI', () => {
    it('should calculate BMI correctly for 70kg, 175cm', () => {
      const bmi = calculateBMI(70, 175);
      expect(bmi).toBe(22.9);
    });

    it('should calculate BMI correctly for 80kg, 180cm', () => {
      const bmi = calculateBMI(80, 180);
      expect(bmi).toBe(24.7);
    });

    it('should calculate BMI correctly for 100kg, 170cm', () => {
      const bmi = calculateBMI(100, 170);
      expect(bmi).toBe(34.6);
    });

    it('should handle decimal values', () => {
      const bmi = calculateBMI(70.5, 175.5);
      expect(bmi).toBe(22.9);
    });

    it('should round to 1 decimal place', () => {
      const bmi = calculateBMI(70, 170);
      expect(bmi).toBe(24.2);
    });
  });

  describe('getBMICategory', () => {
    it('should return underweight for BMI < 18.5', () => {
      expect(getBMICategory(18.4)).toBe('underweight');
      expect(getBMICategory(15.0)).toBe('underweight');
      expect(getBMICategory(18.49)).toBe('underweight');
    });

    it('should return normal for BMI 18.5–24.9', () => {
      expect(getBMICategory(18.5)).toBe('normal');
      expect(getBMICategory(22.0)).toBe('normal');
      expect(getBMICategory(24.9)).toBe('normal');
    });

    it('should return overweight for BMI 25.0–29.9', () => {
      expect(getBMICategory(25.0)).toBe('overweight');
      expect(getBMICategory(27.5)).toBe('overweight');
      expect(getBMICategory(29.9)).toBe('overweight');
    });

    it('should return obesity for BMI >= 30.0', () => {
      expect(getBMICategory(30.0)).toBe('obesity');
      expect(getBMICategory(35.0)).toBe('obesity');
      expect(getBMICategory(40.0)).toBe('obesity');
    });
  });

  describe('getBMICategoryLabel', () => {
    it('should return correct Portuguese labels', () => {
      expect(getBMICategoryLabel('underweight')).toBe('Baixo peso');
      expect(getBMICategoryLabel('normal')).toBe('Peso normal');
      expect(getBMICategoryLabel('overweight')).toBe('Sobrepeso');
      expect(getBMICategoryLabel('obesity')).toBe('Obesidade');
    });
  });

  describe('validateBMIInput', () => {
    it('should return valid for correct input', () => {
      const result = validateBMIInput({ weight: 70, height: 175 });
      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject missing weight', () => {
      const result = validateBMIInput({ height: 175 });
      expect(result.valid).toBe(false);
      expect(result.errors.weight).toBeDefined();
    });

    it('should reject missing height', () => {
      const result = validateBMIInput({ weight: 70 });
      expect(result.valid).toBe(false);
      expect(result.errors.height).toBeDefined();
    });

    it('should reject weight below minimum', () => {
      const result = validateBMIInput({ weight: 15, height: 175 });
      expect(result.valid).toBe(false);
      expect(result.errors.weight).toContain('20 e 300');
    });

    it('should reject weight above maximum', () => {
      const result = validateBMIInput({ weight: 350, height: 175 });
      expect(result.valid).toBe(false);
      expect(result.errors.weight).toContain('20 e 300');
    });

    it('should reject height below minimum', () => {
      const result = validateBMIInput({ weight: 70, height: 50 });
      expect(result.valid).toBe(false);
      expect(result.errors.height).toContain('100 e 250');
    });

    it('should reject height above maximum', () => {
      const result = validateBMIInput({ weight: 70, height: 300 });
      expect(result.valid).toBe(false);
      expect(result.errors.height).toContain('100 e 250');
    });
  });

  describe('calculateBMIResult (integration)', () => {
    it('should return complete result for normal weight', () => {
      const result = calculateBMIResult({ weight: 70, height: 175 });

      expect(result.weight).toBe(70);
      expect(result.height).toBe(175);
      expect(result.bmi).toBe(22.9);
      expect(result.category).toBe('normal');
      expect(result.categoryLabel).toBe('Peso normal');
      expect(result.limitations.length).toBeGreaterThan(0);
    });

    it('should return correct category for underweight', () => {
      const result = calculateBMIResult({ weight: 50, height: 175 });
      expect(result.category).toBe('underweight');
      expect(result.categoryLabel).toBe('Baixo peso');
    });

    it('should return correct category for overweight', () => {
      const result = calculateBMIResult({ weight: 85, height: 175 });
      expect(result.category).toBe('overweight');
      expect(result.categoryLabel).toBe('Sobrepeso');
    });

    it('should return correct category for obesity', () => {
      const result = calculateBMIResult({ weight: 100, height: 175 });
      expect(result.category).toBe('obesity');
      expect(result.categoryLabel).toBe('Obesidade');
    });

    it('should include all limitations', () => {
      const result = calculateBMIResult({ weight: 70, height: 175 });
      const limitations = result.limitations;

      expect(limitations.some(l => l.includes('massa muscular'))).toBe(true);
      expect(limitations.some(l => l.includes('Atletas'))).toBe(true);
      expect(limitations.some(l => l.includes('crianças'))).toBe(true);
      expect(limitations.some(l => l.includes('Idosos'))).toBe(true);
      expect(limitations.some(l => l.includes('Gestantes'))).toBe(true);
      expect(limitations.some(l => l.includes('gordura visceral'))).toBe(true);
      expect(limitations.some(l => l.includes('avaliação médica'))).toBe(true);
    });
  });

  describe('Boundary values', () => {
    it('should handle exact boundary 18.5', () => {
      // 18.5 * 1.75^2 = 56.65625 -> need weight ~56.7
      const bmi = calculateBMI(56.7, 175);
      expect(bmi).toBe(18.5);
      expect(getBMICategory(bmi)).toBe('normal');
    });

    it('should handle exact boundary 25.0', () => {
      const bmi = calculateBMI(76.6, 175);
      expect(bmi).toBe(25.0);
      expect(getBMICategory(bmi)).toBe('overweight');
    });

    it('should handle exact boundary 30.0', () => {
      const bmi = calculateBMI(91.9, 175);
      expect(bmi).toBe(30.0);
      expect(getBMICategory(bmi)).toBe('obesity');
    });
  });
});
