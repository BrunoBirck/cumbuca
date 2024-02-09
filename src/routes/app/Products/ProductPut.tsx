import PageContent from '@components/PageContent';
import {PageHeader} from '@components/PageHeader';
import Typography from '@components/Typography';
import React from 'react';
import * as S from './styles';
import {ControlledInput} from '@components/ControlledInput';
import {useForm} from 'react-hook-form';
import {Button} from '@components/Button';
import {Keyboard, Pressable} from 'react-native';

export function ProductPut() {
  const {control} = useForm();
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
              <ControlledInput control={control} name="name" label="Nome" />
              <ControlledInput
                control={control}
                name="quantity"
                label="Estoque"
              />
              <ControlledInput
                control={control}
                name="unit-price"
                label="Valor unitário"
              />
            </S.FormWrapper>
          </S.Box>
        </S.ProductPutContainer>
        <S.Footer>
          <Button label="Cadastrar" icon="plus" />
        </S.Footer>
      </PageContent>
    </Pressable>
  );
}
