import React, {useCallback, useEffect, useMemo} from 'react'
import {FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {useTheme} from 'styled-components/native'
import {Button} from '@components/Button'
import DragList from '@components/Draglist'
import PageContent from '@components/PageContent'
import {storage, productsByUser} from '@services/storage'
import {IProduct} from 'src/types/Product'
import {AppStack} from '..'
import * as S from './styles'
import {EmptyState} from './components/EmptyState'
import {Filters} from './components/Filters'
import {HeaderList} from './components/HeaderList'
import {ProductCard} from './components/ProductCard'

export function ProductList() {
  const theme = useTheme()
  const listRef = React.useRef<FlatList<string>>(null)
  const navigation = useNavigation<NavigationProp<AppStack>>()
  const productsFromStorage = productsByUser()
  
  const [orderBy, setOrderBy] = React.useState<string>('')
  const [search, setSearch] = React.useState<string | undefined>(undefined)
  const [products, setProducts] =
    React.useState<IProduct[]>(productsFromStorage)

  const sortProducts = useCallback(
    (productsToSort: IProduct[]) => {
      switch (orderBy) {
        case 'id':
          return [...productsToSort].sort((a, b) => a.id - b.id)
        case 'name':
          return [...productsToSort].sort((a, b) =>
            a.name.localeCompare(b.name),
          )
        case 'quantity':
          return [...productsToSort].sort((a, b) => a.quantity - b.quantity)
        case 'unityPrice':
          return [...productsToSort].sort((a, b) => a.unityPrice - b.unityPrice)
        case 'totalPrice':
          return [...productsToSort].sort((a, b) => a.total - b.total)
        default:
          return productsToSort
      }
    },
    [orderBy],
  )

  const handleSelectOrderBy = useCallback(
    (order: string) => {
      if (order === orderBy) {
        setOrderBy('')
      }
      setOrderBy(order)
    },
    [orderBy],
  )

  const handleReordered = useCallback(
    (fromIndex: number, toIndex: number) => {
      const copy = [...products]
      const removed = copy.splice(fromIndex, 1)

      copy.splice(toIndex, 0, removed[0])
      setOrderBy('')
      setProducts(copy)
    },
    [products],
  )

  const filteredProducts = useMemo(() => {
    let sortedProducts = products
    if (search) {
      const searchTermLower = search.toLowerCase()
      const startsWithSearchTerm = products.filter(product =>
        product.name.toLowerCase().startsWith(searchTermLower),
      )
      const containsSearchTerm = products.filter(product =>
        product.name.toLowerCase().includes(searchTermLower),
      )
      const filteredContainsSearchTerm = containsSearchTerm.filter(
        product => !product.name.toLowerCase().startsWith(searchTermLower),
      )
      return [...startsWithSearchTerm, ...filteredContainsSearchTerm]
    }
    sortedProducts = sortProducts(sortedProducts)

    return sortedProducts
  }, [products, search, sortProducts])

  useEffect(() => {
    const listener = storage.addOnValueChangedListener(value => {
      if (value) {
        const getNewArrayOfProducts = productsByUser()
        setProducts(getNewArrayOfProducts)
      }
    })
    return () => {
      listener.remove()
    }
  }, [])

  return (
    <PageContent testID="product-list.page">
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
      {products.length > 0 ? (
        <S.BoxWithFlex>
          <DragList
            ref={listRef}
            testID="product-list"
            data={filteredProducts}
            keyExtractor={(item: IProduct) => JSON.stringify(item)}
            onReordered={handleReordered}
            showsVerticalScrollIndicator={false}
            renderItem={({item, onDragStart, onDragEnd, isActive}) => (
              <ProductCard
                key={JSON.stringify(item)}
                product={item}
                onLongPress={onDragStart}
                onPressOut={onDragEnd}
                isActive={isActive}
                testID={`product-list.item-${item.id}`}
              />
            )}
            contentContainerStyle={{
              gap: theme.spacersRaw['sm-2'],
              paddingBottom: 120,
            }}
            scrollEnabled
          />
        </S.BoxWithFlex>
      ) : (
        <EmptyState />
      )}
      <S.ButtonAbsolute>
        <Button
          variant="primary-rounded"
          label="Produto"
          icon="plus"
          width="154px"
          testID="product-list.add-product-button"
          onPress={() => navigation.navigate('product-put')}
        />
      </S.ButtonAbsolute>
    </PageContent>
  )
}
