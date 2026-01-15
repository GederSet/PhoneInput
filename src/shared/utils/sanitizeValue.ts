export const sanitizeValue = (value: string) =>
  value
    .split('')
    .filter(char => char === '+' || /\d/.test(char))
    .join('')
