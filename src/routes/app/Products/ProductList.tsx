import PageContent from '@components/PageContent';
import React from 'react';
import * as S from './styles';
import Typography from '@components/Typography';
import {useTheme} from 'styled-components/native';
import {Icon} from '@components/Icon';
import {Input} from '@components/Input';
import {Badge} from '@components/Badge';
import { ProductCard } from './components/ProductCard';
import { Button } from '@components/Button';

export function ProductList() {
  const theme = useTheme();
  return (
    <PageContent>
      <S.Container>
        <S.Header>
          <S.HelloBox>
            <Typography>Olá,</Typography>
            <Typography variant="lg" semibold color={theme.colors.primary}>
              Bem-vindo ao app!
            </Typography>
          </S.HelloBox>
          <S.SettingsButton activeOpacity={0.8}>
            <Icon name="settings" width={24} height={24} />
          </S.SettingsButton>
        </S.Header>
        <S.Filters>
          <Input label="Pesquisar produtos" />
          <S.OrderBy>
            <Typography semibold color={theme.colors.placeholder}>
              Ordenar por:
            </Typography>
            <S.ProductOrderByList>
              <Badge text="ID" />
              <Badge text="Nome" />
              <Badge text="Quantidade" />
              <Badge text="Valor unitário" />
              <Badge text="Valor total" />
            </S.ProductOrderByList>
          </S.OrderBy>
        </S.Filters>
      </S.Container>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <S.ButtonAbsolute>
        <Button variant="primary-rounded" label="Produto" icon="plus" width="154px" />
      </S.ButtonAbsolute>
    </PageContent>
  );
}
