import {storage} from '.';

const isEmpty = (value: string) =>
  value === undefined || value === null || value === '';

export const setItem = (key: string, value: any) => {
  try {
    if (isEmpty(key)) {
      storage.delete(key);
    }
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(`[Error saving ${key}]: ${error}`);
  }
};

export const getItem = (key: string) => {
  if (!isEmpty(key)) {
    try {
      const result = storage.getString(key);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      throw new Error(`[Error getting ${key}]: ${error}`);
    }
  }
  return null;
};

export const removeItem = (key: string) => {
  if (!isEmpty(key)) {
    try {
      storage.delete(key);
    } catch (error) {
      throw new Error(`[Error removing ${key}]: ${error}`);
    }
  }
};

export const getAllKeys = () => {
  try {
    return storage.getAllKeys();
  } catch (error) {
    throw new Error(`[Error getting all keys]: ${error}`);
  }
};

export const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};
