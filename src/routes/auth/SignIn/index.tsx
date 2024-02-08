import { Card } from '@components/Card';
import { Icon } from '@components/Icon';
import PageContent from '@components/PageContent';
import Typography from '@components/Typography';
import {ThemeType} from '@providers/theme/context';
import useTheme from '@providers/theme/useTheme';
import React from 'react';
import {Switch} from 'react-native';

export function SignIn() {
  const {toggleTheme, theme} = useTheme();
  const darkModeIsEnabled = theme === ThemeType.dark;
  return (
    <PageContent>
      <Typography>SignIn</Typography>
      <Switch value={darkModeIsEnabled} onValueChange={toggleTheme} />
      <Icon name="arrow-left" width={40} height={40} />
      <Card>
        <Typography>SignIn</Typography>
        <Switch value={darkModeIsEnabled} onValueChange={toggleTheme} />
        <Icon name="arrow-left" width={40} height={40} />
      </Card>
    </PageContent>
  );
}
