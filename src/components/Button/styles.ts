import styled from 'styled-components/native';
import {IButtonStylesProp} from './types';

export const Container = styled.Pressable<IButtonStylesProp>`
  display: flex;
  background-color: ${({variant, theme}) => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'primary-rounded':
        return theme.colors.primary;
      case 'danger':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  }};
  width: ${({width}) => width};
  height: ${({height}) => height};
  align-items: ${({alignItems}) => alignItems ?? 'center'};
  justify-content: ${({justifyContent}) => justifyContent ?? 'center'};
  border-radius: ${({variant}) =>
    variant === 'primary-rounded' ? '55px' : '12px'};
  padding: 10px;
  flex-direction: row;
`;
