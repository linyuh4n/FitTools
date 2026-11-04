import { describe, it, expect } from 'vitest';
import {
  calculateBMR,
  getActivityFactor,
  calculateTDEE,
  calculateTargetCalories,
  validateCalorieInput,
  calculateCalorieResult,
} from '@/lib/calculations/calorie';

describe('Calorie Calculator', () => {
  describe('calculateBMR (Mifflin-St Jeor)', () => {
    it('should calculate BMR correctly for male', () => {
      // Male: 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75 -> 1649
      const bmr = calculateBMR('male', 70, 175, 30);
      expect(bmr).toBe(1649);
    });

    it('should calculate BMR correctly for female', () => {
      // Female: 10*60 + 6.25*165 - 5*25 - 161 = 600 + 1031.25 - 125 - 161 = 1345.25 -> 1345
      const bmr = calculateBMR('female', 60, 165, 25);
      expect(bmr).toBe(1345);
    });

    it('should handle different ages', () => {
      const bmr20 = calculateBMR('male', 70, 175, 20);
      const bmr50 = calculateBMR('male', 70, 175, 50);
      expect(bmr20).toBeGreaterThan(bmr50);
    });

    it('should handle different weights', () => {
      const bmr60 = calculateBMR('male', 60, 175, 30);
      const bmr80 = calculateBMR('male', 80, 175, 30);
      expect(bmr80).toBeGreaterThan(bmr60);
    });

    it('should handle different heights', () => {
      const bmr160 = calculateBMR('male', 70, 160, 30);
      const bmr190 = calculateBMR('male', 70, 190, 30);
      expect(bmr190).toBeGreaterThan(bmr160);
    });
  });

  describe('getActivityFactor', () => {
    it('should return correct factors', () => {
      expect(getActivityFactor('sedentary')).toBe(1.2);
      expect(getActivityFactor('light')).toBe(1.375);
      expect(getActivityFactor('moderate')).toBe(1.55);
      expect(getActivityFactor('very')).toBe(1.725);
      expect(getActivityFactor('extra')).toBe(1.9);
    });

    it('should default to sedentary for unknown level', () => {
      expect(getActivityFactor('unknown' as any)).toBe(1.2);
    });
  });

  describe('calculateTDEE', () => {
    it('should multiply BMR by activity factor', () => {
      expect(calculateTDEE(1500, 1.2)).toBe(1800);
      expect(calculateTDEE(1500, 1.55)).toBe(2325);
      expect(calculateTDEE(1649, 1.375)).toBe(2267);
    });
  });

  describe('calculateTargetCalories', () => {
    it('should return undefined for no goal', () => {
      expect(calculateTargetCalories(2000, undefined)).toBeUndefined();
    });

    it('should return same TDEE for maintain', () => {
      expect(calculateTargetCalories(2000, 'maintain')).toBe(2000);
    });

    it('should subtract 500 for lose', () => {
      expect(calculateTargetCalories(2000, 'lose')).toBe(1500);
    });

    it('should add 500 for gain', () => {
      expect(calculateTargetCalories(2000, 'gain')).toBe(2500);
    });
  });

  describe('validateCalorieInput', () => {
    it('should return valid for complete correct input', () => {
      const result = validateCalorieInput({
        sex: 'male',
        age: 30,
        weight: 70,
        height: 175,
        activityLevel: 'moderate',
        goal: 'maintain',
      });
      expect(result.valid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should reject missing sex', () => {
      const result = validateCalorieInput({ age: 30, weight: 70, height: 175, activityLevel: 'moderate' });
      expect(result.valid).toBe(false);
      expect(result.errors.sex).toBeDefined();
    });

    it('should reject invalid sex', () => {
      const result = validateCalorieInput({ sex: 'other', age: 30, weight: 70, height: 175, activityLevel: 'moderate' });
      expect(result.valid).toBe(false);
      expect(result.errors.sex).toBeDefined();
    });

    it('should reject age below minimum', () => {
      const result = validateCalorieInput({ sex: 'male', age: 10, weight: 70, height: 175, activityLevel: 'moderate' });
      expect(result.valid).toBe(false);
      expect(result.errors.age).toContain('15 e 100');
    });

    it('should reject age above maximum', () => {
      const result = validateCalorieInput({ sex: 'male', age: 120, weight: 70, height: 175, activityLevel: 'moderate' });
      expect(result.valid).toBe(false);
      expect(result.errors.age).toContain('15 e 100');
    });

    it('should reject weight below minimum', () => {
      const result = validateCalorieInput({ sex: 'male', age: 30, weight: 15, height: 175, activityLevel: 'moderate' });
      expect(result.valid).toBe(false);
      expect(result.errors.weight).toContain('20 e 300');
    });

    it('should reject height below minimum', () => {
      const result = validateCalorieInput({ sex: 'male', age: 30, weight: 70, height: 80, activityLevel: 'moderate' });
      expect(result.valid).toBe(false);
      expect(result.errors.height).toContain('100 e 250');
    });

    it('should reject invalid activity level', () => {
      const result = validateCalorieInput({ sex: 'male', age: 30, weight: 70, height: 175, activityLevel: 'super-active' });
      expect(result.valid).toBe(false);
      expect(result.errors.activityLevel).toBeDefined();
    });

    it('should reject invalid goal', () => {
      const result = validateCalorieInput({ sex: 'male', age: 30, weight: 70, height: 175, activityLevel: 'moderate', goal: 'extreme' });
      expect(result.valid).toBe(false);
      expect(result.errors.goal).toBeDefined();
    });

    it('should accept valid optional goal values', () => {
      ['maintain', 'lose', 'gain'].forEach(goal => {
        const result = validateCalorieInput({ sex: 'male', age: 30, weight: 70, height: 175, activityLevel: 'moderate', goal });
        expect(result.valid).toBe(true);
      });
    });

    it('should accept empty goal', () => {
      const result = validateCalorieInput({ sex: 'male', age: 30, weight: 70, height: 175, activityLevel: 'moderate', goal: '' });
      expect(result.valid).toBe(true);
    });
  });

  describe('calculateCalorieResult (integration)', () => {
    it('should return complete result for male', () => {
      const result = calculateCalorieResult({
        sex: 'male',
        age: 30,
        weight: 70,
        height: 175,
        activityLevel: 'moderate',
        goal: 'maintain',
      });

      expect(result.sex).toBe('male');
      expect(result.age).toBe(30);
      expect(result.weight).toBe(70);
      expect(result.height).toBe(175);
      expect(result.activityLevel).toBe('moderate');
      expect(result.activityFactor).toBe(1.55);
      expect(result.bmr).toBe(1649);
      expect(result.tdee).toBe(2556);
      expect(result.targetCalories).toBe(2556);
      expect(result.goal).toBe('maintain');
      expect(result.limitations.length).toBeGreaterThan(0);
    });

    it('should return complete result for female with lose goal', () => {
      const result = calculateCalorieResult({
        sex: 'female',
        age: 25,
        weight: 60,
        height: 165,
        activityLevel: 'light',
        goal: 'lose',
      });

      expect(result.sex).toBe('female');
      expect(result.bmr).toBe(1345);
      expect(result.tdee).toBe(1849);
      expect(result.targetCalories).toBe(1349);
      expect(result.goal).toBe('lose');
    });

    it('should return complete result with gain goal', () => {
      const result = calculateCalorieResult({
        sex: 'male',
        age: 20,
        weight: 75,
        height: 180,
        activityLevel: 'very',
        goal: 'gain',
      });

      expect(result.targetCalories).toBeGreaterThan(result.tdee);
      expect(result.targetCalories).toBe(result.tdee + 500);
    });

    it('should not include targetCalories when no goal', () => {
      const result = calculateCalorieResult({
        sex: 'male',
        age: 30,
        weight: 70,
        height: 175,
        activityLevel: 'moderate',
      });

      expect(result.targetCalories).toBeUndefined();
      expect(result.goal).toBeUndefined();
    });

    it('should include all limitations', () => {
      const result = calculateCalorieResult({
        sex: 'male',
        age: 30,
        weight: 70,
        height: 175,
        activityLevel: 'moderate',
      });

      const limitations = result.limitations;
      expect(limitations.some(l => l.includes('10%'))).toBe(true);
      expect(limitations.some(l => l.includes('crianças'))).toBe(true);
      expect(limitations.some(l => l.includes('gestantes'))).toBe(true);
      expect(limitations.some(l => l.includes('Idosos'))).toBe(true);
      expect(limitations.some(l => l.includes('Obesidade mórbida'))).toBe(true);
      expect(limitations.some(l => l.includes('avaliação nutricional'))).toBe(true);
      expect(limitations.some(l => l.includes('agressivos'))).toBe(true);
    });
  });

  describe('Known reference values', () => {
    it('should match known Mifflin-St Jeor reference', () => {
      // Reference: Male, 70kg, 175cm, 30y -> BMR ~1649
      // Female, 60kg, 165cm, 25y -> BMR ~1345
      expect(calculateBMR('male', 70, 175, 30)).toBe(1649);
      expect(calculateBMR('female', 60, 165, 25)).toBe(1345);
    });

    it('should produce reasonable TDEE values', () => {
      const bmr = calculateBMR('male', 70, 175, 30); // 1649
      const sedentary = calculateTDEE(bmr, 1.2); // 1979
      const moderate = calculateTDEE(bmr, 1.55); // 2556
      const very = calculateTDEE(bmr, 1.725); // 2845

      expect(sedentary).toBe(1979);
      expect(moderate).toBe(2556);
      expect(very).toBe(2845);
    });
  });
});
