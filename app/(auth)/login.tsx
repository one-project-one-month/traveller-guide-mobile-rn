import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import CustomInput from '@/components/ui/Input'
import CheckBox from 'expo-checkbox';
import CustomButton from '@/components/ui/Button';
import { Image } from 'expo-image';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';

interface LoginFormType {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const router = useRouter();
  const { login, isLoading, loginError } = useAuth();
  const { promptGoogleLogin, isGoogleLoginDisabled } = useGoogleLogin();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    }
  });

  const onSubmit = (data: LoginFormType) => {
    login(data, {
      onSuccess: () => {
        router.push('/(tabs)');
      },
      onError: (error: any) => {
        Alert.alert('Registration Failed', error.message || 'An error occurred. Please try again.');
      }
    });
  };

  useEffect(() => {
    if (loginError) {
      Alert.alert('Registration Failed', (loginError as any).message || 'An error occurred. Please try again.');
    }
  }, [loginError]);

  return (
    <ScreenWrapper isHeader>
      <ScrollView className='flex-1 px-10 py-20'>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text className='font-Pacifico text-[34px] text-orange-500'>Welcome Back</Text>
          <Text className='font-poppin text-[14px] mt-1'>Pick up where you left off and explore more places.</Text>
          <View className='flex gap-3 mt-10'>
            <Controller control={control} name="email" rules={{
              required: 'Email is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address.'
              }
            }} render={({ field: { onChange, value } }) => (
              <CustomInput label='Email' placeholder='Enter email' keyboardType='email-address' onChangeText={onChange} value={value} error={errors.email?.message} />
            )} />
            <Controller control={control} name="password" rules={{
              required: 'Password is required.',
              // minLength: {
              //   value: 8,
              //   message: 'Password must be at least 8 characters long.'
              // },
              // pattern: {
              //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              //   message: 'Password must contain one lowercase, one uppercase, and one number.'
              // },
            }} render={({ field: { onChange, value } }) => (
              <CustomInput label='Password' placeholder='Enter your password' keyboardType='default' secureTextEntry onChangeText={onChange} value={value} error={errors.password?.message} />
            )} />
            <View className='flex-row justify-between items-center mt-2'>
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { onChange, value } }) => (
                  <View className='flex-row items-center gap-2'>
                    <CheckBox
                      value={value}
                      onValueChange={onChange}
                      color={value ? '#FF7A00' : undefined}
                      style={{ borderRadius: 5, borderWidth: 1 }}
                    />
                    <Text className='font-poppin'>Remember Me</Text>
                  </View>
                )}
              />
              <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                <Text className='font-poppin text-sm text-orange-500'>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

        </KeyboardAvoidingView>

        <CustomButton onPress={handleSubmit(onSubmit)} title={isLoading ? 'Logging in...' : 'Log In'} className='mt-10 bg-orange-500 py-[16px] rounded-[16px] mb-2' textClassName='font-poppinBold font-bold text-[18px] text-white' />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#D2D2D2' }} />
          <Text style={{ color: 'black', marginHorizontal: 8, fontSize: 14, lineHeight: 20 }}>Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#D2D2D2' }} />
        </View>

        <CustomButton onPress={() => promptGoogleLogin()} disabled={isGoogleLoginDisabled} title='Continue with Google' leftIcon={<Image source={require('@/assets/icons/google.png')} style={{ width: 20, height: 20, marginRight: 10 }} />} className='flex-row justify-center items-center border-orange-500 border-[1px] py-[16px] rounded-[16px]' textClassName='font-poppinBold font-bold text-[18px] ' />

        <View className='flex-row justify-center items-center mt-5 gap-1'>
          <Text>
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className='text-orange-500 font-bold'>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Login;
