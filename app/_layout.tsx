import { Slot } from "expo-router";
import './global.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "@expo-google-fonts/pacifico";

const queryClient = new QueryClient();

export default function RootLayout() {

  const [fontLoaded] = useFonts({
    'Poppin': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Pacifico': require('@/assets/fonts/Pacifico.ttf'),
  })

  if (!fontLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  )
}
