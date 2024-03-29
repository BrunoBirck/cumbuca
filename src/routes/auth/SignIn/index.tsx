import React, {useCallback} from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import {yupResolver} from '@hookform/resolvers/yup'
import ReactNativeBiometrics from 'react-native-biometrics'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {Button} from '@components/Button'
import {ControlledInput} from '@components/ControlledInput'
import {Icon} from '@components/Icon'
import PageContent from '@components/PageContent'
import Typography from '@components/Typography'
import useAuth from '@providers/authorization/useAuth'
import {useToast} from '@providers/toast/useToast'
import {getUser} from '@services/storage'
import {formatCPF, isValidCpf} from '@utils/validateCpf'
import * as S from './styles'
import {ISignInPutForm} from './types'


const rnBiometrics = new ReactNativeBiometrics()

export function SignIn() {
  const {signIn, loading} = useAuth()
  const {show} = useToast()
  const schema = yup.object({
    cpf: yup
      .string()
      .required('Campo obrigatório')
      .min(14, 'O CPF deve ter 11 dígitos')
      .test('CPF válido', 'CPF inválido', value => isValidCpf(value)),
    password: yup
      .string()
      .required('Campo obrigatório')
      .min(8, 'A senha precisa ter no mínimo 8 dígitos'),
  })
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<ISignInPutForm>({
    resolver: yupResolver(schema),
  })
  const onSubmit = useCallback(
    async (data: ISignInPutForm) => {
      Keyboard.dismiss()
      try {
        const response = await signIn(data.cpf, data.password)
        if (response instanceof Error) {
          throw new Error(response.message)
        }
      } catch (error) {
        if (error instanceof Error) {
          show(error.message, 'error')
        }
      }
    },
    [show, signIn],
  )

  const handleVerifyBiometrics = useCallback(async () => {
    Keyboard.dismiss()
    const cpf = getValues('cpf')
    const user = getUser(cpf)
    if (user?.isBiometricActive) {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Login com biometria',
      })
      if (success) {
        try {
          const response = await signIn(cpf, user.password)
          if (response instanceof Error) {
            throw new Error(response.message)
          }
        } catch (error) {
          if (error instanceof Error) {
            show(error.message, 'error')
          }
        }
      }
    }
  }, [getValues, show, signIn])

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
                maskFunction={formatCPF}
                keyboardType="number-pad"
                onEndEditing={handleVerifyBiometrics}
                onSubmitEditing={handleVerifyBiometrics}
                testID="cpf.input"
              />
              <ControlledInput
                secureTextEntry
                errors={errors.password}
                control={control}
                name="password"
                label="Senha"
                onSubmitEditing={handleSubmit(onSubmit)}
                testID="password.input"
              />
            </S.BoxWithGap>
            <S.BoxCentered>
              <Button
                label="Entrar"
                icon="signout"
                loading={loading}
                onPress={handleSubmit(onSubmit)}
                testID="submit.button"
              />
            </S.BoxCentered>
          </S.Box>
        </PageContent>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
