import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Image } from 'expo-image';
import CustomButton from '@/components/ui/Button';
import { useImageWidth } from '@/utils/imageWidth';
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();
  const maxImageWidth = useImageWidth();
  return (
    <ScreenWrapper>
      <View className='flex justify-center items-center'>
        <Text className='font-poppin font-semibold text-[30px] mt-20 mb-[15px]'>Welcome aboard</Text>
        <Text className='font-Pacifico text-[34px] text-orange-500'>Turning Point</Text>

        <Image contentFit='cover' source={require('@/assets/auth/welcome.png')} style={{ width: maxImageWidth, height: maxImageWidth }} />

        <CustomButton onPress={() => router.push('/(auth)/register')} title='Register' className='w-5/6 bg-orange-500 py-[16px] rounded-[16px] mb-3' textClassName='font-poppinBold font-bold text-[18px] text-white' />

        <CustomButton onPress={() => router.push('/(auth)/login')} title='Log In' className='w-5/6 border-orange-500 border-[1px] py-[16px] rounded-[16px] mb-5' textClassName='font-poppinBold font-bold text-[18px] text-orange-500' />

        <TouchableOpacity>
          <Text className='font-poppinBold font-semibold text-[18px]'>Continue as Guest?</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

export default Welcome
