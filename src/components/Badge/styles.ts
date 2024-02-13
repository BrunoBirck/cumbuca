import styled from 'styled-components/native'

export const BadgeContainer = styled.TouchableOpacity<{
  backgroundColor: string
  borderColor: string
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({backgroundColor}) => backgroundColor};
  border: ${({borderColor}) => `1px solid ${borderColor}`};
  border-radius: ${({theme}) => theme.spacers['sm-2']};
  padding: ${({theme}) => `${theme.spacers['sm-1']} ${theme.spacers['sm-2']}`};
  gap: ${({theme}) => theme.spacers['sm-1']};
`
