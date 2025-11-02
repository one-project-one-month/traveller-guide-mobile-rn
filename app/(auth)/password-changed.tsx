import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Image } from 'expo-image'
import CustomButton from '@/components/ui/Button'
import { useRouter } from 'expo-router'

const PasswordChanged = () => {
  const router = useRouter();
  return (
    <ScreenWrapper isHeader>
      <View className='flex justify-center px-10 items-center'>
        <Text className='font-poppinBold text-[24px] font-bold self-start'>Password Changed!!</Text>
        <Text className='text-[14px] mt-2 font-poppin self-start'>No hassel anymore</Text>
        <Image contentFit='contain' source={require('@/assets/auth/passwordChanged.png')} style={{ width: '70%', height: 300, marginTop: 35 }} />

        <Text className='text-[34px] font-poppinBold font-bold text-orange-500'>Successfully</Text>
        <Text className='text-[14px] font-poppinBold mt-4 font-semibold'>Click Back to Login to access your account</Text>

        <CustomButton onPress={() => router.push('/(auth)/login')} title='Back to Login' className='w-full mt-10 bg-orange-500 py-[16px] rounded-[16px] mb-2' textClassName='font-poppinBold font-bold text-[18px] text-white' />
      </View>

    </ScreenWrapper>
  )
}

export default PasswordChanged
