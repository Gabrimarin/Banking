// theme.ts
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  borderRadius: "8px",
  palette: {
    common: {
      black: "#222831",
      white: "#F4F3F4",
    },
    primary: {
      main: "#CA5439",
      contrastText: "#F4F3F4",
    },
    secondary: {
      main: "#313750",
      contrastText: "#F4F3F4",
    },
    error: {
      main: "#F44336",
      contrastText: "#F4F3F4",
    },
  },
};
