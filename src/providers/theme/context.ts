import {createContext} from 'react'
import dark from '@theme/dark'
import light from '@theme/light'

export enum ThemeType {
  light = 'light',
  dark = 'dark',
}

export const themes = {
  [ThemeType.light]: light,
  [ThemeType.dark]: dark,
}

export interface ThemeContextData {
  theme: ThemeType
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextData>({
  theme: ThemeType.light,
  toggleTheme: () => {},
})
