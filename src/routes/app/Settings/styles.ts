import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({theme}) => theme.spacers['md-3']};
`;

export const Box = styled.View`
  width: 100%;
  gap: ${({theme}) => theme.spacers['sm-2']};
  margin-bottom: ${({theme}) => theme.spacers['md-2']};
`;
