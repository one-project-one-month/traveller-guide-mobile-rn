
import { CustomInputProps } from '@/types/CustomInput';
import cn from 'clsx';
import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

const CustomInput = ({
  placeholder = "Enter Text",
  value,
  onChangeText,
  label,
  secureTextEntry,
  keyboardType = "default",
  error,
}: CustomInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className='w-full'>
      {label && <Text className='label font-poppin'>{label}</Text>}
      <View className={cn('input flex-row items-center', error ? 'border-red' : 'border-gray-300')}>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={"#888"}
          className="flex-1 h-full ml-2 font-poppin"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={18} color="#888" />
          </TouchableOpacity>
        )}
        {error && (
          <MaterialIcons name="error-outline" size={18} color="red" style={{ marginLeft: secureTextEntry ? 10 : 8 }} />
        )}
      </View>
      {error && <Text className="text-red text-xs mt-1 font-poppin">{error}</Text>}
    </View>
  )
}

export default CustomInput
