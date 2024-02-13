import {createContext} from 'react'
import {IUser} from 'src/types/User'

export interface User {
  cpf: string
  password: string
  lastAccess: string
}

export interface AuthContextData {
  signed: boolean
  user: User | null
  loading: boolean
  signIn(cpf: string, password: string): Promise<IUser | Error>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export default AuthContext
