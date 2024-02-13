import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  Animated,
  FlatList,
  LayoutChangeEvent,
  LayoutRectangle,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  Platform,
  UIManager,
  View,
} from 'react-native'
import {CellRendererComponent} from './CellRendererComponent'
import {DragListProvider, LayoutCache} from './context'
import {ExtraData, Props, WithForwardRefType} from './types'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

function DragListImpl<T>(
  props: Props<T>,
  ref: React.ForwardedRef<FlatList<T>>,
) {
  const {
    data,
    keyExtractor,
    onDragEnd,
    onScroll,
    onLayout,
    renderItem,
    ...rest
  } = props
  const activeKey = useRef<string | null>(null)
  const activeIndex = useRef(-1)
  const panIndex = useRef(-1)
  const [extra, setExtra] = useState<ExtraData>({
    activeKey: activeKey.current,
    panIndex: -1,
  })
  const layouts = useRef<LayoutCache>({}).current
  const dataRef = useRef(data)
  const panGrantedRef = useRef(false)
  const hoverRef = useRef(props.onHoverChanged)
  const reorderRef = useRef(props.onReordered)
  const flatRef = useRef<FlatList<T> | null>(null)
  const flatWrapRef = useRef<View>(null)
  const flatWrapLayout = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  })
  const scrollPos = useRef(0)
  const pan = useRef(new Animated.Value(0)).current
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => !!activeKey.current,
      onStartShouldSetPanResponder: () => !!activeKey.current,
      onMoveShouldSetPanResponder: () => !!activeKey.current,
      onMoveShouldSetPanResponderCapture: () => !!activeKey.current,
      onPanResponderGrant: (_, gestate) => {
        pan.setValue(gestate.dy)
        panGrantedRef.current = true

        flatWrapRef.current?.measureInWindow((x, y) => {
          flatWrapLayout.current = {...flatWrapLayout.current, x, y}
        })
      },
      onPanResponderMove: (_, gestate) => {
        const wrapY = gestate.y0 + gestate.dy - flatWrapLayout.current.y
        const clientY = wrapY + scrollPos.current

        if (activeKey.current && layouts.hasOwnProperty(activeKey.current)) {
          const dragItemHeight = layouts[activeKey.current].height
          const topEdge = wrapY - dragItemHeight / 2
          const bottomEdge = wrapY + dragItemHeight / 2
          let offset = 0

          if (topEdge < 0) {
            offset =
              scrollPos.current >= dragItemHeight
                ? -dragItemHeight
                : -scrollPos.current
          } else if (bottomEdge > flatWrapLayout.current.height) {
            offset = scrollPos.current + dragItemHeight
          }
          if (offset !== 0) {
            flatRef.current?.scrollToOffset({
              animated: true,
              offset: scrollPos.current + offset,
            })
          }

          let curIndex = 0
          let key
          while (
            curIndex < dataRef.current.length &&
            layouts.hasOwnProperty(
              (key = keyExtractor(dataRef.current[curIndex])),
            ) &&
            layouts[key].y + layouts[key].height < clientY
          ) {
            curIndex++
          }

          pan.setValue(
            clientY - (layouts[activeKey.current].y + dragItemHeight / 2),
          )

          if (panIndex.current != curIndex) {
            setExtra({...extra, panIndex: curIndex})
            hoverRef.current?.(curIndex)
          }
          panIndex.current = curIndex
        }
      },
      onPanResponderRelease: async (_, _gestate) => {
        onDragEnd?.()
        if (
          activeIndex.current !== panIndex.current &&
          !(
            activeIndex.current === dataRef.current.length - 1 &&
            panIndex.current > activeIndex.current
          )
        ) {
          await reorderRef.current?.(activeIndex.current, panIndex.current)
        }
        reset()
      },
    }),
  ).current

  const reset = useCallback(() => {
    activeIndex.current = -1
    activeKey.current = null
    panIndex.current = -1
    setExtra({activeKey: null, panIndex: -1})
    pan.setValue(0)
    panGrantedRef.current = false
  }, [pan])

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    reorderRef.current = props.onReordered
  }, [props.onReordered])

  const renderDragItem = useCallback(
    (info: ListRenderItemInfo<T>) => {
      const key = keyExtractor(info.item)
      const isActive = key === activeKey.current
      const onDragStart = () => {
        if (data.length > 1) {
          activeIndex.current = info.index
          activeKey.current = key
          panIndex.current = activeIndex.current
          setExtra({activeKey: key, panIndex: info.index})
        }
      }
      const onDragEnd = () => {
        if (activeKey.current !== null && !panGrantedRef.current) {
          reset()
        }
      }

      return props.renderItem({
        ...info,
        onDragStart,
        onDragEnd,
        isActive,
      })
    },
    [keyExtractor, props, data.length, reset],
  )

  const onDragScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollPos.current = event.nativeEvent.contentOffset.y
      if (onScroll) {
        onScroll(event)
      }
    },
    [onScroll],
  )

  const onDragLayout = useCallback(
    (evt: LayoutChangeEvent) => {
      flatWrapRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        flatWrapLayout.current = {x: pageX, y: pageY, width, height}
      })
      if (onLayout) {
        onLayout(evt)
      }
    },
    [onLayout],
  )
  return (
    <DragListProvider
      activeKey={activeKey.current}
      activeIndex={activeIndex.current}
      keyExtractor={keyExtractor}
      pan={pan}
      panIndex={panIndex.current}
      layouts={layouts}>
      <View
        ref={flatWrapRef}
        {...panResponder.panHandlers}
        onLayout={onDragLayout}>
        <FlatList
          ref={r => {
            flatRef.current = r
            if (ref) {
              if (typeof ref === 'function') {
                ref(r)
              } else {
                ref.current = r
              }
            }
          }}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderDragItem}
          CellRendererComponent={CellRendererComponent}
          extraData={extra}
          scrollEnabled={!activeKey.current}
          onScroll={onDragScroll}
          scrollEventThrottle={16}
          removeClippedSubviews={false}
          {...rest}
        />
      </View>
    </DragListProvider>
  )
}

const DragList: WithForwardRefType = React.forwardRef(DragListImpl)

export default DragList
