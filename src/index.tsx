import React, {useEffect} from 'react'
import {StatusBar} from 'react-native'
import BootSplash from 'react-native-bootsplash'
import {NavigationContainer} from '@react-navigation/native'
import {useTheme} from 'styled-components/native'
import {ThemeType} from '@providers/theme/context'
import useThemeProvider from '@providers/theme/useTheme'
import {Providers} from './Providers'
import {Routes} from './routes'

function AppContent() {
  const {theme} = useThemeProvider()
  const {colors} = useTheme()
  const darkModeIsEnabled = theme === ThemeType.dark
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={darkModeIsEnabled ? 'light-content' : 'dark-content'}
        backgroundColor={darkModeIsEnabled ? colors.black : colors.white}
      />
      <Routes />
    </NavigationContainer>
  )
}

export function App() {
  useEffect(() => {
    async function bootsplash() {
      await BootSplash.hide({fade: true})
    }
    bootsplash()
  }, [])
  return (
    <Providers>
      <AppContent />
    </Providers>
  )
}
