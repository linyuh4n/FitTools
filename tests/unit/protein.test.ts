import { describe, it, expect } from 'vitest';
import {
  calculateProteinRange,
  calculateProteinGrams,
  calculatePerMeal,
  validateProteinInput,
  calculateProtein,
} from '@/lib/calculations/protein';

describe('Protein Calculator', () => {
  describe('calculateProteinRange', () => {
    it('should return correct range for health goal', () => {
      const result = calculateProteinRange({ weight: 70, goal: 'health', dietPreference: 'omnivore' });
      expect(result.min).toBe(0.8);
      expect(result.max).toBe(1.0);
    });

    it('should return correct range for active goal', () => {
      const result = calculateProteinRange({ weight: 70, goal: 'active', dietPreference: 'omnivore' });
      expect(result.min).toBe(1.0);
      expect(result.max).toBe(1.4);
    });

    it('should return correct range for hypertrophy goal', () => {
      const result = calculateProteinRange({ weight: 70, goal: 'hypertrophy', dietPreference: 'omnivore' });
      expect(result.min).toBe(1.6);
      expect(result.max).toBe(2.2);
    });
  });

  describe('calculateProteinGrams', () => {
    it('should calculate correct grams for weight 70kg and range 0.8-1.0', () => {
      const result = calculateProteinGrams(70, { min: 0.8, max: 1.0 });
      expect(result.minGrams).toBe(56);
      expect(result.maxGrams).toBe(70);
      expect(result.averageGrams).toBe(63);
    });

    it('should calculate correct grams for weight 80kg and range 1.6-2.2', () => {
      const result = calculateProteinGrams(80, { min: 1.6, max: 2.2 });
      expect(result.minGrams).toBe(128);
      expect(result.maxGrams).toBe(176);
      expect(result.averageGrams).toBe(152);
    });

    it('should handle decimal weight', () => {
      const result = calculateProteinGrams(70.5, { min: 1.0, max: 1.5 });
      expect(result.minGrams).toBe(71);
      expect(result.maxGrams).toBe(106);
    });
  });

  describe('calculatePerMeal', () => {
    it('should divide total grams by meals per day', () => {
      expect(calculatePerMeal(100, 4)).toBe(25);
      expect(calculatePerMeal(120, 5)).toBe(24);
      expect(calculatePerMeal(90, 3)).toBe(30);
    });

    it('should return 0 for invalid meals', () => {
      expect(calculatePerMeal(100, 0)).toBe(0);
      expect(calculatePerMeal(100, -1)).toBe(0);
    });
  });

  describe('validateProteinInput', () => {
    it('should return valid for correct input', () => {
      const result = validateProteinInput({
        weight: 70,
        goal: 'hypertrophy',
        dietPreference: 'omnivore',
        mealsPerDay: 4,
      });
      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject missing weight', () => {
      const result = validateProteinInput({ goal: 'health', dietPreference: 'omnivore' });
      expect(result.valid).toBe(false);
      expect(result.errors.weight).toBeDefined();
    });

    it('should reject weight below minimum', () => {
      const result = validateProteinInput({ weight: 15, goal: 'health', dietPreference: 'omnivore' });
      expect(result.valid).toBe(false);
      expect(result.errors.weight).toContain('20 e 300');
    });

    it('should reject weight above maximum', () => {
      const result = validateProteinInput({ weight: 350, goal: 'health', dietPreference: 'omnivore' });
      expect(result.valid).toBe(false);
      expect(result.errors.weight).toContain('20 e 300');
    });

    it('should reject invalid goal', () => {
      const result = validateProteinInput({ weight: 70, goal: 'invalid', dietPreference: 'omnivore' });
      expect(result.valid).toBe(false);
      expect(result.errors.goal).toBeDefined();
    });

    it('should reject invalid diet preference', () => {
      const result = validateProteinInput({ weight: 70, goal: 'health', dietPreference: 'invalid' });
      expect(result.valid).toBe(false);
      expect(result.errors.dietPreference).toBeDefined();
    });

    it('should reject mealsPerDay out of range', () => {
      const result = validateProteinInput({ weight: 70, goal: 'health', dietPreference: 'omnivore', mealsPerDay: 15 });
      expect(result.valid).toBe(false);
      expect(result.errors.mealsPerDay).toContain('1 e 10');
    });

    it('should accept valid mealsPerDay', () => {
      const result = validateProteinInput({ weight: 70, goal: 'health', dietPreference: 'omnivore', mealsPerDay: 1 });
      expect(result.valid).toBe(true);
    });

    it('should accept mealsPerDay = 10', () => {
      const result = validateProteinInput({ weight: 70, goal: 'health', dietPreference: 'omnivore', mealsPerDay: 10 });
      expect(result.valid).toBe(true);
    });
  });

  describe('calculateProtein (integration)', () => {
    it('should return complete result for typical input', () => {
      const result = calculateProtein({
        weight: 70,
        goal: 'hypertrophy',
        dietPreference: 'omnivore',
        mealsPerDay: 4,
      });

      expect(result.weight).toBe(70);
      expect(result.goal).toBe('hypertrophy');
      expect(result.dietPreference).toBe('omnivore');
      expect(result.mealsPerDay).toBe(4);
      expect(result.range.min).toBe(1.6);
      expect(result.range.max).toBe(2.2);
      expect(result.minGramsPerDay).toBe(112);
      expect(result.maxGramsPerDay).toBe(154);
      expect(result.averageGramsPerDay).toBe(133);
      expect(result.perMeal).toBe(33);
      expect(result.foods.length).toBeGreaterThan(0);
      expect(result.references.length).toBeGreaterThan(0);
    });

    it('should filter foods by diet preference', () => {
      const omnivoreResult = calculateProtein({ weight: 70, goal: 'health', dietPreference: 'omnivore' });
      const veganResult = calculateProtein({ weight: 70, goal: 'health', dietPreference: 'vegan' });

      // Vegan should not have animal products
      const veganCategories = veganResult.foods.map(f => f.category);
      expect(veganCategories).not.toContain('Carnes');
      expect(veganCategories).not.toContain('Peixes');
      expect(veganCategories).not.toContain('Ovos');
      expect(veganCategories).not.toContain('Laticínios');

      // Omnivore should have everything
      const omniUniqueCategories = [...new Set(omnivoreResult.foods.map(f => f.category))];
      const veganUniqueCategories = [...new Set(veganCategories)];
      expect(omniUniqueCategories.length).toBeGreaterThan(veganUniqueCategories.length);
    });

    it('should not include perMeal when mealsPerDay not provided', () => {
      const result = calculateProtein({ weight: 70, goal: 'health', dietPreference: 'omnivore' });
      expect(result.perMeal).toBeUndefined();
    });
  });
});
