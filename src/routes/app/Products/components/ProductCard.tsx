import {Card} from '@components/Card';
import {Icon} from '@components/Icon';
import Typography from '@components/Typography';
import React from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import * as S from './styles';
import {IProduct} from 'src/types/Product';
import {formatMoney} from '@utils/formatMoney';
import {removeProduct, updateProductQuantity} from '@services/storage/products';

export function ProductCard({
  product,
  onLongPress,
  onPressOut,
  isActive,
}: {
  product: IProduct;
  isActive?: boolean;
  onLongPress?: () => void;
  onPressOut?: () => void;
}) {
  const theme = useTheme();
  return (
    <Card onLongPress={onLongPress} onPressOut={onPressOut} isActive={isActive}>
      <S.Container>
        <S.BoxWithGap>
          <S.Row>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              ID:
            </Typography>
            <Typography variant="sm">{product?.id}</Typography>
          </S.Row>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Nome:
            </Typography>
            <Typography variant="sm" numberOfLines={1}>
              {product?.name}
            </Typography>
          </S.Column>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Quantidade:
            </Typography>
            <S.BoxForQuantity>
              <Pressable
                onPress={() => updateProductQuantity(product.id, 'less')}>
                <Icon
                  name="less"
                  width={theme.spacersRaw['md-3']}
                  height={theme.spacersRaw['md-3']}
                />
              </Pressable>
              <Typography variant="sm">{product?.quantity}</Typography>
              <Pressable
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
            <Typography variant="sm">
              {formatMoney(product?.unityPrice)}
            </Typography>
          </S.ColumnWithFlex>
          <S.Column>
            <Typography variant="sm" semibold color={theme.colors.primary}>
              Valor total:
            </Typography>
            <Typography variant="sm">{formatMoney(product?.total)}</Typography>
          </S.Column>
        </S.Box>
        <S.TrashBox>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => removeProduct(product.id)}>
            <Icon
              name="trash"
              width={theme.spacersRaw['md-3']}
              height={theme.spacersRaw['md-3']}
            />
          </TouchableOpacity>
        </S.TrashBox>
      </S.Container>
    </Card>
  );
}
