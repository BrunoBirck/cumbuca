import {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import {ISwitchProps} from './types';
import React from 'react';
import * as S from './styles';

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
    <S.Wrapper>
      <S.SwitchContainer isOn={value} onTouchEnd={handlePress}>
        <S.Handle style={animatedStyle} />
      </S.SwitchContainer>
    </S.Wrapper>
  );
}
