import React, {useState, useEffect, useMemo} from 'react';
import {ViewStyle} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import Typography from '@components/Typography';
import {useTheme} from 'styled-components/native';
import {ToastContext, ToastContextProps, ToastProps} from './context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function ToastProvider({children}: {children: React.ReactNode}) {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const translateY = useSharedValue(-100);
  const theme = useTheme();

  useEffect(() => {
    if (toast) {
      translateY.value = withTiming(0, {duration: 200});
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      translateY.value = withTiming(-100, {duration: 200});
    }
  }, [toast, translateY]);

  const showToast = (
    message: string,
    variant: 'success' | 'error' | 'info' = 'info',
  ) => {
    setToast({message, variant});
  };

  const insets = useSafeAreaInsets();

  const getStyles = (): ViewStyle => {
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
  };

  const contextValue: ToastContextProps = {
    show: showToast,
  };

  const textColor = useMemo(() => {
    switch (toast?.variant) {
      case 'success':
        return theme.colors.text;
      case 'error':
        return theme.colors.white;
      case 'info':
        return theme.colors.text;
      default:
        return theme.colors.text;
    }
  }, [theme, toast?.variant]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && (
        <Animated.View style={[getStyles(), {transform: [{translateY}]}]}>
          <Typography color={textColor}>{toast.message}</Typography>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}
