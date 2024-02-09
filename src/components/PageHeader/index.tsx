import React from 'react';
import * as S from './styles';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from '@components/Icon';
import Typography from '@components/Typography';
import {IPageHeaderProps} from './types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStack} from '@routes/app';

export function PageHeader({title}: IPageHeaderProps) {
  const navigation = useNavigation<NavigationProp<AppStack>>();

  return (
    <S.Header>
      <TouchableOpacity activeOpacity={0.8} onPress={navigation.goBack}>
        <Icon name="arrow-left" width={32} height={32} />
      </TouchableOpacity>
      <Typography variant="lg" semibold>
        {title}
      </Typography>
      <View />
    </S.Header>
  );
}
