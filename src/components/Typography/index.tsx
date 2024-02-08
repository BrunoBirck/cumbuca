import {useTheme} from 'styled-components/native';
import * as S from './styles';
import {ITypographyProps} from './types';
import React from 'react';

export default function Typography({
  variant = 'md',
  children,
  semibold,
  color,
  numberOfLines,
  textAlign,
  testID,
}: ITypographyProps) {
  const theme = useTheme();
  return (
    <S.Typography
      testID={testID}
      color={color ?? theme.colors.text}
      variant={variant}
      textAlign={textAlign}
      numberOfLines={numberOfLines}
      semibold={semibold}>
      {children}
    </S.Typography>
  );
}
