import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 32px;
`;

export const SwitchContainer = styled.View<{isOn?: boolean}>`
  background-color: ${({theme, isOn}) =>
    isOn ? theme.colors.primary : theme.colors.disabled};
  border-radius: ${({theme}) => theme.spacers['md-3']};
  width: 100%;
  height: 32px;
  justify-content: center;
  padding-left: ${({theme}) => theme.spacers['sm-1']};
  padding-right: ${({theme}) => theme.spacers['sm-1']};
`;

export const Handle = styled(Animated.View)`
  width: ${({theme}) => theme.spacers['md-3']};
  height: ${({theme}) => theme.spacers['md-3']};
  background-color: ${({theme}) => theme.colors.background};
  border-radius: ${({theme}) => theme.spacers['md-3']};
`;
