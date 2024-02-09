import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  border: ${({theme}) => `1px solid ${theme.colors.border}`};
  background-color: ${({theme}) => theme.colors.background};
  padding: 9px;
  gap: 8px;
`;
