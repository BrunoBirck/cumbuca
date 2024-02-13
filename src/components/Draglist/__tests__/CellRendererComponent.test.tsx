import React from 'react'
import {render} from '@testing-library/react-native'
import {ThemeProvider} from '@providers/theme'
import {ThemeProvider as ThemeProviderStyled} from 'styled-components/native'
import {themes} from '@providers/theme/context'
import {Animated, Text} from 'react-native'
import {DragListProvider} from '../context'
import {CellRendererComponent} from '../CellRendererComponent'

const renderWithTheme = (component: any) => {
  return render(
    <ThemeProvider>
      <ThemeProviderStyled theme={themes.light}>
        {component}
      </ThemeProviderStyled>
    </ThemeProvider>,
  )
}
describe('CellRendererComponent', () => {
  it('should render correctly with default props', () => {
    const {getByTestId} = renderWithTheme(
      <DragListProvider
        activeKey={null}
        activeIndex={0}
        keyExtractor={(item, index) => `key-${index}`}
        pan={new Animated.Value(0)}
        panIndex={0}
        layouts={{}}>
        <CellRendererComponent
          testID="cell"
          item={{id: 1}}
          index={0}
          children={<Text>Test Cell</Text>}
        />
      </DragListProvider>,
    )

    expect(getByTestId('cell')).toBeTruthy()
  })
})
