import React from 'react'
import {Controller} from 'react-hook-form'
import {useTheme} from 'styled-components/native'
import {Icon} from '@components/Icon'
import {Input} from '@components/Input'
import Typography from '@components/Typography'
import * as S from './styles'
import {IControlledInputProps} from './types'

export function ControlledInput({
  control,
  name,
  errors,
  maskFunction,
  ...rest
}: IControlledInputProps) {
  const theme = useTheme()
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            {...rest}
            onBlur={onBlur}
            onChangeText={text =>
              onChange(maskFunction ? maskFunction(text) : text)
            }
            value={value}
            errorText={errors?.message}
            error={!!errors}
          />
        )}
      />
      {!!errors && (
        <S.ErrorContainer testID={`${rest.testID}.error`}>
          <Icon name="warning" width={18} height={18} />
          <Typography
            testID={`${rest.testID}.error.message`}
            variant="sm"
            color={theme.colors.error}>
            {errors.message}
          </Typography>
        </S.ErrorContainer>
      )}
    </>
  )
}
