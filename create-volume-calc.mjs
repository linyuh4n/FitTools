import fs from "fs";

// Training Volume Calculator
const volumeCalc = `export interface VolumeInput {
  // Per exercise
  sets: number;
  reps: number;
  weightKg: number;
  // Optional: RPE (Rate of Perceived Exertion) 1-10
  rpe?: number;
  // Optional: rest time in minutes
  restMinutes?: number;
}

export interface VolumeResult {
  volumeLoad: number; // sets × reps × weight (kg)
  volumeLoadPerSet: number;
  estimated1RM: number; // Epley formula
  estimated1RMRPE: number; // RPE-based if provided
  totalReps: number;
  tonnage: number; // same as volumeLoad
  // Work capacity estimates
  workKcal: number; // rough mechanical work estimate
  sessionDurationMin: number; // estimated
}

export interface MultiExerciseInput {
  exercises: Array<VolumeInput & { name: string }>;
}

export interface MultiExerciseResult {
  totalVolumeLoad: number;
  totalTonnage: number;
  totalReps: number;
  totalSets: number;
  exercises: Array<VolumeResult & { name: string }>;
  estimatedSessionDurationMin: number;
  estimatedWorkKcal: number;
}

// Epley formula: 1RM = weight × (1 + reps/30)
export function calculate1RM(weightKg: number, reps: number): number {
  if (reps <= 0) return weightKg;
  if (reps >= 30) return weightKg; // cap
  return Math.round(weightKg * (1 + reps / 30) * 10) / 10;
}

// RPE-based 1RM estimation (Mike Tuchscherer / RTS)
// RPE 10 = 0 reps in reserve, RPE 9 = 1 RIR, etc.
// Approximate: 1RM = weight / (1.0278 - 0.0278 × reps) for RPE 10
// Adjusted for RPE: each RPE point ≈ 2.5% load difference
export function calculate1RMFromRPE(weightKg: number, reps: number, rpe: number): number {
  if (rpe < 1 || rpe > 10) return calculate1RM(weightKg, reps);
  
  // RPE 10 = max effort, use Epley
  if (rpe >= 10) return calculate1RM(weightKg, reps);
  
  // Adjust weight up based on RIR (Reps In Reserve)
  // RIR = 10 - RPE
  // Each RIR ≈ 2.5-3% less than max
  const rir = 10 - rpe;
  const adjustment = 1 + rir * 0.025; // ~2.5% per RIR
  return Math.round(calculate1RM(weightKg, reps) * adjustment * 10) / 10;
}

// Mechanical work approximation: Work = Force × Distance
// Force = weight × 9.81 (gravity)
// Distance ≈ 0.5m per rep (rough average for compound movements)
// This is very rough - real work depends on ROM, leverage, etc.
export function estimateWorkKcal(sets: number, reps: number, weightKg: number): number {
  const totalReps = sets * reps;
  const forceN = weightKg * 9.81;
  const distanceM = 0.5; // meters per rep (rough average)
  const workJoules = totalReps * forceN * distanceM;
  const workKcal = workJoules / 4184; // 1 kcal = 4184 J
  return Math.round(workKcal * 10) / 10;
}

export function calculateVolume(input: VolumeInput): VolumeResult {
  // Validate
  if (input.sets <= 0 || input.sets > 50) throw new Error("Séries deve estar entre 1 e 50");
  if (input.reps <= 0 || input.reps > 100) throw new Error("Repetições deve estar entre 1 e 100");
  if (input.weightKg < 0 || input.weightKg > 500) throw new Error("Peso deve estar entre 0 e 500 kg");
  if (input.rpe !== undefined && (input.rpe < 1 || input.rpe > 10)) throw new Error("RPE deve estar entre 1 e 10");
  if (input.restMinutes !== undefined && (input.restMinutes < 0 || input.restMinutes > 30)) throw new Error("Descanso deve estar entre 0 e 30 min");

  const volumeLoad = input.sets * input.reps * input.weightKg;
  const estimated1RM = calculate1RM(input.weightKg, input.reps);
  const estimated1RMRPE = input.rpe ? calculate1RMFromRPE(input.weightKg, input.reps, input.rpe) : estimated1RM;
  const totalReps = input.sets * input.reps;
  const workKcal = estimateWorkKcal(input.sets, input.reps, input.weightKg);
  
  // Session duration: set time + rest time
  // ~30-45s per set + rest
  const setTimeMin = input.sets * 0.75; // 45s per set
  const restTimeMin = input.restMinutes ? input.sets * input.restMinutes : input.sets * 2; // default 2min rest
  const sessionDurationMin = Math.round(setTimeMin + restTimeMin);

  return {
    volumeLoad: Math.round(volumeLoad),
    volumeLoadPerSet: Math.round(input.reps * input.weightKg),
    estimated1RM,
    estimated1RMRPE,
    totalReps,
    tonnage: Math.round(volumeLoad),
    workKcal,
    sessionDurationMin,
  };
}

export function calculateMultiExerciseVolume(input: MultiExerciseInput): MultiExerciseResult {
  const exercises = input.exercises.map((ex) => ({
    name: ex.name,
    ...calculateVolume(ex),
  }));

  const totalVolumeLoad = exercises.reduce((sum, ex) => sum + ex.volumeLoad, 0);
  const totalTonnage = exercises.reduce((sum, ex) => sum + ex.tonnage, 0);
  const totalReps = exercises.reduce((sum, ex) => sum + ex.totalReps, 0);
  const totalSets = exercises.reduce((sum, ex) => sum + (ex.sets || 0), 0);
  const estimatedWorkKcal = exercises.reduce((sum, ex) => sum + ex.workKcal, 0);
  const estimatedSessionDurationMin = exercises.reduce((sum, ex) => sum + ex.sessionDurationMin, 0);

  return {
    totalVolumeLoad,
    totalTonnage,
    totalReps,
    totalSets,
    exercises,
    estimatedSessionDurationMin,
    estimatedWorkKcal,
  };
}
`;

fs.writeFileSync("D:\\\\Projetos\\\\FitTools\\\\src\\\\lib\\\\calculations\\\\volume-calculator.ts", volumeCalc, "utf8");
console.log("Created volume-calculator.ts");
