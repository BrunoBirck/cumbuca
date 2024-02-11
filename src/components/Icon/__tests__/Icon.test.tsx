import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemeProvider} from '@providers/theme';
import {Icon} from '..';
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native';
import {themes} from '@providers/theme/context';

describe('Icon', () => {
  it('should render correctly with default props', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <ThemeProviderStyled theme={themes.light}>
          <Icon testID="icon" name="arrow-left" width={24} height={24} />
        </ThemeProviderStyled>
      </ThemeProvider>,
    );

    expect(getByTestId('icon')).toBeTruthy();
  });

  it('should render correct icon for light theme', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <ThemeProviderStyled theme={themes.light}>
          <Icon testID="icon" name="arrow-left" width={24} height={24} />
        </ThemeProviderStyled>
      </ThemeProvider>,
    );

    const icon = getByTestId('icon');
    console.log(icon.props.source);
    expect(icon.props.source.testUri).toBe(
      '../../../src/assets/light/arrow-left.png',
    );
  });

  it('should render correct icon for dark theme', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <ThemeProviderStyled theme={themes.dark}>
          <Icon testID="icon" name="arrow-left" width={24} height={24} />
        </ThemeProviderStyled>
      </ThemeProvider>,
    );

    const icon = getByTestId('icon');
    console.log(icon.props.source);
    expect(icon.props.source.testUri).toBe(
      '../../../src/assets/light/arrow-left.png',
    );
  });
});
