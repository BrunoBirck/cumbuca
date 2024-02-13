import React from 'react'
import {render} from '@testing-library/react-native'
import {ThemeProvider} from '@providers/theme'
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native'
import {themes} from '@providers/theme/context'
import PageContent from '..'
import {Text} from 'react-native'

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({top: 10, bottom: 10, left: 0, right: 0}),
}))

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  )
}

describe('PageContent', () => {
  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <PageContent testID="page-content">
        <Text>Test</Text>
      </PageContent>,
    )

    expect(getByTestId('page-content')).toBeTruthy()
  })

  it('should render ActivityIndicator when isLoading is true', () => {
    const {getByTestId} = renderWithTheme(
      <PageContent testID="page-content" isLoading>
        <Text>Test</Text>
      </PageContent>,
    )

    expect(
      getByTestId('page-content.child.2').props.children.type.displayName,
    ).toBe('ActivityIndicator')
  })

  it('should not render ActivityIndicator when isLoading is false', () => {
    const {getByTestId} = renderWithTheme(
      <PageContent testID="page-content" isLoading={false}>
        <Text>Test</Text>
      </PageContent>,
    )

    expect(
      getByTestId('page-content.child.2').props.children.type.displayName,
    ).not.toBe('ActivityIndicator')
  })
})
