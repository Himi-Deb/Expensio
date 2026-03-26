import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft, Utensils, Search,
  Coffee, Sandwich, Pizza, ChevronRight, ArrowUpRight,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Grouped Mock Data
const TRANSACTIONS_BY_DATE = [
  {
    dateLabel: 'TODAY, OCT 24',
    data: [
      { id: '1', name: 'Blue Bottle Coffee', time: '8:45 AM', method: 'Apple Pay', amt: '-₹450.40', icon: Coffee },
      { id: '2', name: 'Shake Shack', time: '1:15 PM', method: 'Credit Card', amt: '-₹850.00', icon: Sandwich },
    ],
  },
  {
    dateLabel: 'YESTERDAY, OCT 23',
    data: [
      { id: '3', name: 'The Rooftop Lounge', time: '8:30 PM', method: 'Debit Card', amt: '-₹3,400.00', icon: Pizza },
    ],
  },
];

export default function DiningTransactionsScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.primary} size={26} />
        </TouchableOpacity>
        <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }}>
          Dining Out
        </Text>
        <TouchableOpacity>
          <Search color={colors.primary} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Hero Section */}
        <View style={{ alignItems: 'center', marginTop: 32, marginBottom: 32 }}>
          <View style={{ width: 64, height: 64, backgroundColor: colors.primaryContainer, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Utensils color={colors.primary} size={28} />
          </View>
          <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
            TOTAL MONTHLY SPEND
          </Text>
          <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 44, letterSpacing: -1.5 }}>
            ₹1,248.50
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#3D1C1C', paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full, marginTop: 12, gap: 6 }}>
            <ArrowUpRight color="#FF716C" size={14} />
            <Text style={{ color: '#FFACAC', fontFamily: 'Inter_500Medium', fontSize: 12 }}>
              12% more than last month
            </Text>
          </View>
        </View>

        {/* Two Columns Stats */}
        <View style={{ flexDirection: 'row', paddingHorizontal: spacing.xl, marginBottom: 40 }}>
          {/* Frequent Vendor */}
          <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: colors.outline, paddingRight: 16 }}>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>
              FREQUENT VENDOR
            </Text>
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }}>
              Blue Bottle
            </Text>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 }}>
              14 Visits
            </Text>
          </View>

          {/* Average Tx */}
          <View style={{ flex: 1, paddingLeft: 16 }}>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 8 }}>
              AVERAGE TRANSACTION
            </Text>
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }}>
              ₹42.30
            </Text>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 4 }}>
              Per transaction
            </Text>
          </View>
        </View>

        {/* Recent Activity Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, marginBottom: 16 }}>
          <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }}>
            Recent Activity
          </Text>
          <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 13 }}>
            October 2023
          </Text>
        </View>

        {/* List of Transactions */}
        <View style={{ paddingHorizontal: spacing.xl, gap: 24 }}>
          {TRANSACTIONS_BY_DATE.map((group) => (
            <View key={group.dateLabel}>
              <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 1, marginBottom: 12 }}>
                {group.dateLabel}
              </Text>
              
              <View style={{ backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.xl, overflow: 'hidden' }}>
                {group.data.map((tx, idx) => (
                  <View key={tx.id}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{ flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: 14 }}
                    >
                      <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceContainerHighest, justifyContent: 'center', alignItems: 'center' }}>
                        <tx.icon color={colors.onSurfaceVariant} size={20} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }}>
                          {tx.name}
                        </Text>
                        <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 13, marginTop: 2 }}>
                          {tx.time} • {tx.method}
                        </Text>
                      </View>
                      <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }}>
                        {tx.amt}
                      </Text>
                    </TouchableOpacity>
                    {/* Divider except last item */}
                    {idx < group.data.length - 1 && (
                      <View style={{ height: 1, backgroundColor: colors.outline, marginLeft: 76 }} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Notice Card */}
        <View style={{ marginHorizontal: spacing.xl, marginTop: 40, borderTopWidth: 1, borderTopColor: colors.outline, paddingTop: 32 }}>
          <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginBottom: 8 }}>
            Notice something wrong?
          </Text>
          <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 22, marginBottom: 20 }}>
            We automatically group dining transactions. If your activity seems miscategorized, you can edit them.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.surfaceContainerHigh,
              paddingVertical: 14,
              borderRadius: borderRadius.lg,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>
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
});
