
import { CustomButtonProps } from '@/types/CustomButton';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  onPress,
  title = 'Click Me',
  className,
  textClassName,
  leftIcon,
  isLoading = false,
  disabled = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={className} onPress={onPress} disabled={disabled}>

      <View className="flex-center flex-row ">
        {isLoading ? (<ActivityIndicator size={"small"} color={"white"} />) :
          (
            <>
              {leftIcon}
              <Text className={textClassName}>
                {title}
              </Text>
            </>
          )}
      </View>
    </TouchableOpacity >
  )
}

export default CustomButton
