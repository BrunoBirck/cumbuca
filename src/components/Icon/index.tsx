import useTheme from '@providers/theme/useTheme';
import React from 'react';
import {Image} from 'react-native';

import arrowLeftLight from '@assets/light/arrow-left.png';
import eyeCloseErrorLight from '@assets/light/eye-close-error.png';
import eyeCloseLight from '@assets/light/eye-close.png';
import eyeOpenErrorLight from '@assets/light/eye-open-error.png';
import eyeOpenLight from '@assets/light/eye-open.png';
import lessErrorLight from '@assets/light/less.png';
import plusLight from '@assets/light/plus.png';
import settingsLight from '@assets/light/settings.png';
import signoutLight from '@assets/light/signout.png';
import trashLight from '@assets/light/trash.png';
import warningLight from '@assets/light/warning.png';
import logoLight from '@assets/light/logo.png';

import arrowLeftDark from '@assets/dark/arrow-left.png';
import eyeCloseErrorDark from '@assets/dark/eye-close-error.png';
import eyeCloseDark from '@assets/dark/eye-close.png';
import eyeOpenErrorDark from '@assets/dark/eye-open-error.png';
import eyeOpenDark from '@assets/dark/eye-open.png';
import lessErroDark from '@assets/dark/less.png';
import plusDark from '@assets/dark/plus.png';
import settingsDark from '@assets/dark/settings.png';
import signoutDark from '@assets/dark/signout.png';
import trashDark from '@assets/dark/trash.png';
import warningDark from '@assets/dark/warning.png';
import logoDark from '@assets/light/logo.png';
import {IIconProps} from './types';

const lightIcons = {
  'arrow-left': arrowLeftLight,
  'eye-close-error': eyeCloseErrorLight,
  'eye-close': eyeCloseLight,
  'eye-open-error': eyeOpenErrorLight,
  'eye-open': eyeOpenLight,
  less: lessErrorLight,
  plus: plusLight,
  settings: settingsLight,
  signout: signoutLight,
  trash: trashLight,
  warning: warningLight,
  logo: logoLight,
};

const darkIcons = {
  'arrow-left': arrowLeftDark,
  'eye-close-error': eyeCloseErrorDark,
  'eye-close': eyeCloseDark,
  'eye-open-error': eyeOpenErrorDark,
  'eye-open': eyeOpenDark,
  less: lessErroDark,
  plus: plusDark,
  settings: settingsDark,
  signout: signoutDark,
  trash: trashDark,
  warning: warningDark,
  logo: logoDark,
};

export function Icon({name, width = 18, height = 18}: IIconProps) {
  const {theme} = useTheme();
  const icon = theme === 'light' ? lightIcons[name] : darkIcons[name];

  return <Image source={icon} style={{width, height}} />;
}
