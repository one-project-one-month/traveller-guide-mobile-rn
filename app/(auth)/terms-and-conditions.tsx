import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import CheckBox from 'expo-checkbox'
import CustomButton from '@/components/ui/Button'
import { useRouter } from 'expo-router'
import { useTermsAndConditionStore } from '../../stores/termsAndConditionStore'


const TermsAndConditions = () => {
  const router = useRouter();
  const { agreeTerms, setAgreeTerms } = useTermsAndConditionStore();
  return (
    <ScreenWrapper isHeader>
      <View className='flex justify-center items-center px-10 pb-10'>

        <View className='w-full border-[0.5px] border-gray-200 rounded-xl shadow p-6'>
          <Text className='text-[18px] font-poppin'>Hello, 👋</Text>
          <Text className='text-[12px] font-poppin mt-2'>Before you create an account, please read and accept our Terms and Conditions.</Text>
        </View>

        <ScrollView className='mt-1' showsVerticalScrollIndicator={false}>
          <Text className='mt-5 self-start text-[23px] font-poppinBold font-semibold'>Terms and conditions</Text>

          <Text className='text-[12px] font-poppin mt-3'>
            <Text className='font-poppinBold font-bold'>Welcome to Turning Point Travel Guide App! </Text>
            Our app is designed to help you explore countries, discover famous destinations, and learn about local foods and recipes. Whether you are planning a trip or just curious about the world, Turning Point provides useful information to make your journey more enjoyable.
          </Text>


          <Text className='text-[12px] font-poppin mt-3'>
            <Text className='font-poppinBold font-bold'>Responsible Use: </Text>
            When using Turning Point, you agree to access and use the app’s content responsibly. The information provided is for general guidance and inspiration, and while we strive to ensure accuracy and keep content current, we cannot guarantee that everything is complete or fully reliable.
          </Text>

          <Text className='text-[12px] font-poppin mt-3'>
            <Text className='font-poppinBold font-bold'>User Decisions:</Text>
            Any travel, food, or recipe decisions you make based on the app’s content are your own responsibility. Turning Point is not liable for any outcomes resulting from your use of the information provided. We encourage users to verify important details independently before making any travel plans or food-related decisions.
          </Text>

          <Text className='text-[12px] font-poppin mt-3'>
            <Text className='font-poppinBold font-bold'>Prohibited Actions: </Text>
            Turning Point is meant to be used responsibly and legally. You must not misuse the app, break any laws, or violate intellectual property rights. This includes copying, sharing, or distributing content without permission, or doing anything that could negatively affect the app or other users.
          </Text>

          <Text className='text-[12px] font-poppin mt-3'>
            <Text className='font-poppinBold font-bold'>Updates and Acceptance: </Text>
            We may update these terms from time to time. By continuing to use Turning Point, you agree to any changes. We encourage you to review the terms regularly to stay informed about your rights and responsibilities while using the app.
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#D2D2D2' }} />
          </View>

          <View className='w-full pb-10'>
            <View className='flex-row gap-3 items-center'>
              <CheckBox
                value={agreeTerms}
                onValueChange={setAgreeTerms}
                color={agreeTerms ? '#FF7A00' : undefined}
                style={{ borderRadius: 5, borderWidth: 1 }}
              />
              <Text className='font-poppinBold font-semibold'>I agree with terms and conditions</Text>
            </View>

            <CustomButton disabled={!agreeTerms} onPress={() => router.replace({ pathname: '/(auth)/register' })} title='Continue' className={`mt-5 py-[16px] rounded-[16px] mb-3 ${agreeTerms ? 'bg-orange-500' : 'bg-gray-300'}`} textClassName='font-poppinBold font-bold text-[18px] text-white' />
          </View>
        </ScrollView>

      </View>
    </ScreenWrapper>
  )
}

export default TermsAndConditions
