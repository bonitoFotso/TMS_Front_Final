import { alpha } from '@mui/material/styles';

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const primary = {
  lighter: '#E6F7FF',
  light: '#6BB1FF',
  main: '#007BFF',
  dark: '#0058CC',
  darker: '#003D99',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#FFDAF2',
  light: '#FF5C8D',
  main: '#D6336C',
  dark: '#9E004E',
  darker: '#670026',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#D6F3FD',
  light: '#80C7F7',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#D9FAD5',
  light: '#4CAF50',
  main: '#008B3E',
  dark: '#005E27',
  darker: '#003D19',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#FFF5CC',
  light: '#FFC107',
  main: '#FFA000',
  dark: '#FF6F00',
  darker: '#E65100',
  contrastText: grey[800],
};

export const error = {
  lighter: '#FFEBE6',
  light: '#FF5A4C',
  main: '#F44336',
  dark: '#BA2724',
  darker: '#7A1616',
  contrastText: '#FFFFFF',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[900], 0.2),
  action,
};

export function palette() {
  return {
    ...base,
    mode: 'light',
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: '#FFF0F0',
      default: grey[200],
      neutral: grey[300],
    },
    action: {
      ...base.action,
      active: grey[600],
    },
  };
}
