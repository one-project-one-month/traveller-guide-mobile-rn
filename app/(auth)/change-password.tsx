import { View, Text, Pressable, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useRef } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '@/components/ui/Input'
import CustomButton from '@/components/ui/Button'
import { useImageWidth } from '@/utils/imageWidth'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'

interface ChangePasswordFormType {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const maxImageWidth = useImageWidth();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, watch } = useForm<ChangePasswordFormType>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const passwordRef = useRef(watch('password'));
  passwordRef.current = watch('password');

  const onSubmit = (data: ChangePasswordFormType) => {
    console.log('New password set:', data.password);
    // logic to update password
    router.replace('/(auth)/password-changed');
  };

  return (
    <ScreenWrapper isHeader>
      <Pressable onPress={Keyboard.dismiss} className='flex-1' accessible={false}>
        <View className='flex justify-between items-center mx-10'>
          <View className='items-center w-full'>
            <Image contentFit='contain' source={require('@/assets/auth/createNewPassword.png')} style={{ width: maxImageWidth, height: 300 }} />
            <Text className='font-poppin text-[16px] text-center mb-10'>Your new password must be different from previously used passwords.</Text>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='w-full gap-3'>
              <Controller control={control} name="password" rules={{
                required: 'Password is required.',
                minLength: { value: 8, message: 'Password must be at least 8 characters long.' },
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: 'Password must contain one lowercase, one uppercase, and one number.' },
              }} render={({ field: { onChange, value } }) => (
                <CustomInput label='Create New Password' placeholder='Enter a secure password' secureTextEntry onChangeText={onChange} value={value} error={errors.password?.message} />
              )} />
              <Controller control={control} name="confirmPassword" rules={{
                required: 'Please confirm your password.',
                validate: value => value === passwordRef.current || 'The passwords do not match.'
              }} render={({ field: { onChange, value } }) => (
                <CustomInput label='Confirm New Password' placeholder='Confirm your secure password' secureTextEntry onChangeText={onChange} value={value} error={errors.confirmPassword?.message} />
              )} />
            </KeyboardAvoidingView>
          </View>
          <CustomButton onPress={handleSubmit(onSubmit)} title='Reset Password' className='w-full bg-orange-500 py-[16px] rounded-[16px] mt-10' textClassName='font-poppinBold font-bold text-[18px] text-white' />
        </View>
      </Pressable>
    </ScreenWrapper>
  )
}

export default ChangePassword
