import React from 'react'
import {render} from '@testing-library/react-native'
import {useForm} from 'react-hook-form'
import {ControlledInput} from '..'
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

describe('ControlledInput', () => {
  const Wrapper = ({children}) => {
    const {control} = useForm()
    return children(control)
  }

  it('should show the error message when provided', () => {
    const {getByText} = renderWithTheme(
      <Wrapper>
        {control => (
          <ControlledInput
            control={control}
            name="test"
            label="Test input"
            errors={{message: 'Test error', type: 'test'}}
          />
        )}
      </Wrapper>,
    )
    expect(getByText('Test error')).toBeTruthy()
  })
})
