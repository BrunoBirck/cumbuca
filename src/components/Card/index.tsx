import React from 'react';
import * as S from './styles';
import {ICardProps} from './types';

export function Card({
  children,
  isActive,
  onLongPress,
  onPressOut,
}: ICardProps) {
  return (
    <S.Container
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      isActive={isActive}>
      {children}
    </S.Container>
  );
}
