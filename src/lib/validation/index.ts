export function validateNumber(
  value: unknown,
  min: number,
  max: number,
  fieldName: string
): { valid: boolean; error?: string } {
  if (value === undefined || value === null || value === '') {
    return { valid: false, error: `${fieldName} é obrigatório` };
  }

  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} deve ser um número válido` };
  }

  if (num < min || num > max) {
    return { valid: false, error: `${fieldName} deve estar entre ${min} e ${max}` };
  }

  return { valid: true };
}

export function validateSelect<T extends string>(
  value: unknown,
  allowedValues: T[],
  fieldName: string
): { valid: boolean; error?: string; value?: T } {
  if (value === undefined || value === null || value === '') {
    return { valid: false, error: `${fieldName} é obrigatório` };
  }

  if (!allowedValues.includes(value as T)) {
    return { valid: false, error: `${fieldName} inválido` };
  }

  return { valid: true, value: value as T };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function formatNumber(
  value: number,
  options: { decimals?: number; locale?: string } = {}
): string {
  const { decimals = 0, locale = 'pt-BR' } = options;
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
