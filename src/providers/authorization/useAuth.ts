import {useContext} from 'react'
import AuthContext, {AuthContextData} from './context'

export default function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('Auth context must be used within a provider.')
  }

  return context
}
