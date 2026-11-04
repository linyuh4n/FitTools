export interface ProteinCalculatorInput {
  weight: number;
  goal: 'health' | 'active' | 'hypertrophy';
  dietPreference: 'omnivore' | 'vegetarian' | 'vegan';
  mealsPerDay?: number;
}

export interface ProteinCalculatorResult {
  weight: number;
  goal: ProteinCalculatorInput['goal'];
  dietPreference: ProteinCalculatorInput['dietPreference'];
  range: { min: number; max: number };
  minGramsPerDay: number;
  maxGramsPerDay: number;
  averageGramsPerDay: number;
  perMeal?: number;
  mealsPerDay?: number;
  foods: FoodItem[];
  references: string[];
}

export interface BMICalculatorInput {
  weight: number;
  height: number;
}

export interface BMICalculatorResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obesity';
  categoryLabel: string;
  weight: number;
  height: number;
  limitations: string[];
}

export interface CalorieCalculatorInput {
  sex: 'male' | 'female';
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal?: 'maintain' | 'lose' | 'gain';
}

export interface CalorieCalculatorResult {
  bmr: number;
  tdee: number;
  targetCalories?: number;
  sex: CalorieCalculatorInput['sex'];
  age: number;
  weight: number;
  height: number;
  activityLevel: CalorieCalculatorInput['activityLevel'];
  activityFactor: number;
  goal?: CalorieCalculatorInput['goal'];
  limitations: string[];
}

export interface FoodItem {
  name: string;
  proteinPer100g: number;
  servingSize: number;
  servingUnit: string;
  state: 'raw' | 'cooked' | 'drained' | 'prepared';
  category: string;
  source: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  category: 'nutrition' | 'training' | 'health';
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  content: string;
  references: string[];
  relatedTools: string[];
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: Record<string, unknown>;
}
