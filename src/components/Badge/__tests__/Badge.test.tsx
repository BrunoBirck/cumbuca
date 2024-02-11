import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from '@providers/theme';
import {Badge} from '..';
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native';
import {themes} from '@providers/theme/context';

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  );
};

describe('Badge', () => {
  const onPressMock = jest.fn();

  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <Badge
        text="Test"
        testID="badge"
        onPress={onPressMock}
        selected={false}
      />,
    );

    expect(getByTestId('badge')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const {getByTestId} = renderWithTheme(
      <Badge
        text="Test"
        testID="badge"
        onPress={onPressMock}
        selected={false}
      />,
    );

    fireEvent.press(getByTestId('badge'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should display the correct text', () => {
    const {getByText} = renderWithTheme(
      <Badge
        text="Test"
        testID="badge"
        onPress={onPressMock}
        selected={false}
      />,
    );

    expect(getByText('Test')).toBeTruthy();
  });

  it('should have correct colors when selected is true', () => {
    const {getByTestId} = renderWithTheme(
      <Badge
        text="Test"
        testID="badge"
        onPress={onPressMock}
        selected={true}
      />,
    );

    const badge = getByTestId('badge');
    const badgeText = getByTestId('badge.text');
    expect(badgeText.props.style.color).toBe('#FCFCFC');
    expect(badge.props.style.backgroundColor).toBe('#FF949E');
    expect(badge.props.style.borderColor).toBe('#FF949E');
  });

  it('should have correct colors when selected is false', () => {
    const {getByTestId} = renderWithTheme(
      <Badge
        text="Test"
        testID="badge"
        onPress={onPressMock}
        selected={false}
      />,
    );

    const badge = getByTestId('badge');
    const badgeText = getByTestId('badge.text');
    expect(badgeText.props.style.color).toBe('#6E7191');
    expect(badge.props.style.backgroundColor).toBe('#FCFCFC');
    expect(badge.props.style.borderColor).toBe('#E9E9E9');
  });
});
