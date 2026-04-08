import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { ThemeContext, theme } from '../src/theme/theme';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import {
  useFonts as useLeagueGothicFonts,
  LeagueGothic_400Regular,
} from '@expo-google-fonts/league-gothic';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TransactionProvider } from '../src/context/TransactionContext';
import { GroupProvider } from '../src/context/GroupContext';
import { CurrencyProvider } from '../src/context/CurrencyContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    LeagueGothic_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <ThemeContext.Provider value={theme}>
      {Platform.OS === 'web' && (
        <style dangerouslySetInnerHTML={{ __html: `
          input:focus, textarea:focus, select:focus {
            outline: none !important;
            box-shadow: none !important;
          }
        `}} />
      )}
      <CurrencyProvider>
        <GroupProvider>
          <TransactionProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Initial Entry — Onboarding */}
            <Stack.Screen name="index" options={{ animation: 'fade' }} />
          {/* Authentication flow */}
          <Stack.Screen name="sign-in" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="register" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="reset-password" options={{ presentation: 'modal' }} />
          <Stack.Screen name="share" options={{ presentation: 'modal' }} />
          {/* Main app */}
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
          
          {/* Groups */}
          <Stack.Screen name="group/[id]" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="group/splits" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="create-group" options={{ presentation: 'modal' }} />

          {/* Overlays / Bottom Sheets */}
            <Stack.Screen name="add-expense" options={{ presentation: 'modal' }} />
            <Stack.Screen name="settle-up" options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
          </Stack>
        </TransactionProvider>
      </GroupProvider>
      </CurrencyProvider>
    </ThemeContext.Provider>
  );
}
