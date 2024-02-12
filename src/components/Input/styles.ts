import styled from 'styled-components/native';
import {Animated} from 'react-native'; // Importando Animated do react-native

export const Container = styled.View`
  width: 100%;
`;

export const StyledTextInput = styled.TextInput<{
  error?: boolean;
  isFocused?: boolean;
  ref?: React.RefObject<any>;
}>`
  padding: ${({theme}) => theme.spacers['md-1']};
  border-bottom-width: 2px;
  font-family: 'Poppins-Semibold';
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${({theme}) => theme.spacers['md-1']};
  color: ${({theme}) => theme.colors.text};
  border-color: ${props =>
    props.error
      ? props.theme.colors.error
      : props.isFocused
      ? props.theme.colors.primary
      : props.theme.colors.placeholder};
`;

export const LabelContainer = styled(Animated.View)`
  position: absolute;
  padding-horizontal: ${({theme}) => theme.spacers['sm-2']};
`;

export const StyledLabel = styled.Text<{error?: boolean; isFocused?: boolean}>`
  font-family: 'Poppins-Semibold';
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${({theme}) => theme.spacers['md-1']};
  color: ${props =>
    props.error
      ? props.theme.colors.error
      : props.isFocused
      ? props.theme.colors.primary
      : props.theme.colors.placeholder};
`;

export const ErrorText = styled.Text`
  margin-top: ${({theme}) => theme.spacers['sm-1']};
  margin-left: ${({theme}) => theme.spacers['sm-3']};
  font-size: ${({theme}) => theme.spacers['sm-3']};
  color: ${props => props.theme.colors.error};
  font-family: 'Poppins-Semibold';
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

export const IconContainer = styled.View`
  position: absolute;
  top: 25%;
  right: ${({theme}) => theme.spacers['sm-3']};
  padding: 10px;
  z-index: 1;
`;
