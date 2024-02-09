import React from 'react';
import {IControlledInputProps} from './types';
import {Controller} from 'react-hook-form';
import {Input} from '@components/Input';
import * as S from './styles';
import {Icon} from '@components/Icon';
import Typography from '@components/Typography';
import {useTheme} from 'styled-components/native';

export function ControlledInput({
  control,
  name,
  errors,
  ...rest
}: IControlledInputProps) {
  const theme = useTheme();
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            {...rest}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorText={errors?.message}
            error={!!errors}
          />
        )}
      />
      {!!errors && (
        <S.ErrorContainer>
          <Icon name="warning" width={18} height={18} />
          <Typography variant="sm" color={theme.colors.error}>
            {errors.message}
          </Typography>
        </S.ErrorContainer>
      )}
    </>
  );
}
