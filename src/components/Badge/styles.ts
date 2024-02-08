import styled from 'styled-components/native';

export const BadgeContainer = styled.TouchableOpacity<{
  backgroundColor: string;
  borderColor: string;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({backgroundColor}) => backgroundColor};
  border: ${({borderColor}) => `1px solid ${borderColor}`};
  border-radius: 8px;
  padding: 4px 8px;
  gap: 4px;
`;
