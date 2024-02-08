import Icon from '@components/Icon';
import PageContent from '@components/PageContent';
import {ThemeType} from '@providers/theme/context';
import useTheme from '@providers/theme/useTheme';
import React from 'react';
import {Switch, Text} from 'react-native';

export function SignIn() {
  const {toggleTheme, theme} = useTheme();
  const darkModeIsEnabled = theme === ThemeType.dark;
  return (
    <PageContent>
      <Text>SignIn</Text>
      <Switch value={darkModeIsEnabled} onValueChange={toggleTheme} />
      <Icon name="arrow-left" width={40} height={40} />
    </PageContent>
  );
}
