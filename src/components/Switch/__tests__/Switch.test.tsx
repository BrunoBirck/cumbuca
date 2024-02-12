import React from 'react';
import {render} from '@testing-library/react-native';
import {Switch} from '..';
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native';
import {themes} from '@providers/theme/context';
import {ThemeProvider} from '@providers/theme';

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  );
};

describe('Switch', () => {
  it('should show the switch as on when value is true', () => {
    const onValueChange = jest.fn();
    const {getByTestId} = renderWithTheme(
      <Switch
        testID="test-switch"
        value={true}
        onValueChange={onValueChange}
      />,
    );
    const switchContainer = getByTestId('test-switch');
    expect(switchContainer.props.style.backgroundColor).toBe('#FF949E');
  });

  it('should show the switch as off when value is false', () => {
    const onValueChange = jest.fn();
    const {getByTestId} = renderWithTheme(
      <Switch
        testID="test-switch"
        value={false}
        onValueChange={onValueChange}
      />,
    );
    const switchContainer = getByTestId('test-switch');
    expect(switchContainer.props.style.backgroundColor).toBe('#AAAAAA');
  });
});
