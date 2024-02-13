import {Platform} from 'react-native'

const light = {
  colors: {
    primary: '#FF949E',
    white: '#FCFCFC',
    black: '#3F3F3F',
    border: '#E9E9E9',
    placeholder: '#6E7191',
    error: '#FF3030',
    input: '#4E4B66',
    description: '#6D7199',
    disabled: '#AAAAAA',
    background: '#FCFCFC',
    text: '#3F3F3F',
    success: '#6cc070',
  },
  fontSizes: {
    sm: '12px',
    md: '14px',
    lg: '18px',
    xl: '24px',
  },
  spacers: {
    'sm-1': '4px',
    'sm-2': '8px',
    'sm-3': '12px',
    'md-1': '16px',
    'md-2': '20px',
    'md-3': '24px',
    'lg-1': '36px',
    'lg-2': '44px',
  },
  spacersRaw: {
    'sm-1': 4,
    'sm-2': 8,
    'sm-3': 12,
    'md-1': 16,
    'md-2': 20,
    'md-3': 24,
    'lg-1': 36,
    'lg-2': 44,
  },
  fontFamilies: {
    regular: 'Poppins-Regular',
    semibold: 'Poppins-Semibold',
  },
  fontWeights: {
    regular: 400,
    semibold: Platform.OS === 'ios' ? 600 : 700,
  },
}

export default light
