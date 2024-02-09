import {Card} from '@components/Card';
import {Icon} from '@components/Icon';
import Typography from '@components/Typography';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import * as S from './styles';

export function ProductCard() {
  const theme = useTheme();
  return (
    <Card>
      <S.Container>
        <S.BoxWithGap>
          <S.Row>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              ID:
            </Typography>
            <Typography variant="sm">1</Typography>
          </S.Row>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Nome:
            </Typography>
            <Typography variant="sm">Nome do produto 1</Typography>
          </S.Column>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Quantidade:
            </Typography>
            <Typography variant="sm">200</Typography>
          </S.Column>
        </S.BoxWithGap>
        <S.Box>
          <S.ColumnWithFlex>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Valor unitário:
            </Typography>
            <Typography variant="sm">R$500,00</Typography>
          </S.ColumnWithFlex>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Valor total:
            </Typography>
            <Typography variant="sm">R$100.000,00</Typography>
          </S.Column>
        </S.Box>
        <S.TrashBox>
          <TouchableOpacity activeOpacity={0.8}>
            <Icon name="trash" width={24} height={24} />
          </TouchableOpacity>
        </S.TrashBox>
      </S.Container>
    </Card>
  );
}
