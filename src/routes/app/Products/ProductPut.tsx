import PageContent from '@components/PageContent';
import {PageHeader} from '@components/PageHeader';
import Typography from '@components/Typography';
import React, {useCallback} from 'react';
import * as S from './styles';
import {ControlledInput} from '@components/ControlledInput';
import {useForm} from 'react-hook-form';
import {Button} from '@components/Button';
import {Keyboard, Pressable} from 'react-native';
import {IProductPutFormData} from './types';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToast} from '@providers/toast/useToast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStack} from '..';
import {
  createNewProduct,
  verifyProductExistsByName,
} from '@services/storage/products';

export function ProductPut() {
  const navigation = useNavigation<NavigationProp<AppStack>>();
  const {show} = useToast();

  const schema = yup.object({
    name: yup.string().required('Campo obrigatório'),
    quantity: yup
      .number()
      .typeError('O campo precisa ser um número')
      .required('Campo obrigatório')
      .min(1, 'Precisa ter pelo menos 1 unidade'),
    unityPrice: yup
      .number()
      .typeError('O campo precisa ser um número')
      .required('Campo obrigatório')
      .min(0.01, 'O valor mínimo é R$ 0,01'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IProductPutFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    (data: IProductPutFormData) => {
      try {
        const productAlreadyExists = verifyProductExistsByName(data.name);
        if (productAlreadyExists) {
          show('Produto já cadastrado', 'error');
          return;
        }
        const product = createNewProduct(data);
        if (product?.id) {
          show('Produto cadastrado com sucesso', 'success');
          navigation.navigate('product-list');
        }
      } catch (error) {
        show('Erro ao cadastrar produto', 'error');
      }
    },
    [navigation, show],
  );
  return (
    <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
      <PageContent>
        <S.ProductPutContainer>
          <S.Box>
            <PageHeader title="Novo produto" />
            <Typography>
              Para adicionar um novo produto é só preencher os campos abaixo.
            </Typography>
            <S.FormWrapper>
              <ControlledInput
                control={control}
                name="name"
                label="Nome"
                errors={errors.name}
              />
              <ControlledInput
                control={control}
                name="quantity"
                label="Estoque"
                errors={errors.quantity}
                keyboardType="number-pad"
              />
              <ControlledInput
                control={control}
                name="unityPrice"
                label="Valor unitário (R$)"
                errors={errors.unityPrice}
                keyboardType="number-pad"
              />
            </S.FormWrapper>
          </S.Box>
        </S.ProductPutContainer>
        <S.Footer>
          <Button
            label="Cadastrar"
            icon="plus"
            onPress={handleSubmit(onSubmit)}
          />
        </S.Footer>
      </PageContent>
    </Pressable>
  );
}
