import React, {useState} from 'react';
import AuthContext, {User} from './context';

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn(cpf: string, password: string) {}

  async function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{signed: true, user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
