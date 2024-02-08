import {useTheme} from 'styled-components/native';
import Typography from '../Typography';
import * as S from './styles';
import React, {useMemo} from 'react';
import {IBadgeProps} from './types';

export function Badge({text, testID, onPress, selected}: IBadgeProps) {
  const theme = useTheme();

  const {badgeColor, borderColor, textColor} = useMemo(() => {
    const textColor = selected
      ? theme.colors.background
      : theme.colors.placeholder;
    const badgeColor = selected
      ? theme.colors.primary
      : theme.colors.background;
    const borderColor = selected ? theme.colors.primary : theme.colors.border;
    return {textColor, badgeColor, borderColor};
  }, [theme, selected]);

  return (
    <S.BadgeContainer
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
      backgroundColor={badgeColor}
      borderColor={borderColor}>
      <Typography color={textColor} variant="sm" semibold>
        {text}
      </Typography>
    </S.BadgeContainer>
  );
}
