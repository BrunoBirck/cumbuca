import React, {useEffect, useRef, useState} from 'react';
import {TextInput, TouchableWithoutFeedback} from 'react-native';
import {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as S from './styles';
import {IInputProps} from './types';
import {Icon} from '@components/Icon';
import Typography from '@components/Typography';
import {useTheme} from 'styled-components/native';

export function Input(props: IInputProps) {
  const theme = useTheme();
  const {label, errorText, value, onBlur, onFocus, ...restOfProps} = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<typeof S.StyledTextInput>(null);
  const focusAnim = useSharedValue(0);

  useEffect(() => {
    focusAnim.value = withTiming(isFocused || !!value ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [focusAnim, isFocused, value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            focusAnim.value,
            [0, 1],
            [1, 0.75],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            focusAnim.value,
            [0, 1],
            [24, -12],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            focusAnim.value,
            [0, 1],
            [16, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <S.Container>
      <S.StyledTextInput
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        error={!!errorText}
        isFocused={isFocused}
      />
      <TouchableWithoutFeedback
        onPress={() => (inputRef.current as TextInput | null)?.focus()}>
        <S.LabelContainer style={animatedStyle}>
          <S.StyledLabel error={!!errorText} isFocused={isFocused}>
            {label}
          </S.StyledLabel>
        </S.LabelContainer>
      </TouchableWithoutFeedback>
      {!!errorText && (
        <S.ErrorContainer>
          <Icon name="warning" width={18} height={18} />
          <Typography variant="sm" color={theme.colors.error}>
            {errorText}
          </Typography>
        </S.ErrorContainer>
      )}
    </S.Container>
  );
}
