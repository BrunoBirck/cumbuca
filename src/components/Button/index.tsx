import * as S from './styles';
import {IButtonProps} from './types';
import Typography from '../Typography';
import {useTheme} from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import React from 'react';
import {Icon} from '@components/Icon';

export function Button({
  label,
  loading,
  icon,
  variant = 'primary',
  height = '55px',
  width = '100%',
  testID,
  ...props
}: IButtonProps) {
  const theme = useTheme();
  const color = () => {
    if (variant === 'danger') {
      return theme.colors.white;
    }
    return theme.colors.text;
  };
  return (
    <S.Container
      testID={testID}
      variant={variant}
      height={height}
      width={width}
      {...props}>
      {!loading && icon && (
        <Icon testID={`${testID}.icon`} name={icon} width={24} height={24} />
      )}
      {label && !loading && (
        <Typography
          color={color()}
          testID={`${testID}.text`}
          variant="lg"
          semibold>
          {label}
        </Typography>
      )}
      {loading && (
        <ActivityIndicator testID={`${testID}.loading`} color={color()} />
      )}
    </S.Container>
  );
}
