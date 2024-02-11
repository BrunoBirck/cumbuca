import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {useTheme} from 'styled-components/native';

export function Input(props: IInputProps) {
  const theme = useTheme();
  const {
    label,
    errorText,
    value,
    onBlur,
    onFocus,
    secureTextEntry,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const iconName = useMemo(() => {
    if (errorText && showPassword) {
      return 'eye-close-error';
    }
    if (errorText && !showPassword) {
      return 'eye-open-error';
    }
    if (showPassword) {
      return 'eye-close';
    }
    return 'eye-open';
  }, [errorText, showPassword]);

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
        error={!!restOfProps.error}
        isFocused={isFocused}
        secureTextEntry={secureTextEntry && !showPassword}
      />
      {secureTextEntry && (
        <TouchableWithoutFeedback
          onPress={() => setShowPassword(!showPassword)}>
          <S.IconContainer>
            <Icon
              name={iconName}
              width={theme.spacersRaw['md-3']}
              height={theme.spacersRaw['md-3']}
            />
          </S.IconContainer>
        </TouchableWithoutFeedback>
      )}
      <TouchableWithoutFeedback
        onPress={() => (inputRef.current as TextInput | null)?.focus()}>
        <S.LabelContainer style={animatedStyle}>
          <S.StyledLabel error={!!restOfProps.error} isFocused={isFocused}>
            {label}
          </S.StyledLabel>
        </S.LabelContainer>
      </TouchableWithoutFeedback>
    </S.Container>
  );
}
