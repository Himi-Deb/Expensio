import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { useState } from 'react';
import { handleOAuthLogin, loginUser } from '../src/services/auth';
import { useTransactions } from '../src/context/TransactionContext';
import { USE_MOCK_AUTH } from '../src/services/firebaseConfig';

export default function SignInScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const { seedMockOverviewData } = useTransactions();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleEmailSignIn = async () => {
    const cleanId = identifier.trim();
    if (!cleanId || !password) {
      setErrorText('Please fill out all fields.');
      return;
    }

    if (password.length < 8) {
      setErrorText('Password must be at least 8 characters long.');
      return;
    }

    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await loginUser({ identifier: cleanId, password });

      if (response.success) {
        // Automatically seed data if in Mock mode to give the user a rich initial experience
        if (USE_MOCK_AUTH) {
          seedMockOverviewData();
        }
        router.replace('/(tabs)');
      } else {
        setErrorText(response.message || 'Invalid credentials.');
      }
    } catch (err) {
      setErrorText('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setErrorText(null);
    setIsLoading(true);

    try {
      const response = await handleOAuthLogin(provider, `mock_${provider}_token_123`);

      if (response.success) {
        router.replace('/(tabs)');
      } else {
        setErrorText(response.message || 'Social authentication failed.');
      }
    } catch (err) {
      setErrorText(`Failed to connect to ${provider === 'google' ? 'Google' : 'Facebook'}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.brandTitle, { color: colors.onSurface }]}>Expensio</Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={[styles.iconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Shield color={colors.primary} size={32} />
            </View>
            <Text style={[styles.title, { color: colors.onSurface }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>Enter your credentials to access your vault</Text>
            
            {USE_MOCK_AUTH && (
              <View style={{ backgroundColor: 'rgba(115, 255, 227, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary }} />
                <Text style={{ color: colors.primary, fontSize: 10, fontFamily: 'Manrope_700Bold', letterSpacing: 1 }}>DEMO MODE ACTIVE</Text>
              </View>
            )}
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            {errorText && (
              <View style={[styles.errorBox, { backgroundColor: 'rgba(255, 113, 108, 0.1)', borderColor: colors.error }]}>
                <AlertCircle color={colors.error} size={16} />
                <Text style={[styles.errorText, { color: colors.error }]}>{errorText}</Text>
              </View>
            )}

            <View style={[styles.inputGroup, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
              <Mail color={colors.onSurfaceVariant} size={20} />
              <TextInput 
                style={[styles.input, { color: colors.onSurface }]}
                placeholder="Email or Phone Number"
                placeholderTextColor={colors.onSurfaceVariant}
                keyboardType="email-address"
                autoCapitalize="none"
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                underlineColorAndroid="transparent"
                value={identifier}
                onChangeText={setIdentifier}
                editable={!isLoading}
              />
            </View>

            <View style={[styles.inputGroup, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
              <Lock color={colors.onSurfaceVariant} size={20} />
              <TextInput 
                style={[styles.input, { color: colors.onSurface }]}
                placeholder="Password"
                placeholderTextColor={colors.onSurfaceVariant}
                secureTextEntry={!showPassword}
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                underlineColorAndroid="transparent"
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
                {showPassword ? (
                  <EyeOff color={colors.onSurfaceVariant} size={20} />
                ) : (
                  <Eye color={colors.onSurfaceVariant} size={20} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.forgotBtn}
              onPress={() => router.push('/reset-password')}
            >
              <Text style={[styles.forgotText, { color: colors.onSurfaceVariant }]}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.mainButton, 
                { backgroundColor: colors.primary, borderRadius: borderRadius.xl },
                isLoading && { opacity: 0.7 }
              ]}
              onPress={handleEmailSignIn}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.background} size="small" />
              ) : (
                <Text style={[styles.mainButtonText, { color: colors.background }]}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Social Auth */}
          <View style={styles.socialSection}>
            <Text style={[styles.dividerText, { color: colors.onSurfaceVariant }]}>OR CONTINUE WITH</Text>
            
            <View style={styles.socialRow}>
              <TouchableOpacity 
                style={[styles.socialBtn, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}
                disabled={isLoading}
                onPress={() => handleSocialLogin('google')}
              >
                {/* SVG for Google would go here, using text layout for precise match */}
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>G <Text style={[styles.socialText, { color: colors.onSurface }]}> Google</Text></Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.socialBtn, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}
                disabled={isLoading}
                onPress={() => handleSocialLogin('facebook')}
              >
                {/* SVG for Facebook would go here */}
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>f <Text style={[styles.socialText, { color: colors.onSurface }]}> Facebook</Text></Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
              Don't have an account? <Text style={[styles.linkText, { color: colors.primary }]} onPress={() => router.push('/register')}>Register</Text>
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brandTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 32,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  errorText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    flex: 1,
  },
  formSection: {
    marginBottom: 40,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
  },
  mainButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#73FFE3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  mainButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
  },
  socialSection: {
    alignItems: 'center',
  },
  dividerText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 24,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  socialBtn: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  socialText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
  },
  linkText: {
    fontFamily: 'Manrope_700Bold',
  },
});
