import "styled-components";
import theme from "./theme";

declare module "styled-components" {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}

//Gera thema customizado baseado nas caracteristicas do CSS Global!
