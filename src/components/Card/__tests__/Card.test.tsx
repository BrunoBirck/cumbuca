import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {ThemeProvider} from '@providers/theme'
import {Card} from '..'
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native'
import {themes} from '@providers/theme/context'
import {Text} from 'react-native'

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  )
}

describe('Card', () => {
  const onLongPressMock = jest.fn()
  const onPressOutMock = jest.fn()

  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <Card
        testID="card"
        onLongPress={onLongPressMock}
        onPressOut={onPressOutMock}
        isActive={false}>
        <Text>Test</Text>
      </Card>,
    )

    expect(getByTestId('card')).toBeTruthy()
  })

  it('should call onLongPress when long pressed', () => {
    const {getByTestId} = renderWithTheme(
      <Card
        testID="card"
        onLongPress={onLongPressMock}
        onPressOut={onPressOutMock}
        isActive={false}>
        <Text>Test</Text>
      </Card>,
    )

    fireEvent(getByTestId('card'), 'longPress')
    expect(onLongPressMock).toHaveBeenCalled()
  })

  it('should call onPressOut when press is released', () => {
    const {getByTestId} = renderWithTheme(
      <Card
        testID="card"
        onLongPress={onLongPressMock}
        onPressOut={onPressOutMock}
        isActive={false}>
        <Text>Test</Text>
      </Card>,
    )

    fireEvent(getByTestId('card'), 'pressOut')
    expect(onPressOutMock).toHaveBeenCalled()
  })
})
