import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '@/components/ui/Input'
import CheckBox from 'expo-checkbox';
import CustomButton from '@/components/ui/Button';
import { Image } from 'expo-image';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import CenteredPopup from '@/components/ui/Modal';
import { useRouter } from 'expo-router';
import { useTermsAndConditionStore } from '@/stores/termsAndConditionStore';

interface RegisterFormType {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const Register = () => {
  const router = useRouter();
  const { agreeTerms, setAgreeTerms } = useTermsAndConditionStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<RegisterFormType>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeTerms: agreeTerms,
    }
  });

  const passwordRef = useRef(watch('password'));
  passwordRef.current = watch('password');

  const password = watch('password', '');

  const passwordRequirements = [
    { text: '8+ Characters', met: password.length >= 8 },
    { text: 'One Number', met: /\d/.test(password) },
    { text: 'One Uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'One Lowercase letter', met: /[a-z]/.test(password) },
  ];

  const Requirement = ({ met, text }: { met: boolean, text: string }) => (
    <View className={`py-2 px-3 rounded-full border-[0.5px] ${met ? ' border-orange-500' : 'bg-gray-100 border-gray-300'}`}>
      <View className='flex-row items-center gap-1'>
        <Ionicons
          name={met ? "checkmark-circle" : "close-circle"}
          size={14}
          color={met ? '#FF7A00' : '#9CA3AF'}
        />
        <Text className={`text-[10px] font-poppin ${met ? 'text-orange-500' : 'text-gray-500'}`}>{text}</Text>
      </View>
    </View>
  );


  const onSubmit = (data: RegisterFormType) => {
    router.push('/(auth)/account-created');
  };

  const onError = (errors: FieldErrors<RegisterFormType>) => {
    if (!errors.email && !errors.username && !errors.confirmPassword && !errors.password && errors.agreeTerms) {
      setIsModalVisible(true);
    }
  };

  useEffect(() => {
    setValue('agreeTerms', agreeTerms, { shouldValidate: true });
  }, [agreeTerms, setValue]);


  return (
    <ScreenWrapper isHeader>
      <ScrollView className='flex-1 px-10 '>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <CenteredPopup visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
          <Text className='font-Pacifico text-[34px] text-orange-500'>Register</Text>
          <Text className='font-poppin text-[14px] mt-1'>Sign up to explore guides, destinations, and local foods worldwide.</Text>
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
            <Controller control={control} name="username" rules={{
              required: 'Username is required.',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters.'
              }
            }} render={({ field: { onChange, value } }) => (
              <CustomInput label='Username' placeholder='Enter username' keyboardType='default' onChangeText={onChange} value={value} error={errors.username?.message} />
            )} />
            <Controller control={control} name="password" rules={{
              required: 'Password is required.',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long.'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: 'Password must contain one lowercase, one uppercase, and one number.'
              },
            }} render={({ field: { onChange, value } }) => (
              <CustomInput label='Set Password' placeholder='Create your password' keyboardType='default' secureTextEntry onChangeText={onChange} value={value} error={errors.password?.message} />
            )} />
            {password.length > 0 && (
              <>
                <View className='flex-row flex-wrap gap-2'>
                  <Requirement text={passwordRequirements[0].text} met={passwordRequirements[0].met} />
                  <Requirement text={passwordRequirements[1].text} met={passwordRequirements[1].met} />
                </View>
                <View className='flex-row flex-wrap gap-2'>
                  <Requirement text={passwordRequirements[2].text} met={passwordRequirements[2].met} />
                  <Requirement text={passwordRequirements[3].text} met={passwordRequirements[3].met} />
                </View>
              </>
            )}
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password.',
                validate: value =>
                  value === passwordRef.current || 'The passwords do not match.'
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput label='Confirm Password' placeholder='Confirm your password' keyboardType='default' secureTextEntry onChangeText={onChange} value={value} error={errors.confirmPassword?.message} />
              )} />
            <Controller control={control} name="agreeTerms" rules={{
              validate: value => value === true || 'You must agree to the terms and conditions.'
            }} render={({ field: { onChange, value } }) => (
              <View>
                <View className='flex-row gap-3 items-center'>
                  <CheckBox
                    value={agreeTerms}
                    onValueChange={(newValue) => {
                      setAgreeTerms(newValue);
                      onChange(newValue);
                    }}
                    color={agreeTerms ? '#FF7A00' : undefined}
                    style={{ borderRadius: 5, borderWidth: 1 }}
                  />
                  <View className='flex-row gap-1'>
                    <Text className='font-poppin'>Agree with</Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/terms-and-conditions')}>
                      <Text className='text-orange-500 font-poppin'>Terms and Condition</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )} />
          </View>

        </KeyboardAvoidingView>

        <CustomButton onPress={handleSubmit(onSubmit, onError)} title='Register' className='mt-10 bg-orange-500 py-[16px] rounded-[16px] mb-2' textClassName='font-poppinBold font-bold text-[18px] text-white' />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#D2D2D2' }} />
          <Text style={{ color: 'black', marginHorizontal: 8, fontSize: 14, lineHeight: 20 }}>Or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#D2D2D2' }} />
        </View>

        <CustomButton title='Continue with Google' leftIcon={<Image source={require('@/assets/icons/google.png')} style={{ width: 20, height: 20, marginRight: 10 }} />} className='flex-row justify-center items-center border-orange-500 border-[1px] py-[16px] rounded-[16px]' textClassName='font-poppinBold font-bold text-[18px] ' />

        <View className='flex-row justify-center items-center mt-5 gap-1'>
          <Text>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className='text-orange-500 font-bold'>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Register;
