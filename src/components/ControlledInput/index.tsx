import React from 'react';
import {IControlledInputProps} from './types';
import {Controller} from 'react-hook-form';
import {Input} from '@components/Input';

export function ControlledInput({
  control,
  name,
  errors,
  ...rest
}: IControlledInputProps) {
  return (
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
        />
      )}
    />
  );
}
