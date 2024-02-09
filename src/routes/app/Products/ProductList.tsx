import PageContent from '@components/PageContent';
import React, {useCallback, useEffect, useMemo} from 'react';
import * as S from './styles';
import {useTheme} from 'styled-components/native';
import {ProductCard} from './components/ProductCard';
import {Button} from '@components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStack} from '..';
import {IProduct} from 'src/types/Product';
import {productsByUser, storage} from '@services/storage';
import {FlatList} from 'react-native-gesture-handler';
import {HeaderList} from './components/HeaderList';
import {Filters} from './components/Filters';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export function ProductList() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<AppStack>>();
  const productsFromStorage = productsByUser();

  const [orderBy, setOrderBy] = React.useState<string>('');
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [products, setProducts] =
    React.useState<IProduct[]>(productsFromStorage);

  const sortProducts = useCallback(
    (productsToSort: IProduct[]) => {
      switch (orderBy) {
        case 'id':
          return [...productsToSort].sort((a, b) => a.id - b.id);
        case 'name':
          return [...productsToSort].sort((a, b) =>
            a.name.localeCompare(b.name),
          );
        case 'quantity':
          return [...productsToSort].sort((a, b) => a.quantity - b.quantity);
        case 'unityPrice':
          return [...productsToSort].sort(
            (a, b) => a.unityPrice - b.unityPrice,
          );
        case 'totalPrice':
          return [...productsToSort].sort((a, b) => a.total - b.total);
        default:
          return productsToSort;
      }
    },
    [orderBy],
  );

  const handleSelectOrderBy = useCallback(
    (order: string) => {
      if (order === orderBy) {
        setOrderBy('');
      }
      setOrderBy(order);
    },
    [orderBy],
  );

  const filteredProducts = useMemo(() => {
    let sortedProducts = products;
    if (search) {
      const searchTermLower = search.toLowerCase();
      const startsWithSearchTerm = products.filter(product =>
        product.name.toLowerCase().startsWith(searchTermLower),
      );
      const containsSearchTerm = products.filter(product =>
        product.name.toLowerCase().includes(searchTermLower),
      );
      const filteredContainsSearchTerm = containsSearchTerm.filter(
        product => !product.name.toLowerCase().startsWith(searchTermLower),
      );
      return [...startsWithSearchTerm, ...filteredContainsSearchTerm];
    }
    sortedProducts = sortProducts(sortedProducts);

    return sortedProducts;
  }, [products, search, sortProducts]);

  useEffect(() => {
    const listener = storage.addOnValueChangedListener(value => {
      if (value) {
        const getNewArrayOfProducts = productsByUser();
        setProducts(getNewArrayOfProducts);
      }
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <PageContent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <HeaderList />
          <Filters
            orderBy={orderBy}
            search={search}
            setSearch={setSearch}
            handleSelectOrderBy={handleSelectOrderBy}
          />
        </S.Container>
      </TouchableWithoutFeedback>
      <S.Box>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => JSON.stringify(item.id)}
          renderItem={({item}) => <ProductCard product={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: theme.spacersRaw['sm-3'],
            paddingBottom: 360,
          }}
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
