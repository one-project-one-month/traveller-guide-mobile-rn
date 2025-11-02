import React from 'react';
import { Dimensions, Platform, StatusBar, View, ViewStyle } from 'react-native';

const { height } = Dimensions.get('window');

type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
  isHeader?: boolean;
};


const ScreenWrapper = ({ style, children, isHeader }: ScreenWrapperProps) => {
  let paddingTop;
  if (isHeader) {
    paddingTop = Platform.OS === 'ios' ? height * 0.11 : 70;
  } else {
    paddingTop = Platform.OS === 'ios' ? height * 0.05 : 50;
  }
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop,
          backgroundColor: '#FFFFFF'
        }, style
      ]}
    >
      <StatusBar barStyle={'dark-content'} />
      {children}
    </View>
  )
}

export default ScreenWrapper
