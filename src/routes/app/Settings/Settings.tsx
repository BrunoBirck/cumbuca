import React, {useCallback, useMemo, useState} from 'react'
import ReactNativeBiometrics from 'react-native-biometrics'
import {useTheme} from 'styled-components/native'
import {Button} from '@components/Button'
import PageContent from '@components/PageContent'
import {PageHeader} from '@components/PageHeader'
import {Switch} from '@components/Switch'
import Typography from '@components/Typography'
import useAuth from '@providers/authorization/useAuth'
import useThemeProvider from '@providers/theme/useTheme'
import {useToast} from '@providers/toast/useToast'
import {getItem, setItem, getUser} from '@services/storage'
import {APP_SIGNED_USER} from '@services/storage/keys'
import * as S from './styles'

const rnBiometrics = new ReactNativeBiometrics()

export function Settings() {
  const theme = useTheme()
  const {signOut} = useAuth()
  const {show} = useToast()
  const {toggleTheme, theme: themeProvider} = useThemeProvider()
  const isDarkMode = useMemo(() => themeProvider === 'dark', [themeProvider])
  const signedUser = getItem(APP_SIGNED_USER)
  const user = getUser(signedUser)
  const [isBiometricsActive, setIsBiometricsActive] = useState(
    user?.isBiometricActive ?? false,
  )

  const handleToggleBiometric = useCallback(async () => {
    try {
      const newBiometricsState = !isBiometricsActive
      setIsBiometricsActive(newBiometricsState)

      const updateBiometrics = async (isActive: boolean) => {
        const userUpdate = {...user, isBiometricActive: isActive}
        setItem(signedUser, userUpdate)
      }

      const biometryType = await rnBiometrics.isSensorAvailable()
      if (!biometryType.available) {
        show('Biometria não disponível', 'error')
        setIsBiometricsActive(false)
        return await updateBiometrics(false)
      }

      if (newBiometricsState) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: 'Login com biometria',
        })

        if (success) {
          return await updateBiometrics(true)
        } else {
          show('Não foi possível ativar a biometria', 'error')
          setIsBiometricsActive(false)
          return await updateBiometrics(false)
        }
      } else {
        return await updateBiometrics(false)
      }
    } catch (error) {
      show('Não foi possível ativar a biometria', 'error')
    }
  }, [isBiometricsActive, show, signedUser, user])

  return (
    <PageContent testID="settings.page">
      <S.Container>
        <PageHeader title="Configurações" />
        <S.Box testID="settings.theme">
          <Typography semibold color={theme.colors.placeholder}>
            Modo escuro
          </Typography>
          <Switch testID={`${isDarkMode ? 'theme.switch.dark' : 'theme.switch.light'}`} value={isDarkMode} onValueChange={toggleTheme} />
        </S.Box>
        <S.Box testID="settings.biometric">
          <Typography semibold color={theme.colors.placeholder}>
            Login com biometria
          </Typography>
          <Switch
            testID={isBiometricsActive ? 'biometric.switch.active' : 'biometric.switch.inactive'}
            value={isBiometricsActive}
            onValueChange={handleToggleBiometric}
          />
        </S.Box>
      </S.Container>
      <S.Box>
        <Button testID="signout.button" label="Sair" variant="danger" onPress={signOut} />
      </S.Box>
    </PageContent>
  )
}
