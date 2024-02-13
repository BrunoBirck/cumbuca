import React from 'react'
import {render} from '@testing-library/react-native'
import {ThemeProvider} from '@providers/theme'
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native'
import {themes} from '@providers/theme/context'
import DragList from '..'
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
describe('DragList', () => {
  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <DragList
        testID="draglist"
        data={[{id: 1}, {id: 2}]}
        renderItem={({item}) => <Text>{item.id}</Text>}
        keyExtractor={item => item.id.toString()}
      />,
    )

    expect(getByTestId('draglist')).toBeTruthy()
  })
})
