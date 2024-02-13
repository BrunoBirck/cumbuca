import React, {useCallback} from 'react'
import {Keyboard, Pressable} from 'react-native'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {Button} from '@components/Button'
import {ControlledInput} from '@components/ControlledInput'
import PageContent from '@components/PageContent'
import {PageHeader} from '@components/PageHeader'
import Typography from '@components/Typography'
import {useToast} from '@providers/toast/useToast'
import {createNewProduct, verifyProductExistsByName} from '@services/storage'
import {AppStack} from '..'
import * as S from './styles'
import {IProductPutFormData} from './types'

export function ProductPut() {
  const navigation = useNavigation<NavigationProp<AppStack>>()
  const {show} = useToast()

  const schema = yup.object({
    name: yup
      .string()
      .typeError('O campo precisa ser um texto')
      .required('Campo obrigatório'),
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
  })

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IProductPutFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(
    (data: IProductPutFormData) => {
      try {
        const productAlreadyExists = verifyProductExistsByName(data.name)
        if (productAlreadyExists) {
          show('Produto já cadastrado', 'error')
          return
        }
        const product = createNewProduct(data)
        if (product?.id) {
          show('Produto cadastrado com sucesso', 'success')
          navigation.navigate('product-list')
        }
      } catch (error) {
        show('Erro ao cadastrar produto', 'error')
      }
    },
    [navigation, show],
  )
  return (
    <PageContent testID="product-put.page">
      <Pressable onPress={Keyboard.dismiss} style={{flex: 1, width: '100%'}}>
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
                testID="product-put.name.input"
              />
              <ControlledInput
                control={control}
                name="quantity"
                label="Estoque"
                errors={errors.quantity}
                keyboardType="number-pad"
                testID="product-put.quantity.input"
              />
              <ControlledInput
                control={control}
                name="unityPrice"
                label="Valor unitário (R$)"
                errors={errors.unityPrice}
                keyboardType="number-pad"
                testID="product-put.unity-price.input"
              />
            </S.FormWrapper>
          </S.Box>
        </S.ProductPutContainer>
      </Pressable>
      <S.Footer testID="footer">
        <Button
          label="Cadastrar"
          icon="plus"
          testID="product-put.submit.button"
          onPress={handleSubmit(onSubmit)}
        />
      </S.Footer>
    </PageContent>
  )
}
