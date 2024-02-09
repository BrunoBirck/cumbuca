import styled from 'styled-components/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import {ISwitchProps} from './types';
import React from 'react';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 32px;
`;

const SwitchContainer = styled.View<{isOn?: boolean}>`
  background-color: ${({theme, isOn}) =>
    isOn ? theme.colors.primary : theme.colors.disabled};
  border-radius: 24px;
  width: 100%;
  height: 32px;
  justify-content: center;
  padding-left: 4px;
  padding-right: 4px;
`;

const Handle = styled(Animated.View)`
  width: 24px;
  height: 24px;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 24px;
`;

export function Switch({value, onValueChange}: ISwitchProps) {
  const translateX = useSharedValue(value ? 25 : 0);

  const handlePress = () => {
    translateX.value = withTiming(
      value ? 0 : 25,
      {
        duration: 150,
      },
      isFinished => {
        if (isFinished) {
          runOnJS(onValueChange)(!value);
        }
      },
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <Wrapper>
      <SwitchContainer isOn={value} onTouchEnd={handlePress}>
        <Handle style={animatedStyle} />
      </SwitchContainer>
    </Wrapper>
  );
}
