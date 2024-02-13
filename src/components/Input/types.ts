import {StyledTextInput} from './styles'

export interface IInputProps
  extends React.ComponentProps<typeof StyledTextInput> {
  label: string
  errorText?: string | null
  width?: string
}
