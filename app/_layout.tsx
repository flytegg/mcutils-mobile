import { ThemeProvider } from '@/components/ThemeProvider';
import '../global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import {useEffect} from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const queryClient = new QueryClient();
  
  const [loaded, error] = useFonts({
    'Minecraft': require('../assets/fonts/minecraft.ttf'),
  });
  
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <ThemeProvider>
      <GluestackUIProvider mode="dark">
        <QueryClientProvider client={queryClient}>
          <Stack />
        </QueryClientProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}
