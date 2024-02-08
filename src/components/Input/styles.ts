import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  width: 100%;
`;

export const StyledTextInput = styled.TextInput<{
  error?: boolean;
  isFocused?: boolean;
  ref?: React.RefObject<any>;
}>`
  padding: 16px;
  border-bottom-width: 2px;
  font-family: 'Poppins-Semibold';
  font-size: 16px;
  border-color: ${props =>
    props.error
      ? props.theme.colors.error
      : props.isFocused
      ? props.theme.colors.primary
      : props.theme.colors.placeholder};
`;

export const LabelContainer = styled(Animated.View)`
  position: absolute;
  padding-horizontal: 8px;
`;

export const StyledLabel = styled.Text<{error?: boolean; isFocused?: boolean}>`
  font-family: 'Poppins-Semibold';
  font-size: 16px;
  color: ${props =>
    props.error
      ? props.theme.colors.error
      : props.isFocused
      ? props.theme.colors.primary
      : props.theme.colors.placeholder};
`;

export const ErrorText = styled.Text`
  margin-top: 4px;
  margin-left: 12px;
  font-size: 12px;
  color: ${props => props.theme.colors.error};
  font-family: 'Poppins-Semibold';
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;
