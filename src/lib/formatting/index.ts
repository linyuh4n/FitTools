export function formatWeight(kg: number): string {
  const rounded = Math.round(kg * 10) / 10;
  return `${rounded.toFixed(1).replace('.', ',')} kg`;
}

export function formatHeight(cm: number): string {
  const meters = cm / 100;
  return `${meters.toFixed(2).replace('.', ',')} m`;
}

export function formatProtein(grams: number): string {
  return `${grams} g`;
}

export function formatProteinPerKg(value: number): string {
  return `${value.toFixed(1).replace('.', ',')} g/kg/dia`;
}

export function formatCalories(kcal: number): string {
  return `${kcal.toLocaleString('pt-BR')} kcal`;
}

export function formatBMI(bmi: number): string {
  return bmi.toFixed(1).replace('.', ',');
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1).replace('.', ',')}%`;
}

export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
}

export function formatDateISO(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function formatNumber(value: number, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? 0;
  const rounded = Number(value.toFixed(decimals));
  return rounded.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
