export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 32,
  xxl: 64,
} as const;

export const gSpacing = (n: number) => n * 4;
