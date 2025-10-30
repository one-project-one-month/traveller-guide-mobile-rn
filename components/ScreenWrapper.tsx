import React from 'react';
import { Dimensions, Platform, StatusBar, View, ViewStyle } from 'react-native';

const { height } = Dimensions.get('window');

type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};


const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === 'ios' ? height * 0.05 : 50;
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
