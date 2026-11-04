import { describe, it, expect } from 'vitest';
import {
  formatWeight,
  formatHeight,
  formatProtein,
  formatProteinPerKg,
  formatCalories,
  formatBMI,
  formatPercentage,
  formatDate,
  formatDateISO,
  truncate,
  slugify,
} from '@/lib/formatting';

describe('Formatting utilities', () => {
  describe('formatWeight', () => {
    it('should format weight with comma decimal separator', () => {
      expect(formatWeight(70)).toBe('70,0 kg');
      expect(formatWeight(70.5)).toBe('70,5 kg');
      expect(formatWeight(70.55)).toBe('70,6 kg'); // rounds to 1 decimal
    });
  });

  describe('formatHeight', () => {
    it('should format height in meters with comma', () => {
      expect(formatHeight(175)).toBe('1,75 m');
      expect(formatHeight(170)).toBe('1,70 m');
      expect(formatHeight(180)).toBe('1,80 m');
    });
  });

  describe('formatProtein', () => {
    it('should format protein in grams', () => {
      expect(formatProtein(100)).toBe('100 g');
      expect(formatProtein(150)).toBe('150 g');
    });
  });

  describe('formatProteinPerKg', () => {
    it('should format protein per kg with comma', () => {
      expect(formatProteinPerKg(1.6)).toBe('1,6 g/kg/dia');
      expect(formatProteinPerKg(2.2)).toBe('2,2 g/kg/dia');
      expect(formatProteinPerKg(0.8)).toBe('0,8 g/kg/dia');
    });
  });

  describe('formatCalories', () => {
    it('should format calories with thousand separator', () => {
      expect(formatCalories(1500)).toBe('1.500 kcal');
      expect(formatCalories(2500)).toBe('2.500 kcal');
      expect(formatCalories(3500)).toBe('3.500 kcal');
    });
  });

  describe('formatBMI', () => {
    it('should format BMI with comma', () => {
      expect(formatBMI(22.9)).toBe('22,9');
      expect(formatBMI(25.0)).toBe('25,0');
      expect(formatBMI(30.5)).toBe('30,5');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentage with comma', () => {
      expect(formatPercentage(50)).toBe('50,0%');
      expect(formatPercentage(33.3)).toBe('33,3%');
      expect(formatPercentage(12.5)).toBe('12,5%');
    });
  });

  describe('formatDate', () => {
    it('should format date in Portuguese', () => {
      // Use local date to avoid timezone issues
      const date = new Date(2024, 0, 15); // Jan 15, 2024 (month is 0-indexed)
      expect(formatDate(date)).toBe('15 de janeiro de 2024');
    });

    it('should format date string', () => {
      // ISO string with 'T00:00:00' to ensure local midnight
      expect(formatDate('2024-12-25T00:00:00')).toBe('25 de dezembro de 2024');
    });

    it('should accept custom options', () => {
      const date = new Date(2024, 0, 15);
      expect(formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' })).toBe('15 de jan. de 2024');
    });
  });

  describe('formatDateISO', () => {
    it('should return ISO date string', () => {
      expect(formatDateISO('2024-01-15T10:30:00Z')).toBe('2024-01-15');
      expect(formatDateISO(new Date('2024-12-25'))).toBe('2024-12-25');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello world', 8)).toBe('Hello...');
      expect(truncate('Short', 10)).toBe('Short');
    });

    it('should handle exact length', () => {
      expect(truncate('Exactly10', 10)).toBe('Exactly10');
      expect(truncate('Exactly10chars', 10)).toBe('Exactly...');
    });
  });

  describe('slugify', () => {
    it('should create URL-friendly slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Proteína para Hipertrofia')).toBe('proteina-para-hipertrofia');
      expect(slugify('Como calcular o IMC?')).toBe('como-calcular-o-imc');
    });

    it('should handle special characters', () => {
      expect(slugify('Açaí & Café')).toBe('acai-cafe');
      expect(slugify('São Paulo')).toBe('sao-paulo');
    });

    it('should remove leading/trailing hyphens', () => {
      expect(slugify('  Hello  ')).toBe('hello');
      expect(slugify('---test---')).toBe('test');
    });
  });
});
