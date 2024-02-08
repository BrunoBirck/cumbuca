import React from 'react';
import * as S from './styles';
import {ICardProps} from './types';

export function Card({children}: ICardProps) {
  return <S.Container>{children}</S.Container>;
}
