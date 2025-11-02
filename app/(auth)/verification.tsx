import { View, Text, TextInput, Pressable, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Image } from 'expo-image'
import { useImageWidth } from '@/utils/imageWidth'
import { useLocalSearchParams, useRouter } from 'expo-router'
import CustomButton from '@/components/ui/Button'

const Verification = () => {
  const maxImageWidth = useImageWidth();
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handleTextChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onVerify = () => {
    const otp = code.join('');
    // OTP verification logic here
    console.log('Verifying OTP:', otp);
    if (otp.length === 4) {
      router.push('/(auth)/change-password');
      Alert.alert('Success', 'OTP Verified successfully!');
    } else {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
    }
  };

  const onResend = () => {
    // resend OTP logic here
    console.log('Resending OTP...');
    setIsResendDisabled(true);
  };


  const maskEmail = (email?: string) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;

    if (localPart.length <= 3) {
      return `${localPart.slice(0, 1)}***@${domain}`;
    }
    return `${localPart.substring(0, 3)}***@${domain}`;
  };

  return (
    <ScreenWrapper isHeader >
      <Pressable onPress={Keyboard.dismiss} className='flex-1' accessible={false}>
        <View className='flex justify-center items-center mx-10'>
          <View className='items-center'>
            <Image contentFit='contain' source={require('@/assets/auth/verification.png')} style={{ width: maxImageWidth, height: 300 }} />
            <Text className='font-poppin text-[16px] text-center mb-10'>We have sent an OTP code to your email {maskEmail(email)}. Enter The OTP code below to verify.</Text>

            <View className='flex-row justify-center gap-4 mb-10'>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputs.current[index] = ref; }}
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 0.5,
                    borderRadius: 10,
                    textAlign: 'center',
                    fontSize: 24,
                    borderColor: '#787878',
                    fontFamily: 'Poppin',
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleTextChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>
          </View>
          <View className='w-full items-center mb-5'>
            <CustomButton onPress={onVerify} title='Verify' className='w-full bg-orange-500 py-[16px] rounded-[16px]' textClassName='font-poppinBold font-bold text-[18px] text-white' />
            <View className='flex-row gap-1 mt-5'>
              <Text className='font-poppinBold'>Did&apos;t receive the code?</Text>
              <TouchableOpacity onPress={onResend} disabled={isResendDisabled}>
                <Text className='font-poppinBold font-bold text-orange-500'>
                  Send Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
    </ScreenWrapper >
  )
}

export default Verification
