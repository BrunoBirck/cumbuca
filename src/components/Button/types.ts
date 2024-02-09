import {IconName} from '@components/Icon/types';
import {PressableProps} from 'react-native';

export interface IButtonStylesProp {
  variant?: 'primary' | 'primary-rounded' | 'danger';
  width?: string;
  height?: string;
  alignItems?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
}

export interface IButtonProps extends IButtonStylesProp, PressableProps {
  label: string;
  icon?: keyof typeof IconName;
  loading?: boolean;
}
