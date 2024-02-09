import PageContent from '@components/PageContent';
import React, {useEffect} from 'react';
import * as S from './styles';
import Typography from '@components/Typography';
import {useTheme} from 'styled-components/native';
import {Icon} from '@components/Icon';
import {Input} from '@components/Input';
import {Badge} from '@components/Badge';
import {ProductCard} from './components/ProductCard';
import {Button} from '@components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStack} from '..';
import {IProduct} from 'src/types/Product';
import {productsByUser, storage} from '@services/storage';
import {FlatList} from 'react-native-gesture-handler';

export function ProductList() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<AppStack>>();
  const productsFromStorage = productsByUser();

  const [products, setProducts] =
    React.useState<IProduct[]>(productsFromStorage);

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((value) => {
      console.log('value', value);
    });
    return () => {
      listener.remove();
    };
  }, []);

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
          <S.SettingsButton
            onPress={() => navigation.navigate('settings')}
            activeOpacity={0.8}>
            <Icon name="settings" width={24} height={24} />
          </S.SettingsButton>
        </S.Header>
        <S.Filters>
          <Input label="Pesquisar produtos" />
          <S.Box>
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
          </S.Box>
        </S.Filters>
      </S.Container>
      <S.Box>
        <FlatList
          data={products}
          keyExtractor={item => JSON.stringify(item.id)}
          renderItem={({item}) => <ProductCard product={item} />}
          contentContainerStyle={{gap: theme.spacersRaw['sm-3']}}
        />
      </S.Box>
      <S.ButtonAbsolute>
        <Button
          variant="primary-rounded"
          label="Produto"
          icon="plus"
          width="154px"
          onPress={() => navigation.navigate('product-put')}
        />
      </S.ButtonAbsolute>
    </PageContent>
  );
}
