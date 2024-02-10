import styled from 'styled-components/native';

export const Container = styled.Pressable<{isActive?: boolean}>`
  width: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  border: ${({theme, isActive}) => `1px solid ${isActive ? theme.colors.primary : theme.colors.border}`};
  background-color: ${({theme}) => theme.colors.background};
  padding: 9px;
  gap: 8px;
`;
