import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface DragListRenderItemInfo<T> extends ListRenderItemInfo<T> {
  onDragStart: () => void;
  onDragEnd: () => void;
  isActive: boolean;
}

export interface ExtraData {
  activeKey: string | null;
  panIndex: number;
}

export interface Props<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  ref?: React.ForwardedRef<FlatList<T>>;
  keyExtractor: (item: T) => string;
  renderItem: (info: DragListRenderItemInfo<T>) => React.ReactElement | null;
  onDragEnd?: () => void;
  onHoverChanged?: (hoverIndex: number) => Promise<void> | void;
  onReordered?: (fromIndex: number, toIndex: number) => Promise<void> | void;
}

export type CellRendererProps<T> = {
  item: T;
  index: number;
  children: React.ReactNode;
  onLayout?: (e: LayoutChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export interface WithForwardRefType extends React.FC<Props<any>> {
  <T>(props: Props<T>): ReturnType<React.FC<Props<T>>>;
}
