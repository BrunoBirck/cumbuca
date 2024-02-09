import PageContent from '@components/PageContent';
import React from 'react';
import {Pressable, View} from 'react-native';
import * as S from './styles';
import {Icon} from '@components/Icon';
import Typography from '@components/Typography';
import {Switch} from '@components/Switch';
import {useTheme} from 'styled-components/native';
import {Button} from '@components/Button';

export function Settings() {
  const theme = useTheme();
  return (
    <PageContent>
      <S.Container>
        <S.Header>
          <Pressable>
            <Icon name="arrow-left" width={32} height={32} />
          </Pressable>
          <Typography variant="lg" semibold>
            Configurações
          </Typography>
          <View />
        </S.Header>
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
