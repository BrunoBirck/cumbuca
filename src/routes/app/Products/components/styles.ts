import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export const Box = styled.View`
  width: 47%;
  justify-content: space-between;
  flex: 1;
`;

export const BoxWithGap = styled(Box)`
  gap: ${({theme}) => theme.spacers['sm-1']};
`;

export const TrashBox = styled.View`
  width: 4%;
  justify-content: center;
  align-items: center;
  padding-right: ${({theme}) => theme.spacers['sm-3']};
`;

export const Column = styled.View``;

export const ColumnWithFlex = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: ${({theme}) => theme.spacers['sm-1']};
`;

export const BoxForQuantity = styled.View`
  width: 60%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
