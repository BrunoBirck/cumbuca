import React from 'react';
import * as S from '../styles';
import Typography from '@components/Typography';
import {Badge} from '@components/Badge';
import {Input} from '@components/Input';
import {useTheme} from 'styled-components/native';

export interface IFilterProps {
  search?: string;
  setSearch: (value: string) => void;
  orderBy: string;
  handleSelectOrderBy: (order: string) => void;
}

export function Filters({
  search,
  setSearch,
  orderBy,
  handleSelectOrderBy,
}: IFilterProps) {
  const theme = useTheme();
  return (
    <S.Filters>
      <Input
        label="Pesquisar produtos"
        value={search}
        onChangeText={setSearch}
        testID="product-list.search.input"
      />
      <S.Box>
        <Typography semibold color={theme.colors.placeholder}>
          Ordenar por:
        </Typography>
        <S.ProductOrderByList testID="product-list.order.scrollview">
          <Badge
            text="ID"
            onPress={() => handleSelectOrderBy('id')}
            selected={orderBy === 'id'}
            testID="product-list.order-by-id"
          />
          <Badge
            text="Nome"
            onPress={() => handleSelectOrderBy('name')}
            selected={orderBy === 'name'}
            testID="product-list.order-by-name"
          />
          <Badge
            text="Quantidade"
            onPress={() => handleSelectOrderBy('quantity')}
            selected={orderBy === 'quantity'}
            testID="product-list.order-by-quantity"
          />
          <Badge
            text="Valor unitário"
            onPress={() => handleSelectOrderBy('unityPrice')}
            selected={orderBy === 'unityPrice'}
            testID="product-list.order-by-unity-price"
          />
          <Badge
            text="Valor total"
            onPress={() => handleSelectOrderBy('totalPrice')}
            selected={orderBy === 'totalPrice'}
            testID="product-list.order-by-total-price"
          />
        </S.ProductOrderByList>
      </S.Box>
    </S.Filters>
  );
}
