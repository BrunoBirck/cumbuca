import React from 'react';
import {App} from './app';
import {Auth} from './auth';
import useAuth from '@providers/authorization/useAuth';

export function Routes() {
  const {signed, loading} = useAuth();

  if (signed && !loading) {
    return <App />;
  }
  return <Auth />;
}
