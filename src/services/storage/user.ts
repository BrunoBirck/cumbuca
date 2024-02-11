import {IUser} from 'src/types/User';
import {getCurrentDate, getItem, setItem} from './global';
import {APP_SIGNED_USER} from './keys';

export const verifyUserCredentials = (
  cpf: string,
  password: string,
): IUser | Error => {
  let user = getItem(cpf);
  if (user) {
    if (user.password !== password) {
      throw new Error('Credenciais inválidas');
    }
    user.lastAccess = getCurrentDate();
    setItem(cpf, user);
    setItem(APP_SIGNED_USER, cpf);
    return user;
  } else {
    user = {
      cpf,
      password,
      lastAccess: getCurrentDate(),
    };
    setItem(cpf, user);
    setItem(APP_SIGNED_USER, cpf);
    return user;
  }
};

export const getUser = (cpf: string): IUser => {
  return getItem(cpf);
};
