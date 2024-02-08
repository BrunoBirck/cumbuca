import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import {Providers} from './Providers';
import {Routes} from './routes';
import BootSplash from 'react-native-bootsplash';
import {StatusBar} from 'react-native';
import useTheme from '@providers/theme/useTheme';
import {ThemeType} from '@providers/theme/context';

function AppContent() {
  const {theme} = useTheme();
  const darkModeIsEnabled = theme === ThemeType.dark;
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={darkModeIsEnabled ? 'light-content' : 'dark-content'}
      />
      <Routes />
    </NavigationContainer>
  );
}

export function App() {
  useEffect(() => {
    async function bootsplash() {
      await BootSplash.hide({fade: true});
    }
    bootsplash();
  }, []);
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
