import {TextProps} from 'react-native'

export interface ITypographyStylesProps extends TextProps {
  variant?: 'sm' | 'md' | 'lg' | 'xl'
  semibold?: boolean
  color?: string
  textAlign?: 'left' | 'center' | 'right'
}

export interface ITypographyProps extends ITypographyStylesProps {}
