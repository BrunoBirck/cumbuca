import React from 'react'
import useAuth from '@providers/authorization/useAuth'
import {App} from './app'
import {Auth} from './auth'

export function Routes() {
  const {signed, loading} = useAuth()

  if (signed && !loading) {
    return <App />
  }
  return <Auth />
}
