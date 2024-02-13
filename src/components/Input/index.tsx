import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import {useTheme} from 'styled-components/native'
import {Icon} from '@components/Icon'
import * as S from './styles'
import {IInputProps} from './types'

export function Input(props: IInputProps) {
  const theme = useTheme()
  const {
    label,
    errorText,
    value,
    onBlur,
    onFocus,
    secureTextEntry,
    ...restOfProps
  } = props
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const inputRef = useRef<typeof S.StyledTextInput>(null)
  const focusAnim = useMemo(() => {
    return new Animated.Value(0)
  }, [])

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [focusAnim, isFocused, value])

  const animatedStyle = {
    transform: [
      {
        scale: focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.75],
          extrapolate: 'clamp',
        }),
      },
      {
        translateY: focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [24, -12],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: focusAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  const iconName = useMemo(() => {
    if (errorText && showPassword) {
      return 'eye-close-error'
    }
    if (errorText && !showPassword) {
      return 'eye-open-error'
    }
    if (showPassword) {
      return 'eye-close'
    }
    return 'eye-open'
  }, [errorText, showPassword])

  return (
    <S.Container>
      <S.StyledTextInput
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={event => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        onFocus={event => {
          setIsFocused(true)
          onFocus?.(event)
        }}
        error={!!restOfProps.error}
        isFocused={isFocused}
        secureTextEntry={secureTextEntry && !showPassword}
      />
      {secureTextEntry && (
        <TouchableWithoutFeedback
          testID="password-toggle-icon"
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
  )
}
