import React, {useContext, useMemo} from 'react';
import {Animated, LayoutRectangle} from 'react-native';

export interface LayoutCache {
  [key: string]: LayoutRectangle;
}

type ContextProps<T> = {
  activeKey: string | null;
  activeIndex: number;
  keyExtractor: (item: T, index: number) => string;
  pan: Animated.Value;
  panIndex: number;
  layouts: LayoutCache;
  children: React.ReactNode;
};

type DragListContextValue<T> = Omit<ContextProps<T>, 'children'>;

const DragListContext = React.createContext<
  DragListContextValue<any> | undefined
>(undefined);

export function DragListProvider<T>({
  activeKey,
  activeIndex,
  keyExtractor,
  pan,
  panIndex,
  layouts,
  children,
}: ContextProps<T>) {
  const value = useMemo(
    () => ({activeKey, activeIndex, keyExtractor, pan, panIndex, layouts}),
    [activeKey, activeIndex, keyExtractor, pan, panIndex, layouts],
  );

  return (
    <DragListContext.Provider value={value}>
      {children}
    </DragListContext.Provider>
  );
}

export function useDragListContext<T>() {
  const value = useContext(DragListContext);
  if (!value) {
    throw new Error(
      'useDragListContext must be called within DragListProvider',
    );
  }
  return value as DragListContextValue<T>;
}
