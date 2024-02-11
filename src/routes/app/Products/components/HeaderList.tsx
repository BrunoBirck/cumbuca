import React from 'react';
import * as S from '../styles';
import Typography from '@components/Typography';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Icon} from '@components/Icon';
import {AppStack} from '@routes/app';
import {useTheme} from 'styled-components/native';

export function HeaderList() {
  const navigation = useNavigation<NavigationProp<AppStack>>();
  const theme = useTheme();
  return (
    <S.Header>
      <S.HelloBox>
        <Typography>Olá,</Typography>
        <Typography variant="lg" semibold color={theme.colors.primary}>
          Bem-vindo ao app!
        </Typography>
      </S.HelloBox>
      <S.SettingsButton
        onPress={() => navigation.navigate('settings')}
        activeOpacity={0.8}>
        <Icon
          name="settings"
          width={theme.spacersRaw['md-3']}
          height={theme.spacersRaw['md-3']}
        />
      </S.SettingsButton>
    </S.Header>
  );
}
