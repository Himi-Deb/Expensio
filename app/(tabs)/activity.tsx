import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft, Search, TrendingUp, Utensils, Coffee, Sandwich, Wine, ShoppingBasket,
  CreditCard, AlertCircle,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

type Transaction = {
  id: string;
  name: string;
  time: string;
  method: string;
  amount: string;
  manualRecat?: boolean;
  icon: React.ComponentType<{ color: string; size: number }>;
};

type DayGroup = {
  day: string;
  transactions: Transaction[];
};

export default function ActivityScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  const dayGroups: DayGroup[] = [
    {
      day: 'TODAY, OCT 24',
      transactions: [
        {
          id: '1',
          name: 'Blue Bottle Coffee',
          time: '08:42 AM',
          method: 'Visa ****4221',
          amount: '-₹6.50',
          icon: Coffee,
        },
        {
          id: '2',
          name: 'Shake Shack',
          time: '12:15 PM',
          method: 'Apple Pay',
          amount: '-₹18.90',
          icon: Sandwich,
        },
      ],
    },
    {
      day: 'YESTERDAY, OCT 23',
      transactions: [
        {
          id: '3',
          name: 'The Rooftop Lounge',
          time: '09:30 PM',
          method: 'Visa ****4221',
          amount: '-₹85.00',
          manualRecat: true,
          icon: Wine,
        },
      ],
    },
    {
      day: 'OCT 21',
      transactions: [
        {
          id: '4',
          name: 'Tartine Manufactory',
          time: '10:45 AM',
          method: 'Mastercard ****9901',
          amount: '-₹34.20',
          icon: ShoppingBasket,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.md }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft color={colors.onSurface} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          Dining Out
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.headerIconBtn, { marginRight: 8 }]}>
            <Search color={colors.onSurface} size={22} />
          </TouchableOpacity>
          <View style={[styles.profileAvatar, { backgroundColor: colors.surfaceContainerHighest }]}>
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 13 }}>H</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Category Hero */}
        <View style={[styles.heroSection, { paddingHorizontal: spacing.lg }]}>
          <View style={[styles.categoryIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
            <Utensils color={colors.primary} size={28} />
          </View>

          <Text style={[styles.heroLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 1.2, marginTop: 20 }]}>
            TOTAL MONTHLY SPEND
          </Text>
          <Text style={[styles.heroAmount, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 42, letterSpacing: -1.5, marginTop: 4 }]}>
            ₹1,248.50
          </Text>
          <View style={styles.trendRow}>
            <TrendingUp color="#FF716C" size={14} />
            <Text style={[styles.trendText, { color: '#FF716C', fontFamily: 'Inter_500Medium', fontSize: 12, marginLeft: 5 }]}>
              12% more than last month
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={[styles.statsRow, { marginHorizontal: spacing.lg, marginTop: spacing.xl }]}>
          <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1 }]}>
              FREQUENT VENDOR
            </Text>
            <Text style={[styles.statValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18, marginTop: 6 }]}>
              Blue Bottle
            </Text>
            <Text style={[styles.statMeta, { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }]}>14 Visits</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1 }]}>
              AVERAGE TICKET
            </Text>
            <Text style={[styles.statValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18, marginTop: 6 }]}>
              ₹42.30
            </Text>
            <Text style={[styles.statMeta, { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }]}>Per transaction</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.activityHeader, { paddingHorizontal: spacing.lg, marginTop: spacing.xxl }]}>
          <Text style={[styles.activityTitle, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }]}>
            Recent Activity
          </Text>
          <Text style={[styles.activityMonth, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 12, letterSpacing: 0.5 }]}>
            October 2023
          </Text>
        </View>

        {dayGroups.map((group) => (
          <View key={group.day} style={{ marginTop: 20 }}>
            {/* Day label */}
            <Text style={[styles.dayLabel, {
              color: colors.onSurfaceVariant,
              fontFamily: 'Inter_500Medium',
              fontSize: 11,
              letterSpacing: 1,
              paddingHorizontal: spacing.lg,
              marginBottom: 10,
            }]}>
              {group.day}
            </Text>

            {/* Transactions for this day */}
            <View style={[styles.dayCard, { backgroundColor: colors.surfaceContainerLow, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg }]}>
              {group.transactions.map((tx, idx) => (
                <View key={tx.id}>
                  <View style={[styles.txRow, { padding: spacing.md }]}>
                    <View style={[styles.txIconBox, { backgroundColor: colors.surfaceContainerHighest }]}>
                      <tx.icon color={colors.onSurfaceVariant} size={18} />
                    </View>
                    <View style={styles.txInfo}>
                      <Text style={[styles.txName, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                        {tx.name}
                      </Text>
                      <Text style={[styles.txMeta, { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }]}>
                        {tx.time} • {tx.method}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={[styles.txAmt, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                        {tx.amount}
                      </Text>
                      {tx.manualRecat && (
                        <View style={[styles.recatBadge, { marginTop: 4 }]}>
                          <AlertCircle color={colors.primary} size={10} style={{ marginRight: 3 }} />
                          <Text style={[styles.recatText, { color: colors.primary, fontFamily: 'Inter_500Medium', fontSize: 8, letterSpacing: 0.5 }]}>
                            MANUAL RE-CATEGORIZATION
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {idx < group.transactions.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.outline, marginHorizontal: spacing.md }]} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Bulk Edit Banner */}
        <View style={[styles.bulkEditBanner, {
          backgroundColor: colors.surfaceContainerLow,
          marginHorizontal: spacing.lg,
          marginTop: spacing.xxl,
          borderRadius: borderRadius.lg,
          padding: spacing.lg,
        }]}>
          <Text style={[styles.bulkEditTitle, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, textAlign: 'center', marginBottom: 6 }]}>
            Notice something wrong?
          </Text>
          <Text style={[styles.bulkEditDesc, { color: colors.onSurfaceVariant, fontSize: 13, textAlign: 'center', lineHeight: 19, marginBottom: 20 }]}>
            We automatically group dining transactions. You can manually adjust them to improve our accuracy.
          </Text>
          <TouchableOpacity style={[styles.bulkEditBtn, {
            borderColor: colors.outlineVariant,
            borderWidth: 1,
            borderRadius: borderRadius.full,
            paddingVertical: 12,
            alignItems: 'center',
          }]}>
            <Text style={[styles.bulkEditBtnText, { color: colors.onSurface, fontFamily: 'Inter_500Medium', fontSize: 14 }]}>
              Bulk Edit Transactions
            </Text>
          </TouchableOpacity>
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
  },
  backBtn: {},
  headerTitle: {},
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {},
  profileAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 24,
  },
  categoryIconBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLabel: {},
  heroAmount: {},
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {},
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
  },
  statLabel: {},
  statValue: {},
  statMeta: {},
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {},
  activityMonth: {},
  dayLabel: {},
  dayCard: {
    overflow: 'hidden',
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txInfo: {
    flex: 1,
  },
  txName: {},
  txMeta: {},
  txAmt: {},
  recatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recatText: {},
  divider: {
    height: 1,
    opacity: 0.5,
  },
  bulkEditBanner: {},
  bulkEditTitle: {},
  bulkEditDesc: {},
  bulkEditBtn: {},
  bulkEditBtnText: {},
});
