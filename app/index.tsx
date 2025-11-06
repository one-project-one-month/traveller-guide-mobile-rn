import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/stores/appStore';


const Index = () => {
  const onBoardingCompleted = useAppStore((state) => state.isOnboardingCompleted);

  const router = useRouter();
  const { width, height } = Dimensions.get('window');
  const animation = useRef(new Animated.Value(0)).current;
  const imageTranslate = useRef(new Animated.Value(height)).current;
  const titleTranslate = useRef(new Animated.Value(height)).current;
  const subtitleTranslate = useRef(new Animated.Value(height)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useFonts({ Pacifico_400Regular });
  useFonts({ Poppins_400Regular });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (onBoardingCompleted) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 3500);
    return () => clearTimeout(timeOut);
  }, [onBoardingCompleted, router]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.timing(imageTranslate, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(subtitleTranslate, {
          toValue: 0,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [animation, imageTranslate, titleTranslate, subtitleTranslate, titleOpacity, subtitleOpacity]);

  const maxSize = Math.sqrt(width * width + height * height) * 2;

  const animatedStyle = {
    width: maxSize,
    height: maxSize,
    borderRadius: maxSize / 2,
    opacity: animation,
    position: 'absolute' as 'absolute',
    top: height / 2 - maxSize / 2,
    left: width / 2 - maxSize / 2,
    transform: [
      { scale: animation },
    ],
  };

  return (
    <View
      style={styles.container}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <LinearGradient
          colors={['#e53e3e', '#f59e42']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Image
              resizeMode="contain"
              source={require('@/assets/icon.png')}
              style={{
                width: 200,
                height: 200,
                transform: [{ translateY: imageTranslate }]
              }}
            />
            <Animated.Text
              style={{
                fontSize: 45,
                fontFamily: "Pacifico_400Regular",
                color: "white",
                transform: [{ translateY: titleTranslate }],
                opacity: titleOpacity
              }}
            >
              Turning Point
            </Animated.Text>
            <Animated.Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: 25,
                color: "white",
                marginTop: 20,
                letterSpacing: 4,
                fontWeight: '500',
                transform: [{ translateY: subtitleTranslate }],
                opacity: subtitleOpacity
              }}
            >
              Travel Guide
            </Animated.Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});

export default Index;
