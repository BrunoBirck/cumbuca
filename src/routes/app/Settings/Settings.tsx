import PageContent from '@components/PageContent';
import React from 'react';
import * as S from './styles';
import Typography from '@components/Typography';
import {Switch} from '@components/Switch';
import {useTheme} from 'styled-components/native';
import {Button} from '@components/Button';
import {PageHeader} from '@components/PageHeader';

export function Settings() {
  const theme = useTheme();
  return (
    <PageContent>
      <S.Container>
        <PageHeader title="Configurações" />
        <S.Box>
          <Typography semibold color={theme.colors.placeholder}>
            Modo escuro
          </Typography>
          <Switch value={true} onValueChange={console.log} />
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
