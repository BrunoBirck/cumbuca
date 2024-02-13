import React from 'react'
import {render} from '@testing-library/react-native'
import {ThemeProvider} from '@providers/theme'
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native'
import {themes} from '@providers/theme/context'
import Typography from '..'

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  )
}
describe('Typography', () => {
  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <Typography testID="typography">Test</Typography>,
    )

    const text = getByTestId('typography')
    expect(text.children[0]).toBe('Test')
  })

  it('should render correctly with variant prop', () => {
    const {getByTestId} = renderWithTheme(
      <Typography testID="typography" variant="lg">
        Test
      </Typography>,
    )
    const text = getByTestId('typography')
    expect(text.props.style.fontSize).toBe(18)
  })

  it('should render correctly with semibold prop', () => {
    const {getByTestId} = renderWithTheme(
      <Typography testID="typography" semibold>
        Test
      </Typography>,
    )

    const text = getByTestId('typography')
    expect(text.props.style.fontWeight).toBe('600')
  })
})
