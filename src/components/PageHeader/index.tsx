import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {Icon} from '@components/Icon'
import Typography from '@components/Typography'
import {AppStack} from '@routes/app'
import * as S from './styles'
import {IPageHeaderProps} from './types'

export function PageHeader({title, testID}: IPageHeaderProps) {
  const navigation = useNavigation<NavigationProp<AppStack>>()

  return (
    <S.Header testID={testID}>
      <TouchableOpacity
        testID={`${testID}.button`}
        activeOpacity={0.8}
        onPress={navigation.goBack}>
        <Icon name="arrow-left" width={32} height={32} />
      </TouchableOpacity>
      <Typography testID={`${testID}.text`} variant="lg" semibold>
        {title}
      </Typography>
      <View />
    </S.Header>
  )
}
