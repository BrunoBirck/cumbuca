import React from 'react'
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack'
import {useTheme} from 'styled-components/native'
import {SignIn} from './SignIn'

export type AuthStack = {
  signin: undefined
}

const {Navigator, Screen} = createStackNavigator<AuthStack>()

export function Auth() {
  const routes = [{component: SignIn, name: 'signin'}] as const
  const theme = useTheme()
  return (
    <Navigator
      initialRouteName="signin"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {backgroundColor: theme.colors.background},
      }}>
      {routes.map(({name, component}, key) => (
        <Screen name={name} component={component} key={key} />
      ))}
    </Navigator>
  )
}
