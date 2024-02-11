import PageContent from '@components/PageContent';
import React, {useCallback, useMemo, useState} from 'react';
import * as S from './styles';
import Typography from '@components/Typography';
import {Switch} from '@components/Switch';
import {useTheme} from 'styled-components/native';
import {Button} from '@components/Button';
import {PageHeader} from '@components/PageHeader';
import useThemeProvider from '@providers/theme/useTheme';
import useAuth from '@providers/authorization/useAuth';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useToast} from '@providers/toast/useToast';
import {getItem, setItem} from '@services/storage/global';
import {APP_SIGNED_USER} from '@services/storage/keys';
import {getUser} from '@services/storage/user';

const rnBiometrics = new ReactNativeBiometrics();

export function Settings() {
  const theme = useTheme();
  const {signOut} = useAuth();
  const {show} = useToast();
  const {toggleTheme, theme: themeProvider} = useThemeProvider();
  const isDarkMode = useMemo(() => themeProvider === 'dark', [themeProvider]);
  const signedUser = getItem(APP_SIGNED_USER);
  const user = getUser(signedUser);
  const [isBiometricsActive, setIsBiometricsActive] = useState(
    user?.isBiometricActive ?? false,
  );

  const handleToggleBiometric = useCallback(async () => {
    try {
      const biometryType = await rnBiometrics.isSensorAvailable();
      if (!biometryType.available) {
        show('Biometria não disponível', 'error');
        return;
      }
      const newBiometricsState = !isBiometricsActive;
      setIsBiometricsActive(newBiometricsState);

      const updateBiometrics = async (isActive: boolean) => {
        const userUpdate = {...user, isBiometricActive: isActive};
        setItem(signedUser, userUpdate);
      };

      if (newBiometricsState) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: 'Login com biometria',
        });

        if (success) {
          return await updateBiometrics(true);
        } else {
          show('Não foi possível ativar a biometria', 'error');
          setIsBiometricsActive(false);
          return await updateBiometrics(false);
        }
      } else {
        return await updateBiometrics(false);
      }
    } catch (error) {
      show('Não foi possível ativar a biometria', 'error');
    }
  }, [isBiometricsActive, show, signedUser, user]);

  return (
    <PageContent>
      <S.Container>
        <PageHeader title="Configurações" />
        <S.Box>
          <Typography semibold color={theme.colors.placeholder}>
            Modo escuro
          </Typography>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </S.Box>
        <S.Box>
          <Typography semibold color={theme.colors.placeholder}>
            Login com biometria
          </Typography>
          <Switch
            value={isBiometricsActive}
            onValueChange={handleToggleBiometric}
          />
        </S.Box>
      </S.Container>
      <S.Box>
        <Button label="Sair" variant="danger" onPress={signOut} />
      </S.Box>
    </PageContent>
  );
}
