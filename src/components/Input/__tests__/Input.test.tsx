import React from 'react'
import {render} from '@testing-library/react-native'
import {Input} from '..'
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native'
import {themes} from '@providers/theme/context'
import {ThemeProvider} from '@providers/theme'

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  )
}

describe('Input', () => {
  it('should render the input', () => {
    const {getByPlaceholderText} = renderWithTheme(
      <Input label="label" placeholder="Test input" />,
    )
    expect(getByPlaceholderText('Test input')).toBeTruthy()
  })

  it('should show the label when provided', () => {
    const {getByText} = renderWithTheme(<Input label="Test label" />)
    expect(getByText('Test label')).toBeTruthy()
  })

  it('should show the password toggle icon when type is password', () => {
    const {getByTestId} = renderWithTheme(
      <Input label="label" secureTextEntry />,
    )
    expect(getByTestId('password-toggle-icon')).toBeTruthy()
  })
})
