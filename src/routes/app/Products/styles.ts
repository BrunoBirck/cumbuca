import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: ${({theme}) => `${theme.spacers['sm-3']} 0`};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HelloBox = styled.View``;

export const SettingsButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid ${({theme}) => theme.colors.primary};
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Filters = styled.View`
  width: 100%;
  padding-top: ${({theme}) => theme.spacers['md-3']};
  gap: ${({theme}) => theme.spacers['md-1']};
`;

export const OrderBy = styled(HelloBox)`
  width: 100%;
`;

export const ProductOrderByList = styled(ScrollView).attrs(({theme}) => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: theme.spacersRaw['sm-2'],
    paddingTop: theme.spacersRaw['sm-1'],
    paddingBottom: theme.spacersRaw['md-2'],
  },
}))``;

export const ButtonAbsolute = styled.View`
  position: absolute;
  right: 20px;
  bottom: 44px;
  padding: ${({theme}) => theme.spacers['sm-1']};
  z-index: 1;
`;
