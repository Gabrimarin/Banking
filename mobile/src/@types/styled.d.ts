// styled.d.ts
import "styled-components/native";
interface IPalette {
  main: string;
  contrastText: string;
}
declare module "styled-components/native" {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: IPalette;
      secondary: IPalette;
      error: IPalette;
    };
  }
}
