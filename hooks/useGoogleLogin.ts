import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from './useAuth';
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleLogin = () => {
  const { loginWithGoogleAsync, googleLoginError } = useAuth();
  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '677398859061-ir72bqehqvtihkvlva5iighrntkakvcm.apps.googleusercontent.com',
    iosClientId: '677398859061-f7spvndlfj0amlfkgo9q7uk6c2h3bbol.apps.googleusercontent.com',
    androidClientId: '677398859061-xxxxxxxxxxxxxxxx.apps.googleusercontent.com',
  });

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        if (id_token) {
          try {
            await loginWithGoogleAsync(id_token);
            router.push('/(tabs)');
          } catch (error) {
            console.log(error);
          }
        }
      } else if (response?.type === 'error') {
        Alert.alert('Google Login Failed', 'Something went wrong during Google authentication.');
      }
    };

    handleGoogleResponse();
  }, [response, loginWithGoogleAsync, router]);

  useEffect(() => {
    if (googleLoginError) {
      Alert.alert('Google Login Failed', (googleLoginError as any).message || 'An error occurred on our servers.');
    }
  }, [googleLoginError]);

  return { promptGoogleLogin: promptAsync, isGoogleLoginDisabled: !request };
};
