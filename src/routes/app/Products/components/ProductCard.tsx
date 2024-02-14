import React from 'react'
import {Pressable} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Card} from '@components/Card'
import {Icon} from '@components/Icon'
import Typography from '@components/Typography'
import {removeProduct, updateProductQuantity} from '@services/storage'
import {formatMoney} from '@utils/formatMoney'
import {IProduct} from 'src/types/Product'
import * as S from './styles'

export function ProductCard({
  product,
  onLongPress,
  onPressOut,
  isActive,
  testID,
}: {
  product: IProduct
  isActive?: boolean
  onLongPress?: () => void
  onPressOut?: () => void
  testID?: string
}) {
  const theme = useTheme()
  return (
    <Card
      testID={testID}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      isActive={isActive}>
      <S.Container>
        <S.BoxWithGap>
          <S.Row>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              ID:
            </Typography>
            <Typography variant="sm" testID={`${testID}.id`}>
              {product?.id}
            </Typography>
          </S.Row>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Nome:
            </Typography>
            <Typography
              variant="sm"
              numberOfLines={1}
              testID={`${testID}.name`}>
              {product?.name}
            </Typography>
          </S.Column>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Quantidade:
            </Typography>
            <S.BoxForQuantity>
              <Pressable
                testID={`${testID}.less.button`}
                onPress={() => updateProductQuantity(product.id, 'less')}>
                <Icon
                  name="less"
                  width={theme.spacersRaw['md-3']}
                  height={theme.spacersRaw['md-3']}
                />
              </Pressable>
              <Typography variant="sm" testID={`${testID}.quantity`}>
                {product?.quantity}
              </Typography>
              <Pressable
                testID={`${testID}.more.button`}
                onPress={() => updateProductQuantity(product.id, 'sum')}>
                <Icon
                  name="plus"
                  width={theme.spacersRaw['md-3']}
                  height={theme.spacersRaw['md-3']}
                />
              </Pressable>
            </S.BoxForQuantity>
          </S.Column>
        </S.BoxWithGap>
        <S.Box>
          <S.ColumnWithFlex>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Valor unitário:
            </Typography>
            <Typography variant="sm" testID={`${testID}.unity-price`}>
              {formatMoney(product?.unityPrice)}
            </Typography>
          </S.ColumnWithFlex>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Valor total:
            </Typography>
            <Typography variant="sm" testID={`${testID}.total-price`}>
              {formatMoney(product?.total)}
            </Typography>
          </S.Column>
        </S.Box>
        <S.TrashBox>
          <S.TrashButton
            activeOpacity={0.8}
            testID={`${testID}.delete.button`}
            onPress={() => removeProduct(product.id)}>
            <Icon
              name="trash"
              width={theme.spacersRaw['md-3']}
              height={theme.spacersRaw['md-3']}
            />
          </S.TrashButton>
        </S.TrashBox>
      </S.Container>
    </Card>
  )
}
