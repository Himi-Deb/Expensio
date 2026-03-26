import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { ChevronLeft, Wallet, ArrowRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettleUpScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing.lg }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.onSurface} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
           Settle Up
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.content, { paddingHorizontal: spacing.xl }]}>
        {/* Settlement Profile - High Editorial Impact */}
        <View style={styles.profileSection}>
           <View style={[styles.avatar, { backgroundColor: colors.surfaceContainerHighest }]}>
              <Text style={[styles.avatarText, { color: colors.onSurface, fontFamily: 'Manrope_700Bold' }]}>R</Text>
           </View>
           
           <Text style={[styles.settleSub, { color: colors.onSurfaceVariant, marginBottom: spacing.xs }]}>PAYING RAHUL</Text>
           <Text style={[styles.mainAmount, { color: colors.onSurface, fontSize: 42, fontFamily: 'Manrope_700Bold', letterSpacing: -0.8 }]}>
              ₹450.00
           </Text>
           <Text style={[styles.groupMeta, { color: colors.onSurfaceVariant, fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: spacing.sm }]}>
              Trip to Goa • Food & Travel
           </Text>
        </View>

        {/* Bridge Context - Level 1 Tonal Layering */}
        <View style={[styles.infoCard, { 
          backgroundColor: colors.surfaceContainerLow, 
          borderRadius: borderRadius.xl,
          padding: spacing.xl,
          marginBottom: spacing.xxl
        }]}>
          <View style={[styles.iconBox, { backgroundColor: 'white', borderRadius: borderRadius.md }]}>
             <Wallet color={colors.primary} size={20} />
          </View>
          <View style={styles.infoText}>
             <Text style={[styles.infoTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 15, marginBottom: 4 }]}>
                Bridge Auto-Sync
             </Text>
             <Text style={[styles.infoDesc, { color: colors.onSurfaceVariant, fontSize: 13, lineHeight: 18 }]}>
                This payment will be categorized as <Text style={{ fontWeight: 'bold' }}>"Split Reimbursement"</Text> in your personal finance tracker.
             </Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        {/* Premium Action Button */}
        <TouchableOpacity 
          style={[styles.settleButton, { 
            backgroundColor: colors.primary, 
            borderRadius: borderRadius.full,
            paddingVertical: 18,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            marginBottom: spacing.xl
          }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: 'white', fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
             Pay via UPI
          </Text>
          <ArrowRight color="white" size={18} />
        </TouchableOpacity>
        
        <Text style={[styles.secureNote, { color: colors.onSurfaceVariant, fontSize: 11, textAlign: 'center', marginBottom: spacing.lg }]}>
           Securely settled via linked UPI apps
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {},
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 48,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarText: {
    fontSize: 32,
  },
  settleSub: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontFamily: 'Inter_500Medium',
  },
  mainAmount: {},
  groupMeta: {},
  infoCard: {
    flexDirection: 'row',
    gap: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {},
  infoDesc: {},
  settleButton: {},
  buttonText: {},
  secureNote: {},
});
