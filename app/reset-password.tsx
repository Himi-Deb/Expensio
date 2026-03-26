import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Info, Lock, RotateCcw } from 'lucide-react-native';

export default function ResetPasswordScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
              <ChevronLeft color={colors.primary} size={28} />
            </TouchableOpacity>
            <Text style={[styles.brandTitle, { color: colors.onSurface }]}>Expensio</Text>
            <View style={styles.headerBtn} />
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconStack}>
              <View style={[styles.iconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
                <Lock color={colors.primary} size={24} />
              </View>
              <View style={[styles.iconBadge, { backgroundColor: colors.background }]}>
                <RotateCcw color={colors.primary} size={14} />
              </View>
            </View>
            <Text style={[styles.title, { color: colors.onSurface }]}>Reset Password</Text>
            <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <View style={styles.inputOuter}>
              <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>EMAIL ADDRESS</Text>
              <View style={[styles.inputGroup, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <TextInput 
                  style={[styles.input, { color: colors.onSurface }]}
                  placeholder="Enter your email here"
                  placeholderTextColor={colors.surfaceContainerHighest}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, { backgroundColor: colors.primary, borderRadius: borderRadius.xl }]}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Text style={[styles.mainButtonText, { color: colors.background }]}>Send Reset Link</Text>
            </TouchableOpacity>

            <View style={styles.infoRow}>
              <Info color={colors.primary} size={20} style={{ marginTop: 2 }} />
              <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
                If an account matches this email, you will receive instructions shortly. Please check your inbox and spam folder.
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom Link */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <Text style={[styles.returnText, { color: colors.primary }]}>Return to Sign In</Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  headerBtn: {
    width: 44,
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
  },
  heroSection: {
    marginBottom: 32,
  },
  iconStack: {
    position: 'relative',
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 32,
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  formSection: {
    marginBottom: 40,
  },
  inputOuter: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
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
    marginBottom: 32,
  },
  mainButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 16,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  returnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
  },
});
