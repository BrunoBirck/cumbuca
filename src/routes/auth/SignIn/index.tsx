import {Button} from '@components/Button';
import {ControlledInput} from '@components/ControlledInput';
import {Icon} from '@components/Icon';
import PageContent from '@components/PageContent';
import Typography from '@components/Typography';
import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import * as S from './styles';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import * as yup from 'yup';
import {ISignInPutForm} from './types';
import {yupResolver} from '@hookform/resolvers/yup';

export function SignIn() {
  const schema = yup.object({
    cpf: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignInPutForm>({
    resolver: yupResolver(schema),
  });
  const onSubmit = useCallback((data: ISignInPutForm) => {
    console.log(data);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PageContent>
          <S.BoxCentered>
            <Icon name="logo" width={220} height={124} />
          </S.BoxCentered>
          <S.Box>
            <Typography variant="lg">Bem-vindo a sua</Typography>
            <S.BoxAccent>
              <Typography variant="xl" semibold>
                Cumbuca!
              </Typography>
            </S.BoxAccent>
            <Typography>
              Este app é resultado de um teste técnico para vaga mobile senior
              da startup Cumbuca e você pode aproveitar as vantagens fazendo
              login.
            </Typography>
          </S.Box>
          <S.Box>
            <S.BoxWithGap>
              <ControlledInput
                errors={errors.cpf}
                control={control}
                name="cpf"
                label="CPF"
              />
              <ControlledInput
                secureTextEntry
                errors={errors.password}
                control={control}
                name="password"
                label="Senha"
              />
            </S.BoxWithGap>
            <S.BoxCentered>
              <Button
                label="Entrar"
                icon="signout"
                onPress={handleSubmit(onSubmit)}
              />
            </S.BoxCentered>
          </S.Box>
        </PageContent>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
