import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Share2, Copy, MessageCircle, Send, Globe } from 'lucide-react-native';

export default function ShareScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <ChevronLeft color={colors.primary} size={28} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: colors.onSurface }]}>Expensio</Text>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)')} 
            style={styles.headerBtn}
          >
            <Text style={[styles.skipText, { color: colors.primary }]}>SKIP</Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            Spread the <Text style={{ color: colors.primary }}>Wealth</Text>
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Invite friends to join the Expensio.
          </Text>
        </View>

        {/* QR Box */}
        <View style={[styles.qrOuterBox, { 
          backgroundColor: '#121414',
          borderColor: 'rgba(115, 255, 227, 0.2)',
          borderWidth: 1,
          borderRadius: 40 
        }]}>
          <View style={[styles.qrInnerWhiteBox, { backgroundColor: 'white' }]}>
            <View style={{ width: 140, height: 140, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Inter_700Bold', color: '#111827' }}>QR CODE</Text>
              <Text style={{ fontSize: 10, marginTop: 4, fontFamily: 'Inter_400Regular', color: '#6B7280' }}>Safe for work</Text>
            </View>
          </View>
          <Text style={[styles.qrLabel, { color: colors.onSurfaceVariant }]}>PERSONAL INVITE CODE</Text>
        </View>

        {/* Link Share Fields */}
        <View style={styles.linkShareSection}>
          <View style={[styles.urlBox, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
            <Text style={[styles.urlText, { color: colors.onSurfaceVariant }]} numberOfLines={1}>
              expensio.finance/alex_vaughan
            </Text>
            <TouchableOpacity hitSlop={{top:10,bottom:10,left:10,right:10}}>
              <Copy color={colors.primary} size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.mainButton, { backgroundColor: colors.primary, borderRadius: borderRadius.xl }]}>
            <Share2 color={colors.background} size={20} />
            <Text style={[styles.mainButtonText, { color: colors.background }]}>Share Invite Link</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Tracker */}
        <View style={styles.trackerSection}>
          <View style={styles.trackerHeader}>
            <View>
              <Text style={[styles.trackerTitle, { color: colors.onSurface }]}>Unlock Expensio Pro</Text>
              <Text style={[styles.trackerSub, { color: colors.onSurfaceVariant }]}>Invite 3 friends to get 1 year free</Text>
            </View>
            <Text style={[styles.trackerFraction, { color: colors.onSurfaceVariant }]}>
              <Text style={{ color: colors.onSurface }}>2</Text>/3
            </Text>
          </View>
          <View style={[styles.progressBarOuter, { backgroundColor: colors.surfaceContainerHigh }]}>
            <View style={[styles.progressBarInner, { backgroundColor: colors.primary }]} />
          </View>
        </View>

        {/* Direct Share */}
        <View style={styles.directShareSection}>
          <Text style={[styles.sectionDividerText, { color: colors.primary }]}>DIRECT SHARE</Text>
          
          <View style={styles.socialIconsRow}>
            <View style={styles.socialIconCol}>
              <TouchableOpacity style={[styles.socialIconButton, { backgroundColor: colors.surfaceContainerLow }]}>
                <MessageCircle color={colors.onSurface} size={24} />
              </TouchableOpacity>
              <Text style={[styles.socialIconText, { color: colors.onSurfaceVariant }]}>WHATSAPP</Text>
            </View>
            
            <View style={styles.socialIconCol}>
              <TouchableOpacity style={[styles.socialIconButton, { backgroundColor: colors.surfaceContainerLow }]}>
                <Send color={colors.onSurface} size={24} />
              </TouchableOpacity>
              <Text style={[styles.socialIconText, { color: colors.onSurfaceVariant }]}>IMESSAGE</Text>
            </View>

            <View style={styles.socialIconCol}>
              <TouchableOpacity style={[styles.socialIconButton, { backgroundColor: colors.surfaceContainerLow }]}>
                <Globe color={colors.onSurface} size={24} />
              </TouchableOpacity>
              <Text style={[styles.socialIconText, { color: colors.onSurfaceVariant }]}>TWITTER</Text>
            </View>
          </View>
        </View>

        {/* Recent Referrals */}
        <View style={styles.referralsSection}>
          <View style={styles.referralsHeader}>
            <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant }]}>RECENT REFERRALS</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.referralList}>
            {/* Pending User */}
            <View style={styles.referralCard}>
              <View style={[styles.avatarBox, { backgroundColor: colors.surfaceContainerHigh }]} />
              <View style={styles.referralInfo}>
                <Text style={[styles.referralName, { color: colors.onSurface }]}>Marcus Chen</Text>
                <Text style={[styles.referralDate, { color: colors.onSurfaceVariant }]}>JOINED 2 DAYS AGO</Text>
              </View>
              <View style={[styles.pillOutline, { backgroundColor: 'rgba(115, 255, 227, 0.1)', borderColor: 'transparent' }]}>
                <Text style={[styles.pillText, { color: colors.primary }]}>PENDING</Text>
              </View>
            </View>

            {/* Verified User */}
            <View style={styles.referralCard}>
              <View style={[styles.avatarBox, { backgroundColor: colors.surfaceContainerHigh }]} />
              <View style={styles.referralInfo}>
                <Text style={[styles.referralName, { color: colors.onSurface }]}>Elena Rodriguez</Text>
                <Text style={[styles.referralDate, { color: colors.onSurfaceVariant }]}>JOINED 1 WEEK AGO</Text>
              </View>
              <View style={[styles.pillOutline, { borderColor: colors.primary }]}>
                <Text style={[styles.pillText, { color: colors.primary }]}>VERIFIED</Text>
              </View>
            </View>
          </View>

        </View>

        <View style={{ height: 60 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
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
  skipText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'right',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 34,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  qrOuterBox: {
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
  qrInnerWhiteBox: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  qrLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 2,
  },
  linkShareSection: {
    marginBottom: 48,
  },
  urlBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  urlText: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  mainButton: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#73FFE3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  mainButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
  },
  trackerSection: {
    marginBottom: 48,
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  trackerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  trackerSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
  },
  trackerFraction: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
  },
  progressBarOuter: {
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  progressBarInner: {
    height: '100%',
    width: '66%',
    borderRadius: 3,
  },
  directShareSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  sectionDividerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 32,
  },
  socialIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  socialIconCol: {
    alignItems: 'center',
  },
  socialIconButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  socialIconText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 1,
  },
  referralsSection: {
    marginBottom: 20,
  },
  referralsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 2,
  },
  viewAllText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 1,
  },
  referralList: {
    gap: 24,
  },
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  referralInfo: {
    flex: 1,
  },
  referralName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  referralDate: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
    letterSpacing: 1,
  },
  pillOutline: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    letterSpacing: 1,
  },
});
