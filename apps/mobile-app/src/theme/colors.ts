export const primary = {
  0: '#000000',
  10: '#001d31',
  20: '#003351',
  25: '#003f62',
  30: '#004b73',
  35: '#005785',
  40: '#006397',
  50: '#007dbd',
  60: '#3398db',
  70: '#56b3f7',
  80: '#92ccff',
  90: '#cce5ff',
  95: '#e7f2ff',
  98: '#f7f9ff',
  99: '#fcfcff',
  100: '#ffffff',
};

export const secondary = {
  0: '#000000',
  10: '#002019',
  20: '#00382c',
  25: '#004437',
  30: '#005141',
  35: '#005e4c',
  40: '#006b58',
  50: '#00876f',
  60: '#00a487',
  70: '#24c0a0',
  80: '#4eddbb',
  90: '#6ff9d6',
  95: '#b8ffe9',
  98: '#e6fff5',
  99: '#f3fff9',
  100: '#ffffff',
};

export const tertiary = {
  0: '#000000',
  10: '#320047',
  20: '#500a6c',
  25: '#5c1b78',
  30: '#692984',
  35: '#763691',
  40: '#83439e',
  50: '#9e5cb9',
  60: '#ba76d5',
  70: '#d790f2',
  80: '#ebb2ff',
  90: '#f8d8ff',
  95: '#feebff',
  98: '#fff7fb',
  99: '#fffbff',
  100: '#ffffff',
};

// export const neutral = {
//   0: '#000000',
//   10: '#1a1c1e',
//   20: '#2f3133',
//   25: '#3a3b3e',
//   30: '#45474a',
//   35: '#515255',
//   40: '#5d5e61',
//   50: '#76777a',
//   60: '#8f9194',
//   70: '#aaabae',
//   80: '#c6c6c9',
//   90: '#e2e2e5',
//   95: '#f0f0f4',
//   98: '#f9f9fc',
//   99: '#fcfcff',
//   100: '#ffffff',
// };

// export const neutralVariant = {
//   0: '#000000',
//   10: '#171c22',
//   20: '#2b3137',
//   25: '#363c42',
//   30: '#42474e',
//   35: '#4d5359',
//   40: '#595f65',
//   50: '#72787e',
//   60: '#8c9198',
//   70: '#a6acb3',
//   80: '#c2c7ce',
//   90: '#dee3eb',
//   95: '#ecf1f9',
//   98: '#f7f9ff',
//   99: '#fcfcff',
//   100: '#ffffff',
// };

export const info = {
  0: '#000000',
  10: '#001d31',
  20: '#003351',
  25: '#003f62',
  30: '#004b73',
  35: '#005785',
  40: '#006397',
  50: '#007dbd',
  60: '#3398db',
  70: '#56b3f7',
  80: '#92ccff',
  90: '#cce5ff',
  95: '#e7f2ff',
  98: '#e7f2ff',
  99: '#fcfcff',
  100: '#ffffff',
};

export const success = {
  0: '#000000',
  10: '#002019',
  20: '#00382c',
  25: '#004437',
  30: '#005141',
  35: '#005e4c',
  40: '#006b58',
  50: '#00876f',
  60: '#00a487',
  70: '#24c0a0',
  80: '#4eddbb',
  90: '#6ff9d6',
  95: '#b8ffe9',
  98: '#e6fff5',
  99: '#f3fff9',
  100: '#ffffff',
};

export const warning = {
  0: '#000000',
  10: '#231b00',
  20: '#3c2f00',
  25: '#493a00',
  30: '#574500',
  35: '#655000',
  40: '#735c00',
  50: '#907400',
  60: '#af8d00',
  70: '#cea700',
  80: '#eec209',
  90: '#ffe084',
  95: '#fff0ca',
  98: '#fff8f0',
  99: '#fff8f0',
  100: '#ffffff',
};

export const error = {
  0: '#000000',
  10: '#2d0000',
  20: '#690001',
  25: '#7e0002',
  30: '#910807',
  35: '#a31912',
  40: '#b4271d',
  50: '#d74132',
  60: '#fa5a48',
  70: '#ff8a7a',
  80: '#ffb4a9',
  90: '#ffdad5',
  95: '#ffedea',
  98: '#fff8f7',
  99: '#fffbff',
  100: '#ffffff',
};

type MD3ColorsSchema<
  TName extends string,
  TCapitalizedName extends string = Capitalize<TName>,
> = Record<
  | TName
  | `on${TCapitalizedName}`
  | `${TName}Container`
  | `on${TCapitalizedName}Container`,
  string
>;

const getMD3LightColorSchema = <TName extends string>(
  color: typeof primary,
  name: TName
): MD3ColorsSchema<TName> => {
  const capitalizedName = (name.charAt(0).toUpperCase() +
    name.slice(1)) as Capitalize<TName>;

  return {
    [name]: color[40],
    [`on${capitalizedName}`]: color[100],
    [`${name}Container`]: color[90],
    [`on${capitalizedName}Container`]: color[10],
  } as MD3ColorsSchema<TName>;
};

export const lightColors = {
  ...getMD3LightColorSchema(primary, 'primary'),
  ...getMD3LightColorSchema(primary, 'secondary'),
  ...getMD3LightColorSchema(tertiary, 'tertiary'),
  ...getMD3LightColorSchema(info, 'info'),
  ...getMD3LightColorSchema(success, 'success'),
  ...getMD3LightColorSchema(warning, 'warning'),
  ...getMD3LightColorSchema(error, 'error'),
};

const getMD3DarkColorSchema = <TName extends string>(
  color: typeof primary,
  name: TName
): MD3ColorsSchema<TName> => {
  const capitalizedName = (name.charAt(0).toUpperCase() +
    name.slice(1)) as Capitalize<TName>;

  return {
    [name]: color[80],
    [`on${capitalizedName}`]: color[20],
    [`${name}Container`]: color[30],
    [`on${capitalizedName}Container`]: color[90],
  } as MD3ColorsSchema<TName>;
};

export const darkColors = {
  ...getMD3DarkColorSchema(primary, 'primary'),
  ...getMD3DarkColorSchema(primary, 'secondary'),
  ...getMD3DarkColorSchema(tertiary, 'tertiary'),
  ...getMD3DarkColorSchema(info, 'info'),
  ...getMD3DarkColorSchema(success, 'success'),
  ...getMD3DarkColorSchema(warning, 'warning'),
  ...getMD3DarkColorSchema(error, 'error'),
};
