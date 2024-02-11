import {Button} from '@components/Button';
import {Icon} from '@components/Icon';
import Typography from '@components/Typography';
import React from 'react';
import {useTheme} from 'styled-components/native';
import * as S from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStack} from '@routes/app';

export function EmptyState() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<AppStack>>();

  return (
    <S.BoxEmptyStateContainer>
      <S.BoxEmptyStateHeader>
        <Icon name="box" width={180} height={180} />
        <Typography variant="lg" semibold color={theme.colors.primary}>
          Ops!
        </Typography>
        <Typography>Nenhum produto encontrado.</Typography>
      </S.BoxEmptyStateHeader>
      <S.BoxEmptyStateButton>
        <Button
          label="Adicionar"
          icon="plus"
          onPress={() => navigation.navigate('product-put')}
        />
      </S.BoxEmptyStateButton>
    </S.BoxEmptyStateContainer>
  );
}
