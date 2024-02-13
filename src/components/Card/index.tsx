import React from 'react'
import * as S from './styles'
import {ICardProps} from './types'

export function Card({
  children,
  isActive,
  onLongPress,
  onPressOut,
  testID,
}: ICardProps) {
  return (
    <S.Container
      testID={testID}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      isActive={isActive}>
      {children}
    </S.Container>
  )
}
