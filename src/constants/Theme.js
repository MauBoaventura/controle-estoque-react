import { createTheme, responsiveFontSizes } from '@mui/material';

// colors
export const primary = '#00E4CC';
export const secondary = '#0A69F7';
export const dark = '#000325';
export const light = '#F9F6F6';

export const gradientStart = '#07F1C7';
export const gradientEnd = '#357CD6';

export const green1 = '#00C7B2';
export const green2 = '#00B8A4';

export const gray1 = '#616060';
export const gray2 = '#E3E4E5';
export const gray3 = '#F4F5F7';
export const gray4 = '#616060';

export const background = '#F9F9F9';
export const darkBackground = '#333551';

export const warning = '#FF9D43';
export const error = '#FF2727';
export const success = '#49C06A';
export const info = '#0A69F7';

export const darkBlue = '#000433';

// border
export const borderWidth = 1;
export const borderColor = gray2;

// container
export const containerMaxWidth = 'lg';

// breakpoints
export const xs = 0;
export const sm = 600;
export const md = 960;
export const lg = 1280;
export const xl = 1920;

// spacing
export const spacing = 8;

const Theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: green1,
    },
    common: {
      black: dark,
      dark,
    },
    warning: {
      main: warning,
    },
    error: {
      main: error,
    },
    success: {
      main: success,
    },
    info: {
      main: info,
    },
    background: {
      default: background,
      dark: darkBackground,
    },
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth,
  },
  breakpoints: {
    values: {
      xs,
      sm,
      md,
      lg,
      xl,
    },
  },
  spacing,
  typography: {
    useNextVariants: true,
    fontFamily: ['Lexend', 'sans-serif'].join(','),
    color: dark,
  },
});

export default responsiveFontSizes(Theme);
