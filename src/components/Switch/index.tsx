import React, {useEffect, useRef} from 'react'
import {Animated, Easing} from 'react-native'
import * as S from './styles'
import {ISwitchProps} from './types'

export function Switch({value, onValueChange, testID}: ISwitchProps) {
  const translateX = useRef(new Animated.Value(value ? 25 : 0)).current

  const handlePress = () => {
    Animated.timing(translateX, {
      toValue: value ? 0 : 25,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()

    setTimeout(() => {
      onValueChange(!value)
    }, 150)
  }

  const animatedStyle = {
    transform: [{translateX}],
  }

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: !value ? 0 : 25,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
  }, [value, translateX])

  return (
    <S.Wrapper>
      <S.SwitchContainer isOn={value} testID={testID} onTouchEnd={handlePress}>
        <S.Handle style={animatedStyle} />
      </S.SwitchContainer>
    </S.Wrapper>
  )
}
