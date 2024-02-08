import {useContext} from 'react';
import {ThemeContext, ThemeContextData} from './context';

export default function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Theme context must be used within a provider.');
  }

  return context;
}
