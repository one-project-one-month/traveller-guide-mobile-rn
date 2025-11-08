import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Image } from 'expo-image'
import CustomButton from '@/components/ui/Button'
import { useRouter } from 'expo-router'

const AccountCreated = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View className='flex justify-center items-center mx-10 mt-20'>
        <Image contentFit='contain' source={require('@/assets/auth/success.png')} style={{ width: '70%', height: 300 }} />
        <Text className='text-[24px] font-poppinBold font-bold mt-10'>Account was Created</Text>
        <Text className='text-[14px] font-poppinBold text-center mt-5'>Your account is all set up and saved in our system. Go ahead and log in again!</Text>

        <CustomButton onPress={() => router.push('/(tabs)')} title='Confirm' className='w-full mt-10 bg-orange-500 py-[16px] rounded-[16px]' textClassName='font-poppinBold font-bold text-[18px] text-white' />
      </View>
    </ScreenWrapper>
  )
}

export default AccountCreated
