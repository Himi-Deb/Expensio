import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye } from 'lucide-react-native';

export default function RegisterScreen() {
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
            <TouchableOpacity style={styles.headerBtn}>
              <Text style={[styles.helpText, { color: colors.primary }]}>Help</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={[styles.title, { color: colors.onSurface }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>Join Expensio for premium financial management.</Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            
            <View style={styles.inputOuter}>
              <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>FULL NAME</Text>
              <View style={[styles.inputGroup, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <TextInput 
                  style={[styles.input, { color: colors.onSurface }]}
                  placeholder="Please enter your full name"
                  placeholderTextColor={colors.surfaceContainerHighest}
                />
              </View>
            </View>

            <View style={styles.inputOuter}>
              <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>USERNAME</Text>
              <View style={[styles.inputGroup, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <TextInput 
                  style={[styles.input, { color: colors.onSurface }]}
                  placeholder="Please enter the preferred user name"
                  placeholderTextColor={colors.surfaceContainerHighest}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputOuter}>
              <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>EMAIL OR PHONE</Text>
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

            <View style={styles.inputOuter}>
              <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>PASSWORD</Text>
              <View style={[styles.inputGroup, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <TextInput 
                  style={[styles.input, { color: colors.onSurface }]}
                  placeholder="Min. 8 characters"
                  placeholderTextColor={colors.surfaceContainerHighest}
                  secureTextEntry
                />
                <TouchableOpacity>
                  <Eye color={colors.onSurfaceVariant} size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.termsRow}>
              <View style={[styles.checkbox, { borderColor: colors.onSurfaceVariant, borderRadius: 6 }]} />
              <Text style={[styles.termsText, { color: colors.onSurfaceVariant }]}>
                I agree to the <Text style={{ color: colors.primary, fontFamily: 'Inter_500Medium' }}>Terms of Service</Text> and <Text style={{ color: colors.primary, fontFamily: 'Inter_500Medium' }}>Privacy Policy</Text>.
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, { backgroundColor: colors.primary, borderRadius: borderRadius.xl }]}
              onPress={() => router.push('/(tabs)')}
              activeOpacity={0.8}
            >
              <Text style={[styles.mainButtonText, { color: colors.background }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Social Auth */}
          <View style={styles.socialSection}>
            <Text style={[styles.dividerText, { color: colors.onSurfaceVariant }]}>OR REGISTER WITH</Text>
            
            <View style={styles.socialRow}>
              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>G <Text style={[styles.socialText, { color: colors.onSurface }]}> Google</Text></Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.socialBtn, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>f <Text style={[styles.socialText, { color: colors.onSurface }]}> Facebook</Text></Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          {/* Bottom Link */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
              Already have an account? <Text style={[styles.linkText, { color: colors.primary }]} onPress={() => router.push('/sign-in')}>Sign In</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  headerBtn: {
    minWidth: 44,
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
  },
  helpText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    textAlign: 'right',
  },
  heroSection: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 36,
    letterSpacing: -1.5,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  formSection: {
    marginBottom: 40,
  },
  inputOuter: {
    marginBottom: 20,
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
    gap: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
  },
  termsText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
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
    fontFamily: 'Inter_600SemiBold',
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
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  linkText: {
    fontFamily: 'Manrope_700Bold',
  },
});
