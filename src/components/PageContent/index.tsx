import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as S from './styles';
import {IPageContentProps} from './types';

export default function PageContent({
  children,
  backgroundColor,
  fullContent,
  isLoading,
  testID,
  noPaddingTop,
}: IPageContentProps) {
  const insets = useSafeAreaInsets();
  return (
    <S.Container testID={testID} paddingTop={noPaddingTop ? 0 : insets.top}>
      <S.SubContainer testID={`${testID}.child.1`}>
        <S.Content
          testID={`${testID}.child.2`}
          fullContent={fullContent}
          backgroundColor={backgroundColor}>
          {isLoading ? <ActivityIndicator /> : children}
        </S.Content>
      </S.SubContainer>
    </S.Container>
  );
}
