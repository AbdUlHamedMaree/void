export type FormatType = 'custom' | 'currency' | 'date' | 'time';

export type MaskOptions = {
  prefix?: string;
  decimalSeparator?: string;
  groupSeparator?: string;
  precision?: number;
  groupSize?: number;
  secondaryGroupSize?: number;
  fractionGroupSeparator?: string;
  fractionGroupSize?: number;
  suffix?: string;
};

export type TextDecorationOptions =
  | 'none'
  | 'underline'
  | 'line-through'
  | 'underline line-through';
