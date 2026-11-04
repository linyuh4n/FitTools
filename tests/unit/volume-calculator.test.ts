import { describe, it, expect } from "vitest";
import { calculateVolume, calculate1RM, calculate1RMFromRPE, calculateMultiExerciseVolume } from "@/lib/calculations/volume-calculator";

describe("Volume Calculator", () => {
  const baseInput = {
    sets: 3,
    reps: 10,
    weightKg: 100,
  };

  it("calculates volume load correctly", () => {
    const result = calculateVolume(baseInput);
    // 3 sets × 10 reps × 100kg = 3000
    expect(result.volumeLoad).toBe(3000);
    expect(result.tonnage).toBe(3000);
    expect(result.totalReps).toBe(30);
  });

  it("calculates 1RM using Epley formula", () => {
    // 1RM = weight × (1 + reps/30)
    // 100kg × (1 + 10/30) = 100 × 1.333 = 133.3
    expect(calculate1RM(100, 10)).toBe(133.3);
    expect(calculate1RM(100, 5)).toBe(116.7); // 100 * (1 + 5/30) = 116.67
    expect(calculate1RM(100, 1)).toBe(103.3); // 100 * (1 + 1/30) = 103.33
  });

  it("calculates 1RM from RPE", () => {
    // RPE 10 = same as Epley
    expect(calculate1RMFromRPE(100, 10, 10)).toBe(133.3);
    
    // RPE 9 = 1 RIR, ~2.5% higher
    expect(calculate1RMFromRPE(100, 10, 9)).toBeGreaterThan(133.3);
    
    // RPE 8 = 2 RIR, ~5% higher
    expect(calculate1RMFromRPE(100, 10, 8)).toBeGreaterThan(calculate1RMFromRPE(100, 10, 9));
  });

  it("estimates work in kcal", () => {
    const result = calculateVolume(baseInput);
    // Work = 30 reps × 100kg × 9.81 × 0.5m = 14715 J = 3.5 kcal
    expect(result.workKcal).toBeGreaterThan(0);
  });

  it("estimates session duration", () => {
    const result = calculateVolume({ ...baseInput, restMinutes: 2 });
    // 3 sets × (0.75 + 2) = 8.25 min -> 8 min
    expect(result.sessionDurationMin).toBeGreaterThan(0);
  });

  it("throws on invalid sets", () => {
    expect(() => calculateVolume({ ...baseInput, sets: 0 })).toThrow("Séries deve estar entre 1 e 50");
    expect(() => calculateVolume({ ...baseInput, sets: 51 })).toThrow("Séries deve estar entre 1 e 50");
  });

  it("throws on invalid reps", () => {
    expect(() => calculateVolume({ ...baseInput, reps: 0 })).toThrow("Repetições deve estar entre 1 e 100");
    expect(() => calculateVolume({ ...baseInput, reps: 101 })).toThrow("Repetições deve estar entre 1 e 100");
  });

  it("throws on invalid weight", () => {
    expect(() => calculateVolume({ ...baseInput, weightKg: -1 })).toThrow("Peso deve estar entre 0 e 500 kg");
    expect(() => calculateVolume({ ...baseInput, weightKg: 600 })).toThrow("Peso deve estar entre 0 e 500 kg");
  });

  it("throws on invalid RPE", () => {
    expect(() => calculateVolume({ ...baseInput, rpe: 0 })).toThrow("RPE deve estar entre 1 e 10");
    expect(() => calculateVolume({ ...baseInput, rpe: 11 })).toThrow("RPE deve estar entre 1 e 10");
  });

  it("calculates multi-exercise volume", () => {
    const exercises = [
      { name: "Supino", sets: 3, reps: 10, weightKg: 80 },
      { name: "Agachamento", sets: 4, reps: 8, weightKg: 120 },
      { name: "Remada", sets: 3, reps: 12, weightKg: 60 },
    ];
    
    const result = calculateMultiExerciseVolume({ exercises });

    expect(result.totalSets).toBe(10);
    expect(result.totalVolumeLoad).toBe(3*10*80 + 4*8*120 + 3*12*60); // 2400 + 3840 + 2160 = 8400
    expect(result.exercises.length).toBe(3);
    expect(result.estimatedWorkKcal).toBeGreaterThan(0);
    expect(result.estimatedSessionDurationMin).toBeGreaterThan(0);
  });
});
