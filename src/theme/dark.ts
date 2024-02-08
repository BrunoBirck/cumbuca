import {Platform} from 'react-native';

const Theme = {
  colors: {
    primary: '#FF949E',
    white: '#FCFCFC',
    black: '#3F3F3F',
    border: '#656565',
    placeholder: '#F6F6F6',
    error: '#E83939',
    input: '#FCFCFC',
    description: '#F5F5F5',
    disabled: '#EEEEEE',
    background: '#3F3F3F',
    text: '#FCFCFC',
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
  fontFamilies: {
    regular: 'Poppins-Regular',
    semibold: 'Poppins-Semibold',
  },
  fontWeights: {
    regular: 400,
    semibold: Platform.OS === 'ios' ? 600 : 700,
  },
};

export default Theme;
