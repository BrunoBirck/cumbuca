import {createContext} from 'react';

export interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info';
}

export interface ToastContextProps {
  show: (message: string, variant?: 'success' | 'error' | 'info') => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined,
);
