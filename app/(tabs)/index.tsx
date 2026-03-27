import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, BarChart2, ArrowRight, Plus, Utensils, Coffee, Car, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  const transactions = [
    { name: 'Starbucks', cat: 'Dining Out', date: '2:15 PM', amt: '-₹450.40', status: 'CLEARED', icon: Coffee },
    { name: 'Uber', cat: 'Transport', date: '11:30 AM', amt: '-₹840.85', status: 'PENDING', icon: Car },
    { name: 'Apple Store', cat: 'Electronics', date: 'Yesterday', amt: '-₹94,900.00', status: 'CLEARED', icon: ShoppingBag },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={[styles.avatarBox, { backgroundColor: colors.surfaceContainerHighest }]}>
            <User color={colors.onSurfaceVariant} size={20} />
          </TouchableOpacity>

          <Text style={[styles.vaultTitle, { color: colors.primary, fontFamily: 'LeagueGothic_400Regular', fontSize: 34, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }]}>
            Expensio
          </Text>

          <TouchableOpacity style={styles.bellBtn}>
            <Bell color={colors.onSurface} size={24} />
          </TouchableOpacity>
        </View>

        {/* Total Spent Card (Neon Mint) */}
        <View style={[styles.mainCard, {
          backgroundColor: colors.primary,
          borderRadius: 28,
          padding: spacing.xl,
          marginBottom: spacing.xxl,
        }]}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={[styles.cardLabel, { color: colors.onPrimary, opacity: 0.65, marginBottom: 6 }]}>TOTAL SPENT</Text>
              <Text style={[styles.mainBalance, { color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 38, letterSpacing: -1.5 }]}>
                ₹84,240.15
              </Text>
            </View>
            <View style={[styles.iconButton, { backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: borderRadius.sm, padding: 10 }]}>
              <BarChart2 color={colors.onPrimary} size={20} />
            </View>
          </View>

          <View style={[styles.cardBottomRow, { marginTop: spacing.xxl }]}>
            <View>
              <Text style={[styles.vaultIdLabel, { color: colors.onPrimary, opacity: 0.65, marginBottom: 6 }]}>VAULT ID</Text>
              <Text style={[styles.vaultIdData, { color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>**** 9012</Text>
            </View>

            <TouchableOpacity style={[styles.analysisBtn, {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: borderRadius.full,
              paddingHorizontal: 18,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }]}>
              <Text style={{ color: colors.onPrimary, fontFamily: 'Manrope_500Medium', fontSize: 12, letterSpacing: 0.5 }}>ANALYSIS</Text>
              <ArrowRight color={colors.onPrimary} size={14} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Budget Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }]}>
            Budget
          </Text>
          <Text style={[styles.sectionMeta, { color: colors.onSurfaceVariant, fontSize: 12, letterSpacing: 1, fontFamily: 'Manrope_500Medium' }]}>
            AUG 2024
          </Text>
        </View>

        <View style={styles.budgetRow}>
          {/* Create Budget Card */}
          <TouchableOpacity
            style={[styles.createBudgetCard, {
              borderColor: colors.outlineVariant,
              borderStyle: 'dashed',
              borderWidth: 1.5,
              borderRadius: borderRadius.xl,
            }]}
            onPress={() => router.push('/create-budget')}
          >
            <View style={[styles.circlePlusBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Plus color={colors.onSurfaceVariant} size={22} />
            </View>
            <Text style={[styles.createBudgetText, {
              color: colors.onSurfaceVariant,
              fontFamily: 'Manrope_500Medium',
              fontSize: 11,
              marginTop: 14,
              letterSpacing: 1,
            }]}>
              CREATE BUDGET
            </Text>
          </TouchableOpacity>

          {/* Dining Budget Card */}
          <View style={[styles.budgetCard, {
            backgroundColor: colors.surfaceContainerLow,
            borderRadius: borderRadius.xl,
            padding: spacing.md,
          }]}>
            <View style={[styles.budgetIconBox, { backgroundColor: colors.primaryContainer, borderRadius: 12 }]}>
              <Utensils color={colors.primary} size={18} />
            </View>
            <View style={{ marginTop: spacing.md }}>
              <Text style={[styles.budgetCat, { color: colors.onSurfaceVariant, fontSize: 10, letterSpacing: 1.2, marginBottom: 4 }]}>DINING</Text>
              <Text style={[styles.budgetAmt, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20 }]}>₹18,400</Text>
            </View>
            <View style={[styles.progressBarBg, { backgroundColor: colors.surfaceContainerHighest, marginTop: spacing.md }]}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '60%' }]} />
            </View>
          </View>
        </View>

        {/* Recent Activity Section */}
        <View style={[styles.sectionHeader, { marginTop: spacing.xxl }]}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }]}>
            Recent Activity
          </Text>
          <TouchableOpacity>
            <Text style={[styles.sectionAction, { color: colors.primary, fontSize: 12, letterSpacing: 1, fontFamily: 'Manrope_500Medium' }]}>
              VIEW ALL
            </Text>
          </TouchableOpacity>
        </View>

        {/* Activity List — standalone rows, no container card */}
        <View>
          {transactions.map((tx, idx) => (
            <View key={idx}>
              <View style={[styles.txItem, { paddingVertical: 14 }]}>
                <View style={[styles.txIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <tx.icon color={colors.onSurfaceVariant} size={20} />
                </View>
                <View style={styles.txInfo}>
                  <Text style={[styles.txName, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>{tx.name}</Text>
                  <Text style={[styles.txMeta, { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }]}>{tx.cat} • {tx.date}</Text>
                </View>
                <View style={styles.txAmounts}>
                  <Text style={[styles.txAmt, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15, marginBottom: 5 }]}>{tx.amt}</Text>
                  <View style={[styles.txStatusBadge, {
                    backgroundColor: tx.status === 'CLEARED' ? colors.primaryContainer : colors.surfaceContainerHighest,
                  }]}>
                    <Text style={[styles.txStatusText, {
                      color: tx.status === 'CLEARED' ? colors.primary : colors.onSurfaceVariant,
                    }]}>{tx.status}</Text>
                  </View>
                </View>
              </View>
              {idx < transactions.length - 1 && (
                <View style={[styles.separator, { backgroundColor: colors.outline }]} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[styles.fab, {
          backgroundColor: colors.primary,
          borderRadius: 20, /* Squircle */
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 12,
        }]}
        onPress={() => router.push('/new-transaction')}
      >
        <Plus color={colors.onPrimary} size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'flex-start', // keeps icon native while expanding box visually, actually center is better
  },
  bellBtn: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  vaultTitle: {
    flex: 1, // dynamically fills the center gap ensuring the text sits perfectly aligned
  },
  mainCard: {},
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLabel: {
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
    letterSpacing: 1.2,
  },
  mainBalance: {},
  iconButton: {},
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  vaultIdLabel: {
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
    letterSpacing: 1.2,
  },
  vaultIdData: {},
  analysisBtn: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {},
  sectionMeta: {},
  sectionAction: {},
  budgetRow: {
    flexDirection: 'row',
    gap: 14,
  },
  createBudgetCard: {
    flex: 1,
    height: 148,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePlusBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBudgetText: {},
  budgetCard: {
    flex: 1,
    height: 148,
  },
  budgetIconBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetCat: {},
  budgetAmt: {},
  progressBarBg: {
    height: 3,
    borderRadius: 2,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  txIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txInfo: {
    flex: 1,
  },
  txName: {
    marginBottom: 2,
  },
  txMeta: {},
  txAmounts: {
    alignItems: 'flex-end',
  },
  txAmt: {},
  txStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  txStatusText: {
    fontSize: 8,
    fontFamily: 'Manrope_500Medium',
    letterSpacing: 0.8,
  },
  separator: {
    height: 1,
    opacity: 0.4,
  },
  fab: {
    position: 'absolute',
    bottom: 104,
    right: 24,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
