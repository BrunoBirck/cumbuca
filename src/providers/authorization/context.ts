import {createContext} from 'react';

export interface User {
  cpf: string;
  password: string;
  lastAccess: string;
}

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(cpf: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
