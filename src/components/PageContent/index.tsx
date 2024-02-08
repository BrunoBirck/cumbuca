import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';

interface IPageContentProps {
  children: React.ReactNode;
  backgroundColor?: string;
  fullContent?: boolean;
  isLoading?: boolean;
  testID?: string;
  noPaddingTop?: boolean;
}

export default function PageContent({
  children,
  backgroundColor,
  fullContent,
  isLoading,
  testID,
  noPaddingTop,
}: IPageContentProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View
      testID={testID}
      style={{
        flex: 1,
        width: '100%',
        paddingTop: noPaddingTop ? 0 : insets.top,
      }}>
      <View
        testID={`${testID}.child.1`}
        style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View
          testID={`${testID}.child.2`}
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: backgroundColor ?? theme.colors.background,
            alignItems: 'center',
            paddingHorizontal: fullContent ? 0 : 24,
          }}>
          {isLoading ? <ActivityIndicator /> : children}
        </View>
      </View>
    </View>
  );
}
