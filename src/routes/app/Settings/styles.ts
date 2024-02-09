import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Box = styled.View`
  width: 100%;
  gap: ${({theme}) => theme.spacers['sm-2']};
  margin-bottom: ${({theme}) => theme.spacers['md-2']};
`;
