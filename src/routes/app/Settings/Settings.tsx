import PageContent from '@components/PageContent';
import React, {useMemo} from 'react';
import * as S from './styles';
import Typography from '@components/Typography';
import {Switch} from '@components/Switch';
import {useTheme} from 'styled-components/native';
import {Button} from '@components/Button';
import {PageHeader} from '@components/PageHeader';
import useThemeProvider from '@providers/theme/useTheme';

export function Settings() {
  const theme = useTheme();
  const {toggleTheme, theme: themeProvider} = useThemeProvider();
  const isDarkMode = useMemo(() => themeProvider === 'dark', [themeProvider]);
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
          <Switch value={false} onValueChange={console.log} />
        </S.Box>
      </S.Container>
      <S.Box>
        <Button label="Sair" variant="danger" />
      </S.Box>
    </PageContent>
  );
}
