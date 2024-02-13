import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import {StackHeaderMode} from '@react-navigation/stack/lib/typescript/src/types'
import {useTheme} from 'styled-components/native'
import groups from './groups'

export type AppStack = {
  'product-list': undefined
  'product-put': undefined
  settings: undefined
}

const {Navigator, Screen, Group} = createStackNavigator<AppStack>()

export function App() {
  const theme = useTheme()
  const CARD_DEFAULT_OPTIONS = {
    ...TransitionPresets.SlideFromRightIOS,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    animationEnabled: true,
    headerMode: 'screen' as StackHeaderMode,
    cardStyle: {backgroundColor: theme.colors.background},
  }
  return (
    <Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: false,
        headerMode: 'screen',
        cardStyle: {backgroundColor: theme.colors.background},
      }}>
      {groups.map(({...group}, key) => {
        return (
          <Group key={`group-${key}`} screenOptions={{...CARD_DEFAULT_OPTIONS}}>
            {group.screens.map(screen => {
              return (
                <Screen
                  name={screen.name}
                  component={screen.component}
                  key={`group-${key}-${screen.name}`}
                />
              )
            })}
          </Group>
        )
      })}
    </Navigator>
  )
}
