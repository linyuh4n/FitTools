import { describe, it, expect } from "vitest";
import { calculateMacros } from "@/lib/calculations/macro-calculator";

describe("Macro Calculator", () => {
  const baseInput = {
    weightKg: 80,
    heightCm: 180,
    age: 30,
    sex: "male" as const,
    activityLevel: "moderate" as const,
    goal: "maintain" as const,
  };

  it("calculates macros for maintenance", () => {
    const result = calculateMacros(baseInput);
    
    // BMR for 80kg, 180cm, 30yo male = 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
    expect(result.bmr).toBe(1780);
    
    // TDEE = 1780 * 1.55 = 2759
    expect(result.tdee).toBe(2759);
    
    // Target = TDEE (maintain)
    expect(result.targetCalories).toBe(2759);
    
    // Protein: 80kg * 1.6 = 128g
    expect(result.protein.grams).toBe(128);
    expect(result.protein.calories).toBe(512);
    
    // Fat: 25% of 2759 = 690 cal = 77g
    expect(result.fat.grams).toBe(77);
    
    // Carbs: remainder
    expect(result.carbs.grams).toBeGreaterThan(0);
  });

  it("calculates macros for weight loss (cutting)", () => {
    const result = calculateMacros({ ...baseInput, goal: "lose" });
    
    // Target = TDEE * 0.8 = 2759 * 0.8 = 2207
    expect(result.targetCalories).toBe(2207);
    
    // Protein higher for cutting: 80 * 2.0 = 160g
    expect(result.protein.grams).toBe(160);
  });

  it("calculates macros for weight gain (bulking)", () => {
    const result = calculateMacros({ ...baseInput, goal: "gain" });
    
    // Target = TDEE * 1.1 = 2759 * 1.1 = 3035
    expect(result.targetCalories).toBe(3035);
    
    // Protein: 80 * 1.8 = 144g
    expect(result.protein.grams).toBe(144);
  });

  it("calculates for female", () => {
    const result = calculateMacros({ ...baseInput, sex: "female", weightKg: 65, heightCm: 165 });
    
    // BMR female: 10*65 + 6.25*165 - 5*30 - 161 = 650 + 1031.25 - 150 - 161 = 1370.25 -> 1370
    expect(result.bmr).toBe(1370);
  });

  it("allows custom protein per kg", () => {
    const result = calculateMacros({ ...baseInput, proteinPerKg: 2.2 });
    expect(result.protein.grams).toBe(176); // 80 * 2.2
  });

  it("allows custom fat percentage", () => {
    const result = calculateMacros({ ...baseInput, fatPercent: 0.3 });
    // 30% of 2759 = 828 cal = 92g
    expect(result.fat.grams).toBe(92);
  });

  it("throws on invalid weight", () => {
    expect(() => calculateMacros({ ...baseInput, weightKg: 0 })).toThrow("Peso deve estar entre 0.1 e 300 kg");
    expect(() => calculateMacros({ ...baseInput, weightKg: 400 })).toThrow("Peso deve estar entre 0.1 e 300 kg");
  });

  it("throws on invalid height", () => {
    expect(() => calculateMacros({ ...baseInput, heightCm: 0 })).toThrow("Altura deve estar entre 1 e 250 cm");
    expect(() => calculateMacros({ ...baseInput, heightCm: 300 })).toThrow("Altura deve estar entre 1 e 250 cm");
  });

  it("throws on invalid age", () => {
    expect(() => calculateMacros({ ...baseInput, age: 5 })).toThrow("Idade deve estar entre 10 e 100 anos");
    expect(() => calculateMacros({ ...baseInput, age: 120 })).toThrow("Idade deve estar entre 10 e 100 anos");
  });

  it("percentages sum to approximately 100%", () => {
    const result = calculateMacros(baseInput);
    const totalPercent = result.protein.percent + result.fat.percent + result.carbs.percent;
    expect(totalPercent).toBeGreaterThanOrEqual(98);
    expect(totalPercent).toBeLessThanOrEqual(102);
  });
});
