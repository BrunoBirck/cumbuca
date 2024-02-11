import {APP_THEME} from '@services/storage/keys';
import React, {useEffect, useState} from 'react';
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native';
import {ThemeContext, ThemeType, themes} from './context';
import {getItem, setItem} from '@services/storage';

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState(ThemeType.light);

  async function loadTheme() {
    const savedTheme = getItem(APP_THEME);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }

  function toggleTheme() {
    let newTheme;
    if (theme === ThemeType.light) {
      newTheme = ThemeType.dark;
    } else {
      newTheme = ThemeType.light;
    }
    setItem(APP_THEME, newTheme);
    setTheme(newTheme);
  }

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <ThemeProviderStyled theme={themes[theme]}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  );
};
