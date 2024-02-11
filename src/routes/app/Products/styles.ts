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

export const Box = styled(HelloBox)`
  width: 100%;
`;

export const BoxWithFlex = styled(Box)`
  flex: 1;
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
  right: ${({theme}) => theme.spacers['md-2']};
  bottom: ${({theme}) => theme.spacers['lg-2']};
  padding: ${({theme}) => theme.spacers['sm-1']};
  z-index: 1;
`;

export const FormWrapper = styled.View`
  width: 100%;
  gap: ${({theme}) => theme.spacers['md-3']};
  padding-top: ${({theme}) => theme.spacers['lg-1']};
`;

export const ProductPutContainer = styled(HelloBox)`
  width: 100%;
  flex: 1;
`;

export const Footer = styled(HelloBox)`
  width: 100%;
  padding-bottom: ${({theme}) => theme.spacers['md-3']};
`;
