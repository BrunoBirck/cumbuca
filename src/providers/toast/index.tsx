import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {ViewStyle, Animated, Easing} from 'react-native';
import Typography from '@components/Typography';
import {useTheme} from 'styled-components/native';
import {ToastContext, ToastProps} from './context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function ToastProvider({children}: {children: React.ReactNode}) {
  const translateY = useMemo(() => {
    return new Animated.Value(-100);
  }, []);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = useCallback(
    (message: string, variant: 'success' | 'error' | 'info' = 'info') => {
      setToast({message, variant});
    },
    [],
  );

  const styles = useMemo((): ViewStyle => {
    const baseStyles: ViewStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      paddingTop: insets.top + theme.spacersRaw['sm-3'],
      paddingBottom: theme.spacersRaw['md-1'],
      paddingHorizontal: theme.spacersRaw['md-1'],
      justifyContent: 'flex-end',
      alignItems: 'center',
    };

    switch (toast?.variant) {
      case 'success':
        return {...baseStyles, backgroundColor: theme.colors.success};
      case 'error':
        return {...baseStyles, backgroundColor: theme.colors.error};
      case 'info':
        return {...baseStyles, backgroundColor: theme.colors.background};
      default:
        return baseStyles;
    }
  }, [insets, theme, toast]);

  const textColor = useMemo(() => {
    switch (toast?.variant) {
      case 'success':
        return theme.colors.white;
      case 'error':
        return theme.colors.white;
      case 'info':
        return theme.colors.text;
      default:
        return theme.colors.text;
    }
  }, [theme, toast?.variant]);

  useEffect(() => {
    if (toast) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  }, [toast, translateY]);

  return (
    <ToastContext.Provider value={{show: showToast}}>
      {children}
      {toast && (
        <Animated.View style={[styles, {transform: [{translateY}]}]}>
          <Typography color={textColor}>{toast.message}</Typography>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}
