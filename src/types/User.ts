import {IProduct} from './Product';

export interface IUser {
  cpf: string;
  password: string;
  lastAccess: string;
  isBiometricActive?: boolean;
  products: IProduct[];
}
