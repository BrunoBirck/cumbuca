import styled from 'styled-components/native';

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({theme}) => theme.spacers['sm-2']};
  margin-top: ${({theme}) => theme.spacers['sm-1']};
`;
