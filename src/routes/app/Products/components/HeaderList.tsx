import React from 'react'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {useTheme} from 'styled-components/native'
import {Icon} from '@components/Icon'
import Typography from '@components/Typography'
import {AppStack} from '@routes/app'
import * as S from '../styles'

export function HeaderList() {
  const navigation = useNavigation<NavigationProp<AppStack>>()
  const theme = useTheme()
  return (
    <S.Header>
      <S.HelloBox>
        <Typography>Olá,</Typography>
        <Typography variant="lg" semibold color={theme.colors.primary}>
          Bem-vindo ao app!
        </Typography>
      </S.HelloBox>
      <S.SettingsButton
        testID="settings-button"
        onPress={() => navigation.navigate('settings')}
        activeOpacity={0.8}>
        <Icon
          name="settings"
          width={theme.spacersRaw['md-3']}
          height={theme.spacersRaw['md-3']}
        />
      </S.SettingsButton>
    </S.Header>
  )
}
