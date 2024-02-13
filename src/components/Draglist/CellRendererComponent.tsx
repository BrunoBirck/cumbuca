import React, {useEffect, useRef, useState} from 'react'
import {Animated, Easing, LayoutChangeEvent, View} from 'react-native'
import {useDragListContext} from './context'
import {CellRendererProps} from './types'

const SLIDE_MILLIS = 300

export function CellRendererComponent<T>(props: CellRendererProps<T>) {
  const {item, index, children, style, onLayout, ...rest} = props
  const {keyExtractor, activeKey, activeIndex, pan, panIndex, layouts} =
    useDragListContext<T>()
  const [isOffset, setIsOffset] = useState(false)
  const key = keyExtractor(item, index)
  const isActive = key === activeKey
  const ref = useRef<View>(null)
  const anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (activeKey && !isActive && layouts.hasOwnProperty(activeKey)) {
      if (index >= panIndex && index <= activeIndex) {
        Animated.timing(anim, {
          duration: SLIDE_MILLIS,
          easing: Easing.inOut(Easing.linear),
          toValue: layouts[activeKey].height,
          useNativeDriver: true,
        }).start()
        setIsOffset(true)
        return
      } else if (index >= activeIndex && index <= panIndex) {
        Animated.timing(anim, {
          duration: SLIDE_MILLIS,
          easing: Easing.inOut(Easing.linear),
          toValue: -layouts[activeKey].height,
          useNativeDriver: true,
        }).start()
        setIsOffset(true)
        return
      }
    }
    if (!activeKey) {
      anim.setValue(0)
    }
    setIsOffset(false)
  }, [activeKey, index, panIndex, key, activeIndex, isActive, layouts, anim])

  useEffect(() => {
    if (!isOffset) {
      Animated.timing(anim, {
        duration: SLIDE_MILLIS,
        easing: Easing.inOut(Easing.linear),
        toValue: 0,
        useNativeDriver: true,
      }).start()
    }
  }, [anim, isOffset])

  function onCellLayout(evt: LayoutChangeEvent) {
    if (onLayout) {
      onLayout(evt)
    }

    layouts[key] = {...evt.nativeEvent.layout}
  }

  return (
    <Animated.View
      ref={ref}
      key={key}
      {...rest}
      style={[
        style,
        isActive
          ? {
              elevation: 1,
              zIndex: 999,
              transform: [{translateY: pan}],
            }
          : {elevation: 0, zIndex: 0, transform: [{translateY: anim}]},
      ]}
      onLayout={onCellLayout}>
      {children}
    </Animated.View>
  )
}
