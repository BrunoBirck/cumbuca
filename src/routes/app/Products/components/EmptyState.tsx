import React from 'react'
import {useTheme} from 'styled-components/native'
import {Icon} from '@components/Icon'
import Typography from '@components/Typography'
import * as S from './styles'

export function EmptyState() {
  const theme = useTheme()
  return (
    <S.BoxEmptyStateContainer>
      <S.BoxEmptyStateHeader>
        <Icon name="box" width={180} height={180} />
        <Typography variant="lg" semibold color={theme.colors.primary}>
          Ops!
        </Typography>
        <Typography>Nenhum produto encontrado.</Typography>
      </S.BoxEmptyStateHeader>
    </S.BoxEmptyStateContainer>
  )
}
