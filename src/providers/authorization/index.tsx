import React, {useState} from 'react';
import AuthContext, {User} from './context';
import {setItem, verifyUserCredentials} from '@services/storage';
import { APP_SIGNED_USER } from '@services/storage/keys';

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  async function signIn(cpf: string, password: string) {
    setLoading(true);
    try {
      const userResponse = verifyUserCredentials(cpf, password);
      if (userResponse instanceof Error) {
        throw new Error(userResponse.message);
      }
      setUser(userResponse);
      setIsSigned(true);
      return userResponse;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setUser(null);
    setIsSigned(false);
    setItem(APP_SIGNED_USER, '');
  }

  return (
    <AuthContext.Provider
      value={{signed: isSigned, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
