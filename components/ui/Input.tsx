
import { CustomInputProps } from '@/types/CustomInput';
import cn from 'clsx';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomInput = ({
  placeholder = "Enter Text",
  value,
  onChangeText,
  label,
  secureTextEntry,
  keyboardType = "default",
  error
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>
      <TextInput
        autoCapitalize={"none"}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={"#888"}
        className={cn('input', isFocused ? 'border-primary' : 'border-gray-300', error ? 'border-red' : '')}
      />
      {error && <Text className="text-red text-xs mt-1">{error}</Text>}
    </View>
  )
}

export default CustomInput
