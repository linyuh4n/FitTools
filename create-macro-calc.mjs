import fs from "fs";

// Macronutrient Calculator
const macroCalc = `export interface MacroInput {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: "male" | "female";
  activityLevel: "sedentary" | "light" | "moderate" | "very" | "extra";
  goal: "maintain" | "lose" | "gain";
  proteinPerKg?: number; // g/kg, default based on goal
  fatPercent?: number; // % of calories, default 25%
}

export interface MacroResult {
  tdee: number;
  targetCalories: number;
  protein: { grams: number; calories: number; percent: number };
  fat: { grams: number; calories: number; percent: number };
  carbs: { grams: number; calories: number; percent: number };
  bmr: number;
}

const ACTIVITY_FACTORS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

const GOAL_ADJUSTMENTS = {
  maintain: 0,
  lose: -0.2, // 20% deficit
  gain: 0.1,  // 10% surplus
};

const DEFAULT_PROTEIN_PER_KG = {
  maintain: 1.6,
  lose: 2.0,  // higher to preserve muscle
  gain: 1.8,
};

const DEFAULT_FAT_PERCENT = 0.25; // 25% of calories

export function calculateMacros(input: MacroInput): MacroResult {
  // Validate inputs
  if (input.weightKg <= 0 || input.weightKg > 300) {
    throw new Error("Peso deve estar entre 0.1 e 300 kg");
  }
  if (input.heightCm <= 0 || input.heightCm > 250) {
    throw new Error("Altura deve estar entre 1 e 250 cm");
  }
  if (input.age < 10 || input.age > 100) {
    throw new Error("Idade deve estar entre 10 e 100 anos");
  }

  // Mifflin-St Jeor BMR
  const weight = input.weightKg;
  const height = input.heightCm;
  const age = input.age;
  
  let bmr: number;
  if (input.sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // TDEE
  const activityFactor = ACTIVITY_FACTORS[input.activityLevel];
  const tdee = Math.round(bmr * activityFactor);

  // Goal adjustment
  const goalAdjustment = GOAL_ADJUSTMENTS[input.goal];
  const targetCalories = Math.round(tdee * (1 + goalAdjustment));

  // Protein (g/kg based on goal)
  const proteinPerKg = input.proteinPerKg ?? DEFAULT_PROTEIN_PER_KG[input.goal];
  const proteinGrams = Math.round(weight * proteinPerKg);
  const proteinCalories = proteinGrams * 4;

  // Fat (% of calories)
  const fatPercent = input.fatPercent ?? DEFAULT_FAT_PERCENT;
  const fatCalories = Math.round(targetCalories * fatPercent);
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs (remainder)
  const carbCalories = targetCalories - proteinCalories - fatCalories;
  const carbGrams = Math.max(0, Math.round(carbCalories / 4));

  // Recalculate percentages based on actual grams
  const actualProteinCalories = proteinGrams * 4;
  const actualFatCalories = fatGrams * 9;
  const actualCarbCalories = carbGrams * 4;
  const actualTotal = actualProteinCalories + actualFatCalories + actualCarbCalories;

  return {
    tdee,
    targetCalories,
    bmr: Math.round(bmr),
    protein: {
      grams: proteinGrams,
      calories: actualProteinCalories,
      percent: Math.round((actualProteinCalories / actualTotal) * 100),
    },
    fat: {
      grams: fatGrams,
      calories: actualFatCalories,
      percent: Math.round((actualFatCalories / actualTotal) * 100),
    },
    carbs: {
      grams: carbGrams,
      calories: actualCarbCalories,
      percent: Math.round((actualCarbCalories / actualTotal) * 100),
    },
  };
}
`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\lib\\\\calculations\\\\macro-calculator.ts", macroCalc, "utf8");
console.log("Created macro-calculator.ts");
