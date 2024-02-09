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
  border-radius: 24px;
  width: 100%;
  height: 32px;
  justify-content: center;
  padding-left: 4px;
  padding-right: 4px;
`;

export const Handle = styled(Animated.View)`
  width: 24px;
  height: 24px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 24px;
`;
