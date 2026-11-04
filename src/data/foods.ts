import type { FoodItem } from '@/types';

// Dados baseados na Tabela Brasileira de Composicao de Alimentos (TACO) e TBCA
// Valores de proteina por 100g do alimento no estado especificado

export const foodDatabase: FoodItem[] = [
  // Leguminosas (cozidas)
  {
    name: 'Lentilha',
    proteinPer100g: 9.1,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Leguminosas',
    source: 'TACO 4a ed. - Lentilha cozida',
  },
  {
    name: 'Grao-de-bico',
    proteinPer100g: 8.9,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Leguminosas',
    source: 'TACO 4a ed. - Grao-de-bico cozido',
  },
  {
    name: 'Feijao carioca',
    proteinPer100g: 8.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Leguminosas',
    source: 'TACO 4a ed. - Feijao carioca cozido',
  },
  {
    name: 'Feijao preto',
    proteinPer100g: 8.4,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Leguminosas',
    source: 'TACO 4a ed. - Feijao preto cozido',
  },
  {
    name: 'Soja (grao cozido)',
    proteinPer100g: 12.4,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Leguminosas',
    source: 'TACO 4a ed. - Soja cozida',
  },
  {
    name: 'Ervilha',
    proteinPer100g: 5.4,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Leguminosas',
    source: 'TACO 4a ed. - Ervilha cozida',
  },

  // Derivados de soja
  {
    name: 'Tofu firme',
    proteinPer100g: 8.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Derivados de soja',
    source: 'TBCA - Tofu firme',
  },
  {
    name: 'Tofu macio',
    proteinPer100g: 6.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Derivados de soja',
    source: 'TBCA - Tofu macio',
  },
  {
    name: 'Tempê',
    proteinPer100g: 19.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Derivados de soja',
    source: 'TBCA - Tempe',
  },
  {
    name: 'Proteina de soja texturizada (PTS)',
    proteinPer100g: 50.0,
    servingSize: 30,
    servingUnit: 'g',
    state: 'seco',
    category: 'Derivados de soja',
    source: 'TBCA - PTS hidratada',
  },

  // Ovos e laticinios
  {
    name: 'Ovo de galinha (inteiro)',
    proteinPer100g: 13.0,
    servingSize: 50,
    servingUnit: 'g',
    state: 'cru',
    category: 'Ovos',
    source: 'TACO 4a ed. - Ovo de galinha cru',
  },
  {
    name: 'Clara de ovo',
    proteinPer100g: 11.0,
    servingSize: 30,
    servingUnit: 'g',
    state: 'cru',
    category: 'Ovos',
    source: 'TACO 4a ed. - Clara de ovo crua',
  },
  {
    name: 'Leite integral',
    proteinPer100g: 3.2,
    servingSize: 200,
    servingUnit: 'ml',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TACO 4a ed. - Leite integral',
  },
  {
    name: 'Leite desnatado',
    proteinPer100g: 3.4,
    servingSize: 200,
    servingUnit: 'ml',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TACO 4a ed. - Leite desnatado',
  },
  {
    name: 'Iogurte natural integral',
    proteinPer100g: 4.5,
    servingSize: 170,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TACO 4a ed. - Iogurte natural',
  },
  {
    name: 'Iogurte grego natural',
    proteinPer100g: 10.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TBCA - Iogurte grego',
  },
  {
    name: 'Queijo minas frescal',
    proteinPer100g: 17.0,
    servingSize: 30,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TACO 4a ed. - Queijo minas frescal',
  },
  {
    name: 'Queijo cottage',
    proteinPer100g: 12.0,
    servingSize: 50,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TBCA - Queijo cottage',
  },
  {
    name: 'Queijo prato',
    proteinPer100g: 22.0,
    servingSize: 30,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TACO 4a ed. - Queijo prato',
  },
  {
    name: 'Ricota',
    proteinPer100g: 11.0,
    servingSize: 50,
    servingUnit: 'g',
    state: 'preparado',
    category: 'Laticinios',
    source: 'TACO 4a ed. - Ricota',
  },

  // Carnes e peixes (para onivoros)
  {
    name: 'Peito de frango (cozido)',
    proteinPer100g: 32.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Carnes',
    source: 'TACO 4a ed. - Peito de frango cozido',
  },
  {
    name: 'Patinho (cozido)',
    proteinPer100g: 32.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Carnes',
    source: 'TACO 4a ed. - Patinho cozido',
  },
  {
    name: 'Salmao (cozido)',
    proteinPer100g: 25.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Peixes',
    source: 'TACO 4a ed. - Salmao cozido',
  },
  {
    name: 'Atum (em agua, drenado)',
    proteinPer100g: 26.0,
    servingSize: 100,
    servingUnit: 'g',
    state: 'drenado',
    category: 'Peixes',
    source: 'TACO 4a ed. - Atum em agua drenado',
  },
  {
    name: 'Ovo de codorna',
    proteinPer100g: 13.0,
    servingSize: 10,
    servingUnit: 'g',
    state: 'cru',
    category: 'Ovos',
    source: 'TACO 4a ed. - Ovo de codorna',
  },

  // Cereais e pseudocereais
  {
    name: 'Quinoa (cozida)',
    proteinPer100g: 4.4,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Cereais',
    source: 'TBCA - Quinoa cozida',
  },
  {
    name: 'Aveia em flocos',
    proteinPer100g: 13.5,
    servingSize: 40,
    servingUnit: 'g',
    state: 'cru',
    category: 'Cereais',
    source: 'TACO 4a ed. - Aveia em flocos',
  },
  {
    name: 'Arroz integral (cozido)',
    proteinPer100g: 2.6,
    servingSize: 100,
    servingUnit: 'g',
    state: 'cozido',
    category: 'Cereais',
    source: 'TACO 4a ed. - Arroz integral cozido',
  },

  // Oleaginosas e sementes
  {
    name: 'Amendoim',
    proteinPer100g: 25.0,
    servingSize: 30,
    servingUnit: 'g',
    state: 'cru',
    category: 'Oleaginosas',
    source: 'TACO 4a ed. - Amendoim torrado',
  },
  {
    name: 'Castanha de caju',
    proteinPer100g: 18.0,
    servingSize: 30,
    servingUnit: 'g',
    state: 'cru',
    category: 'Oleaginosas',
    source: 'TACO 4a ed. - Castanha de caju torrada',
  },
  {
    name: 'Amendoa',
    proteinPer100g: 21.0,
    servingSize: 30,
    servingUnit: 'g',
    state: 'cru',
    category: 'Oleaginosas',
    source: 'TACO 4a ed. - Amendoa torrada',
  },
  {
    name: 'Chia',
    proteinPer100g: 16.0,
    servingSize: 15,
    servingUnit: 'g',
    state: 'cru',
    category: 'Sementes',
    source: 'TBCA - Chia',
  },
  {
    name: 'Linhaça',
    proteinPer100g: 18.0,
    servingSize: 15,
    servingUnit: 'g',
    state: 'cru',
    category: 'Sementes',
    source: 'TBCA - Linhaça',
  },
];

export function getFoodsByDietPreference(
  preference: 'omnivore' | 'vegetarian' | 'vegan'
): FoodItem[] {
  switch (preference) {
    case 'vegan':
      return foodDatabase.filter(
        (f) =>
          !['Ovos', 'Laticinios', 'Carnes', 'Peixes'].includes(f.category)
      );
    case 'vegetarian':
      return foodDatabase.filter((f) => !['Carnes', 'Peixes'].includes(f.category));
    case 'omnivore':
    default:
      return foodDatabase;
  }
}

export function getFoodsByCategory(category: string): FoodItem[] {
  return foodDatabase.filter((f) => f.category === category);
}

export function getTopProteinFoods(
  preference: 'omnivore' | 'vegetarian' | 'vegan',
  limit: number = 10
): FoodItem[] {
  return getFoodsByDietPreference(preference)
    .sort((a, b) => b.proteinPer100g - a.proteinPer100g)
    .slice(0, limit);
}
