import { View, Text, KeyboardAvoidingView, Platform, Pressable, Keyboard } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Image } from 'expo-image'
import { useImageWidth } from '@/utils/imageWidth'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '@/components/ui/Input'
import CustomButton from '@/components/ui/Button'

interface ForgotPasswordFormType {
  email: string;
}

const ForgotPassword = () => {
  const maxImageWidth = useImageWidth();
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormType>({
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (data: ForgotPasswordFormType) => {
    router.push({ pathname: '/(auth)/verification', params: { email: data.email } });
  };

  return (
    <ScreenWrapper isHeader>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Pressable onPress={Keyboard.dismiss} className='flex-1' accessible={false}>
          <View className='flex justify-center items-center mx-10'>
            <Image contentFit='contain' source={require('@/assets/auth/forgotPassword.png')} style={{ width: maxImageWidth, height: 300 }} />
            <Text className='font-poppin text-[16px] text-center mb-5'>Please enter your email address to receive a verification code.</Text>

            <Controller control={control} name="email" rules={{
              required: 'Email is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address.'
              }
            }} render={({ field: { onChange, value } }) => (
              <CustomInput label='Email' placeholder='example@gmail.com' keyboardType='email-address' onChangeText={onChange} value={value} error={errors.email?.message} />
            )} />

            <CustomButton onPress={handleSubmit(onSubmit)} title='Send Code' className='w-full mt-5 bg-orange-500 py-[16px] rounded-[16px] mb-2' textClassName='font-poppinBold font-bold text-[18px] text-white' />
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  )
}

export default ForgotPassword
