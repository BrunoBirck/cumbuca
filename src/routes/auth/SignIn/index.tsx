import {Badge} from '@components/Badge';
import Button from '@components/Button';
import {Card} from '@components/Card';
import {ControlledInput} from '@components/ControlledInput';
import {Icon} from '@components/Icon';
import {Input} from '@components/Input';
import PageContent from '@components/PageContent';
import { Switch } from '@components/Switch';
import Typography from '@components/Typography';
import {ThemeType} from '@providers/theme/context';
import useTheme from '@providers/theme/useTheme';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Keyboard, Pressable} from 'react-native';

export function SignIn() {
  const {toggleTheme, theme} = useTheme();
  const darkModeIsEnabled = theme === ThemeType.dark;
  const {control} = useForm();
  return (
    <PageContent>
      <Typography>SignIn</Typography>
      <Switch value={darkModeIsEnabled} onValueChange={toggleTheme} />
      <Icon name="arrow-left" width={40} height={40} />
      <Card>
        <Typography>SignIn</Typography>
        <Switch value={false} onValueChange={toggleTheme} />
        <Icon name="arrow-left" width={40} height={40} />
      </Card>
      <Badge text="Badge" />
      <Input errorText={'Error message'} label="Email" />
      <ControlledInput label="Senha" name="password" control={control} />
      <Pressable onPress={Keyboard.dismiss}>
        <Typography>DISABLE KEYBOARD</Typography>
      </Pressable>
      <Button label="Entrar" variant="primary-rounded" />
    </PageContent>
  );
}
