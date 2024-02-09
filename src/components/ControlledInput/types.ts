import {IInputProps} from '@components/Input/types';
import {Control, FieldError} from 'react-hook-form';

export interface IControlledInputProps extends IInputProps {
  control: Control<any>;
  name: string;
  errors?: FieldError;
  maskFunction?: (value: string) => string;
}
