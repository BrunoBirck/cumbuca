import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      white: string;
      black: string;
      border: string;
      placeholder: string;
      error: string;
      input: string;
      description: string;
      disabled: string;
      background: string;
      text: string;
    };
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacers: {
      'sm-1': string;
      'sm-2': string;
      'sm-3': string;
      'md-1': string;
      'md-2': string;
      'md-3': string;
      'lg-1': string;
      'lg-2': string;
    };
    spacersRaw: {
      'sm-1': number;
      'sm-2': number;
      'sm-3': number;
      'md-1': number;
      'md-2': number;
      'md-3': number;
      'lg-1': number;
      'lg-2': number;
    };
    fontFamilies: {
      regular: string;
      semibold: string;
    };
    fontWeights: {
      regular: number;
      semibold: number;
    };
  }
}
