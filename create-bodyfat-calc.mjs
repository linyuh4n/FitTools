import fs from "fs";

// Body Fat Calculator
const bodyFatCalc = `export interface BodyFatInput {
  sex: "male" | "female";
  age: number;
  heightCm: number;
  weightKg: number;
  // Navy method (circumference measurements in cm)
  neckCm?: number;
  waistCm?: number;
  hipCm?: number; // female only
  // Jackson-Pollock 3-site (skinfold mm)
  chestMm?: number;
  abdomenMm?: number;
  thighMm?: number;
  tricepsMm?: number;
  suprailiacMm?: number;
  // Jackson-Pollock 7-site
  axillaMm?: number;
  subscapularMm?: number;
}

export interface BodyFatResult {
  method: "navy" | "jackson-pollock-3" | "jackson-pollock-7" | "bmi-based";
  bodyFatPercent: number;
  bodyFatCategory: string;
  fatMassKg: number;
  leanMassKg: number;
  bmi: number;
  // Health indicators
  essentialFatPercent: number;
  athleteRange: string;
  fitnessRange: string;
  averageRange: string;
  obeseThreshold: number;
  // Ideal weight estimates
  idealWeightRange: { min: number; max: number };
  // Lean mass index
  lmi: number; // Lean Mass Index (lean mass / height^2)
}

// Navy Method (US Navy circumference method)
export function calculateNavyBodyFat(input: BodyFatInput): number {
  const { sex, heightCm, neckCm, waistCm, hipCm } = input;
  
  if (!neckCm || !waistCm) throw new Error("Pescoço e cintura são obrigatórios para método Navy");
  if (sex === "female" && !hipCm) throw new Error("Quadril é obrigatório para mulheres no método Navy");
  
  // Convert cm to inches for formula
  const heightIn = heightCm / 2.54;
  const neckIn = neckCm / 2.54;
  const waistIn = waistCm / 2.54;
  
  let bodyFat: number;
  
  if (sex === "male") {
    // Men: %BF = 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450
    const logTerm = Math.log10(waistIn - neckIn);
    const heightTerm = Math.log10(heightIn);
    bodyFat = 495 / (1.0324 - 0.19077 * logTerm + 0.15456 * heightTerm) - 450;
  } else {
    // Women: %BF = 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height)) - 450
    if (!hipCm) throw new Error("Quadril obrigatório para mulheres");
    const hipIn = hipCm / 2.54;
    const logTerm = Math.log10(waistIn + hipIn - neckIn);
    const heightTerm = Math.log10(heightIn);
    bodyFat = 495 / (1.29579 - 0.35004 * logTerm + 0.22100 * heightTerm) - 450;
  }
  
  return Math.max(2, Math.min(50, Math.round(bodyFat * 10) / 10)); // clamp 2-50%
}

// Jackson-Pollock 3-site skinfold
export function calculateJacksonPollock3(input: BodyFatInput): number {
  const { sex, age, chestMm, abdomenMm, thighMm, tricepsMm, suprailiacMm } = input;
  
  // Need 3 sites - chest/abdomen/thigh for men, triceps/suprailiac/thigh for women
  let sumSkinfolds: number;
  
  if (sex === "male") {
    if (!chestMm || !abdomenMm || !thighMm) {
      throw new Error("Homens: peitoral, abdominal e coxa são obrigatórios (3 dobras)");
    }
    sumSkinfolds = chestMm + abdomenMm + thighMm;
    // Density = 1.10938 - 0.0008267 × sum + 0.0000016 × sum² - 0.0002574 × age
    const density = 1.10938 - 0.0008267 * sumSkinfolds + 0.0000016 * sumSkinfolds * sumSkinfolds - 0.0002574 * age;
    return Math.max(2, Math.min(50, Math.round((495 / density - 450) * 10) / 10));
  } else {
    if (!tricepsMm || !suprailiacMm || !thighMm) {
      throw new Error("Mulheres: tríceps, supra-ilíaca e coxa são obrigatórios (3 dobras)");
    }
    sumSkinfolds = tricepsMm + suprailiacMm + thighMm;
    // Density = 1.0994921 - 0.0009929 × sum + 0.0000023 × sum² - 0.0001392 × age
    const density = 1.0994921 - 0.0009929 * sumSkinfolds + 0.0000023 * sumSkinfolds * sumSkinfolds - 0.0001392 * age;
    return Math.max(2, Math.min(50, Math.round((495 / density - 450) * 10) / 10));
  }
}

// Jackson-Pollock 7-site skinfold
export function calculateJacksonPollock7(input: BodyFatInput): number {
  const { sex, age, chestMm, abdomenMm, thighMm, tricepsMm, suprailiacMm, axillaMm, subscapularMm } = input;
  
  if (!chestMm || !abdomenMm || !thighMm || !tricepsMm || !suprailiacMm || !axillaMm || !subscapularMm) {
    throw new Error("Todos os 7 locais são obrigatórios: peitoral, abdominal, coxa, tríceps, supra-ilíaca, axilar, subescapular");
  }
  
  const sumSkinfolds = chestMm + abdomenMm + thighMm + tricepsMm + suprailiacMm + axillaMm + subscapularMm;
  
  let density: number;
  if (sex === "male") {
    // Men 7-site: Density = 1.112 - 0.00043499 × sum + 0.00000055 × sum² - 0.00028826 × age
    density = 1.112 - 0.00043499 * sumSkinfolds + 0.00000055 * sumSkinfolds * sumSkinfolds - 0.00028826 * age;
  } else {
    // Women 7-site: Density = 1.097 - 0.00046971 × sum + 0.00000056 × sum² - 0.00012828 × age
    density = 1.097 - 0.00046971 * sumSkinfolds + 0.00000056 * sumSkinfolds * sumSkinfolds - 0.00012828 * age;
  }
  
  return Math.max(2, Math.min(50, Math.round((495 / density - 450) * 10) / 10));
}

// BMI-based estimation (least accurate, but no measurements needed)
export function calculateBMIBasedBodyFat(input: BodyFatInput): number {
  const { sex, age, weightKg, heightCm } = input;
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  
  // Deurenberg formula
  // Adults: %BF = 1.20 × BMI + 0.23 × age - 10.8 × sex - 5.4
  // sex: 1 = male, 0 = female
  const sexValue = sex === "male" ? 1 : 0;
  const bodyFat = 1.20 * bmi + 0.23 * age - 10.8 * sexValue - 5.4;
  
  return Math.max(2, Math.min(50, Math.round(bodyFat * 10) / 10));
}

// Categories based on ACSM/ACE
export function getBodyFatCategory(sex: "male" | "female", percent: number): string {
  if (sex === "male") {
    if (percent < 6) return "Gordura essencial (muito baixo)";
    if (percent < 14) return "Atleta";
    if (percent < 18) return "Fitness";
    if (percent < 25) return "Médio";
    return "Obesidade";
  } else {
    if (percent < 14) return "Gordura essencial (muito baixo)";
    if (percent < 21) return "Atleta";
    if (percent < 25) return "Fitness";
    if (percent < 32) return "Médio";
    return "Obesidade";
  }
}

export function getReferenceRanges(sex: "male" | "female") {
  if (sex === "male") {
    return {
      essentialFatPercent: 2,
      athleteRange: "6–13%",
      fitnessRange: "14–17%",
      averageRange: "18–24%",
      obeseThreshold: 25,
    };
  } else {
    return {
      essentialFatPercent: 10,
      athleteRange: "14–20%",
      fitnessRange: "21–24%",
      averageRange: "25–31%",
      obeseThreshold: 32,
    };
  }
}

export function calculateIdealWeightRange(heightCm: number, sex: "male" | "female"): { min: number; max: number } {
  const heightM = heightCm / 100;
  // Based on healthy BMI range 18.5-24.9 with body fat in healthy range
  // This is approximate - ideal weight depends on body composition goals
  if (sex === "male") {
    // Men: target ~15% body fat, BMI ~21-23
    return { min: Math.round(21 * heightM * heightM), max: Math.round(23 * heightM * heightM) };
  } else {
    // Women: target ~22% body fat, BMI ~20-22
    return { min: Math.round(20 * heightM * heightM), max: Math.round(22 * heightM * heightM) };
  }
}

export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  // Validate basic inputs
  if (input.age < 10 || input.age > 100) throw new Error("Idade deve estar entre 10 e 100 anos");
  if (input.heightCm < 100 || input.heightCm > 250) throw new Error("Altura deve estar entre 100 e 250 cm");
  if (input.weightKg < 30 || input.weightKg > 300) throw new Error("Peso deve estar entre 30 e 300 kg");
  
  const bmi = Math.round((input.weightKg / Math.pow(input.heightCm / 100, 2)) * 10) / 10;
  
  // Try methods in order of accuracy (if measurements provided)
  let bodyFatPercent: number;
  let method: BodyFatResult["method"] = "bmi-based";
  
  if (input.neckCm && input.waistCm && (input.sex === "male" || input.hipCm)) {
    bodyFatPercent = calculateNavyBodyFat(input);
    method = "navy";
  } else if (input.chestMm && input.abdomenMm && input.thighMm && input.sex === "male") {
    bodyFatPercent = calculateJacksonPollock3(input);
    method = "jackson-pollock-3";
  } else if (input.tricepsMm && input.suprailiacMm && input.thighMm && input.sex === "female") {
    bodyFatPercent = calculateJacksonPollock3(input);
    method = "jackson-pollock-3";
  } else if (input.chestMm && input.abdomenMm && input.thighMm && input.tricepsMm && 
             input.suprailiacMm && input.axillaMm && input.subscapularMm) {
    bodyFatPercent = calculateJacksonPollock7(input);
    method = "jackson-pollock-7";
  } else {
    bodyFatPercent = calculateBMIBasedBodyFat(input);
    method = "bmi-based";
  }
  
  const fatMassKg = Math.round(input.weightKg * (bodyFatPercent / 100) * 10) / 10;
  const leanMassKg = Math.round((input.weightKg - fatMassKg) * 10) / 10;
  const lmi = Math.round((leanMassKg / Math.pow(input.heightCm / 100, 2)) * 10) / 10;
  const category = getBodyFatCategory(input.sex, bodyFatPercent);
  const ranges = getReferenceRanges(input.sex);
  const idealWeight = calculateIdealWeightRange(input.heightCm, input.sex);
  
  return {
    method,
    bodyFatPercent,
    bodyFatCategory: category,
    fatMassKg,
    leanMassKg,
    bmi,
    essentialFatPercent: ranges.essentialFatPercent,
    athleteRange: ranges.athleteRange,
    fitnessRange: ranges.fitnessRange,
    averageRange: ranges.averageRange,
    obeseThreshold: ranges.obeseThreshold,
    idealWeightRange: idealWeight,
    lmi,
  };
}
`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\lib\\\\calculations\\\\bodyfat-calculator.ts", bodyFatCalc, "utf8");
console.log("Created bodyfat-calculator.ts");
