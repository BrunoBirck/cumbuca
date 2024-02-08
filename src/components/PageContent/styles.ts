import styled from 'styled-components/native';

export const Container = styled.View<{paddingTop: number}>`
  flex: 1;
  width: 100%;
  padding-top: ${({paddingTop}) => paddingTop}px;
`;

export const SubContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Content = styled.View<{
  backgroundColor?: string;
  fullContent?: boolean;
}>`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor ?? theme.colors.background};
  padding: ${({fullContent}) => (fullContent ? 0 : '0 24px')};
`;
