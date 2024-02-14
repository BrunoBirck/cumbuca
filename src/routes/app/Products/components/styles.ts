import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  flex: 1;
`

export const Box = styled.View`
  width: 47%;
  justify-content: space-between;
  flex: 1;
`

export const BoxWithGap = styled(Box)`
  gap: ${({theme}) => theme.spacers['sm-1']};
`

export const TrashBox = styled.View`
  width: 4%;
  justify-content: center;
  align-items: center;
  padding-right: ${({theme}) => theme.spacers['sm-3']};
`

export const TrashButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Column = styled.View``

export const ColumnWithFlex = styled.View`
  flex: 1;
`

export const Row = styled.View`
  flex-direction: row;
  gap: ${({theme}) => theme.spacers['sm-1']};
`

export const BoxForQuantity = styled.View`
  width: 60%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const BoxEmptyStateContainer = styled(ColumnWithFlex)`
  width: 100%;
  justify-content: space-around;
`

export const BoxEmptyStateHeader = styled(ColumnWithFlex)`
  width: 100%;
  align-items: center;
`

export const BoxEmptyStateButton = styled(Column)`
  width: 100%;
  padding-bottom: ${({theme}) => theme.spacers['lg-1']};
`
