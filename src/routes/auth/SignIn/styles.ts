import styled from 'styled-components/native'

export const Box = styled.View`
  flex: 1;
  width: 100%;
`

export const BoxCentered = styled(Box)`
  align-items: center;
  justify-content: center;
`

export const BoxAccent = styled.View`
  align-self: flex-start;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: ${({theme}) => theme.spacers['sm-2']};
  padding: ${({theme}) => `${theme.spacers['sm-1']} ${theme.spacers['sm-2']}`};
  gap: ${({theme}) => theme.spacers['sm-1']};
  margin-bottom: ${({theme}) => theme.spacers['sm-3']};
`

export const BoxWithGap = styled(Box)`
  gap: ${({theme}) => theme.spacers['sm-3']};
  margin-bottom: ${({theme}) => theme.spacers['lg-1']};
  justify-content: flex-end;
  margin-top: ${({theme}) => theme.spacers['md-2']};
`
