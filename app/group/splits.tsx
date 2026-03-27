import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Settings, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function MemberSplitsScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  const members = [
    { id: '1', name: 'Aryan Sharma', status: 'is owed ₹5,000', type: 'owed', avatarConfirmed: true },
    { id: '2', name: 'Priya Kapoor', status: 'owes ₹1,200', type: 'owes', avatarConfirmed: false },
    { id: '3', name: 'Rohan Das', status: 'owes ₹3,450', type: 'owes', avatarConfirmed: false },
    { id: '4', name: 'Isha Varma', status: 'is owed ₹2,800', type: 'owed', avatarConfirmed: false },
    { id: '5', name: 'Vikram Singh', status: 'Settled Up', type: 'settled', avatarConfirmed: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.xl, paddingTop: spacing.md }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.onSurface} size={28} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>
          Group Details
        </Text>
        <TouchableOpacity>
          <Settings color={colors.primary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
        <View style={{ paddingHorizontal: spacing.xl, marginTop: spacing.lg }}>
          <Text style={[styles.pageTitle, { color: colors.onSurface }]}>Member Splits</Text>
          <Text style={[styles.pageSubtitle, { color: colors.onSurfaceVariant }]}>Flatmates • October Settlement</Text>
        </View>

        {/* Debt Summary Row */}
        <View style={[styles.summaryRow, { paddingHorizontal: spacing.xl, marginTop: spacing.xxl, marginBottom: spacing.xl }]}>
          <View style={styles.summaryBlock}>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>TOTAL GROUP DEBT</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>₹12,450</Text>
          </View>
          <View style={styles.summaryBlock}>
            <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>PENDING TASKS</Text>
            <View style={styles.tasksRow}>
              <Text style={[styles.tasksValue, { color: colors.onSurface }]}>4</Text>
              <View style={[styles.tasksPill, { backgroundColor: 'rgba(255, 113, 108, 0.15)', borderRadius: borderRadius.full }]}>
                <Text style={[styles.tasksPillText, { color: colors.error }]}>Settle up</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Balances List */}
        <View style={{ paddingHorizontal: spacing.xl }}>
          <Text style={[styles.sectionTitle, { color: colors.onSurfaceVariant, marginBottom: spacing.lg }]}>BALANCES</Text>
          
          {members.map((member, index) => (
            <View key={member.id} style={[styles.memberRow, index < members.length - 1 && { marginBottom: spacing.xl }]}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: colors.surfaceContainerHigh }]} />
                {member.avatarConfirmed && (
                  <View style={[styles.avatarBadge, { backgroundColor: colors.background, borderRadius: 10 }]}>
                    <CheckCircle2 color={colors.primary} size={16} fill={colors.background} />
                  </View>
                )}
              </View>
              
              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: colors.onSurface }]}>{member.name}</Text>
                <Text style={[styles.memberStatus, { 
                  color: member.type === 'owes' ? colors.error : colors.primary
                }]}>
                  {member.status}
                </Text>
              </View>

              <View style={styles.memberAction}>
                {member.type === 'owes' && (
                  <TouchableOpacity 
                    style={[styles.settleButton, { backgroundColor: colors.primary, borderRadius: borderRadius.md }]}
                    onPress={() => router.push('/settle-up')}
                  >
                    <Text style={[styles.settleButtonText, { color: colors.background }]}>Settle Up</Text>
                  </TouchableOpacity>
                )}
                {member.type === 'owed' && (
                  <ChevronRight color={colors.onSurfaceVariant} size={20} />
                )}
                {member.type === 'settled' && (
                  <CheckCircle2 color={colors.primary} size={20} />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Info Footer */}
        <View style={[styles.footerInfo, { paddingHorizontal: spacing.xl, marginTop: 40 }]}>
          <AlertCircle color={colors.onSurfaceVariant} size={20} style={{ marginBottom: 12 }} />
          <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
            Balances are calculated based on all active expenses in the <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold' }}>Flatmates</Text> group. Settle up to clear individual debts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
  },
  content: {},
  pageTitle: {
    fontSize: 32,
    fontFamily: 'Manrope_700Bold',
    letterSpacing: -1,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    fontFamily: 'Manrope_500Medium',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryBlock: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 11,
    fontFamily: 'Manrope_500Medium',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 32,
    fontFamily: 'Manrope_700Bold',
    letterSpacing: -1,
  },
  tasksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tasksValue: {
    fontSize: 28,
    fontFamily: 'Manrope_700Bold',
  },
  tasksPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tasksPillText: {
    fontSize: 11,
    fontFamily: 'Manrope_500Medium',
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Manrope_500Medium',
    letterSpacing: 1.5,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    marginBottom: 4,
  },
  memberStatus: {
    fontSize: 13,
    fontFamily: 'Manrope_400Regular',
  },
  memberAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    minWidth: 80,
  },
  settleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settleButtonText: {
    fontSize: 14,
    fontFamily: 'Manrope_700Bold',
  },
  footerInfo: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontFamily: 'Manrope_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
