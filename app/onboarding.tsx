import { FlatList, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/stores/appStore';
import { onBoardingData } from '@/constants/data';

const OnBoarding = () => {
  const { width } = Dimensions.get('window');
  const router = useRouter();
  const flatListRef = useRef<FlatList<any>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const setOnBoardingComplete = useAppStore((state) => state.setOnboardingCompleted);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const handleNext = () => {
    if (activeIndex < onBoardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  const handleGetStarted = () => {
    setOnBoardingComplete(true);
    router.push('/(tabs)');
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <FlatList
          data={onBoardingData}
          ref={flatListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          renderItem={({ item }) => (
            <View className="flex-1 justify-center items-center" style={{ width }}>
              <Image source={item.image} contentFit='cover' className="justify-center mb-10" style={{ width: width * 0.9, height: width * 0.9, borderRadius: 16 }} />
              <View className="flex-[0.7] mt-10">
                <Text className="font-semibold text-3xl mb-4 text-black text-center font-poppinBold">{item.title}</Text>
                <Text className="font-light text-gray-600 text-center px-6 font-poppin">{item.description}</Text>
              </View>
            </View>

          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
        <View className="px-5 ">
          <View className="flex-row justify-center items-center mb-10">
            {onBoardingData.map((_, idx) => (
              <View
                key={idx}
                className="h-2 rounded-full mx-1"
                style={{
                  backgroundColor: idx === activeIndex ? '#FF7A00' : '#FFCA99',
                  width: idx === activeIndex ? 30 : 7,
                }}
              />
            ))}
          </View>

          <View className="items-center mb-20">
            {activeIndex === onBoardingData.length - 1 ? (
              <TouchableOpacity className="bg-orange-500 py-4 px-8 rounded-full items-center justify-center w-full" onPress={handleGetStarted}>
                <Text className="text-white text-xl font-bold font-poppinBold">Get Started</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="bg-orange-500 py-4 px-8 rounded-full items-center justify-center w-full" onPress={handleNext}>
                <Text className="text-white text-xl font-bold font-poppinBold">Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default OnBoarding;
