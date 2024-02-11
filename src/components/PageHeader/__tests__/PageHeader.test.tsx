import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from '@providers/theme';
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native';
import {themes} from '@providers/theme/context';
import {PageHeader} from '..';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  );
};

describe('PageHeader', () => {
  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <PageHeader testID="page-header" title="Test" />,
    );

    expect(getByTestId('page-header')).toBeTruthy();
    expect(getByTestId('page-header.text').props.children).toBe('Test');
  });

  it('should call navigation.goBack when back button is pressed', () => {
    const {getByTestId} = renderWithTheme(
      <PageHeader testID="page-header" title="Test" />,
    );

    fireEvent.press(getByTestId('page-header.button'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
