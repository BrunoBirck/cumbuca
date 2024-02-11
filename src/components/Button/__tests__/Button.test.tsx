import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from '@providers/theme';
import {Button} from '..';
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

describe('Button', () => {
  const onPressMock = jest.fn();

  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <Button label="Test" testID="button" onPress={onPressMock} />,
    );

    expect(getByTestId('button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const {getByTestId} = renderWithTheme(
      <Button label="Test" testID="button" onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId('button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should display the loading indicator when loading is true', () => {
    const {getByTestId} = renderWithTheme(
      <Button
        label="Test"
        testID="button"
        loading={true}
        onPress={onPressMock}
      />,
    );

    expect(getByTestId('button.loading')).toBeTruthy();
  });

  it('should have correct color when variant is danger', () => {
    const {getByTestId} = renderWithTheme(
      <Button
        label="Test"
        testID="button"
        onPress={onPressMock}
        variant="danger"
      />,
    );

    const button = getByTestId('button');
    const buttonText = getByTestId('button.text');
    expect(buttonText.props.style.color).toBe('#FCFCFC');
    expect(button.props.style.backgroundColor).toBe('#FF3030');
  });

  it('should have correct color when variant is primary', () => {
    const {getByTestId} = renderWithTheme(
      <Button
        label="Test"
        testID="button"
        onPress={onPressMock}
        variant="primary"
      />,
    );

    const button = getByTestId('button');
    const buttonText = getByTestId('button.text');
    expect(buttonText.props.style.color).toBe('#3F3F3F');
    expect(button.props.style.backgroundColor).toBe('#FF949E');
  });
});
