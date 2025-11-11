import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { MagnifyingGlassIcon } from 'phosphor-react-native'

type SearchBarProps = {
  value: string,
  onChangeText : (text:string) => void,
  placeholder?: string
}

const SearchBar = ({ value, onChangeText, placeholder } : SearchBarProps) => {
  return (
    <View
      className="flex-row items-center bg-white border border-gray-400 rounded-[16px] px-4 py-3
     "
    >
      <MagnifyingGlassIcon size={22} color="#9CA3AF" weight="regular" />
      <TextInput
      className='flex-1 ml-2 text-[12px] text-gray-800 font-poppin'
      placeholder={placeholder}
      placeholderTextColor={'#9CA3AF'}
      value={value}
      onChangeText={onChangeText}
      returnKeyType='search'
      />
    </View>
  );
}

export default SearchBar

const styles = StyleSheet.create({})