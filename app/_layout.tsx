import { Stack } from 'expo-router';
import { ThemeContext, theme } from '../src/theme/theme';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold
} from '@expo-google-fonts/manrope';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <ThemeContext.Provider value={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* Transaction flows */}
        <Stack.Screen name="new-transaction" options={{ presentation: 'modal' }} />
        <Stack.Screen name="transaction-detail" options={{ animation: 'slide_from_right' }} />
        {/* Budget */}
        <Stack.Screen name="create-budget" options={{ presentation: 'modal' }} />
        {/* Analytics */}
        <Stack.Screen name="detailed-distribution" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="dining-transactions" options={{ animation: 'slide_from_right' }} />
        {/* Pickers / modals */}
        <Stack.Screen name="select-category" options={{ presentation: 'modal' }} />
        <Stack.Screen name="select-group" options={{ presentation: 'modal' }} />
        {/* Legacy */}
        <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settle-up" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeContext.Provider>
  );
}
