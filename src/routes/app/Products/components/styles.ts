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
  gap: 4px;
`;

export const TrashBox = styled.View`
  width: 4%;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
`;

export const Column = styled.View``;

export const ColumnWithFlex = styled.View`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 4px;
`;
