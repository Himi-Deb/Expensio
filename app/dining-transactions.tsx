import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft, Pencil, Utensils, Search, SlidersHorizontal,
  Coffee, Sandwich, Pizza, ChevronRight, TrendingUp,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const TRANSACTIONS = [
  {
    id: '1',
    name: 'Starbucks',
    time: '2:15 PM',
    cat: 'Coffee & Drinks',
    amt: '₹450.40',
    icon: Coffee,
    date: 'Today',
  },
  {
    id: '2',
    name: 'West Village Bistro',
    time: 'Yesterday',
    cat: 'Dinner',
    amt: '₹1,200.00',
    icon: Sandwich,
    date: 'Yesterday',
  },
  {
    id: '3',
    name: 'Pizza Hut',
    time: '12 Aug',
    cat: 'Lunch Takeaway',
    amt: '₹850.00',
    icon: Pizza,
    date: '12 Aug',
  },
];

export default function DiningTransactionsScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = TRANSACTIONS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingVertical: spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.primary} size={26} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          Dining Transactions
        </Text>
        <TouchableOpacity>
          <Pencil color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Hero */}
        <View style={[styles.hero, { paddingTop: spacing.lg, paddingBottom: spacing.xl, alignItems: 'center' }]}>
          <View style={[styles.heroIconBox, { backgroundColor: colors.surfaceContainerHigh, borderRadius: 20 }]}>
            <Utensils color={colors.primary} size={28} />
          </View>
          <Text style={[styles.heroLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 1.2, marginTop: 18, marginBottom: 4 }]}>
            TOTAL SPENT
          </Text>
          <Text style={[styles.heroAmt, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 44, letterSpacing: -1.5 }]}>
            ₹19,282
          </Text>
          <View style={styles.trendRow}>
            <Text style={[styles.trendRed, { color: colors.tertiary, fontFamily: 'Manrope_700Bold', fontSize: 13 }]}>
              12% more{' '}
            </Text>
            <Text style={[styles.trendNormal, { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 13 }]}>
              than last month
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchBar, {
          backgroundColor: colors.surfaceContainerLow,
          borderRadius: borderRadius.full,
          marginHorizontal: spacing.lg,
          marginBottom: spacing.xl,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.md,
          paddingVertical: 12,
          gap: 10,
        }]}>
          <Search color={colors.onSurfaceVariant} size={18} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search dining..."
            placeholderTextColor={colors.onSurfaceVariant}
            style={[styles.searchInput, {
              flex: 1,
              color: colors.onSurface,
              fontFamily: 'Inter_400Regular',
              fontSize: 15,
            }]}
          />
        </View>

        {/* Recent History */}
        <View style={[styles.sectionRow, { paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }]}>
            Recent History
          </Text>
          <TouchableOpacity>
            <SlidersHorizontal color={colors.onSurfaceVariant} size={20} />
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: spacing.lg, gap: 2 }}>
          {filtered.map((tx, idx) => (
            <TouchableOpacity
              key={tx.id}
              activeOpacity={0.7}
              onPress={() => router.push('/transaction-detail')}
              style={[styles.txCard, {
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: idx === 0 ? borderRadius.lg : idx === filtered.length - 1 ? borderRadius.lg : 0,
                ...(idx === 0 && { borderTopLeftRadius: borderRadius.lg, borderTopRightRadius: borderRadius.lg, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }),
                ...(idx === filtered.length - 1 && { borderBottomLeftRadius: borderRadius.lg, borderBottomRightRadius: borderRadius.lg, borderTopLeftRadius: 4, borderTopRightRadius: 4 }),
                ...(idx > 0 && idx < filtered.length - 1 && { borderRadius: 4 }),
                padding: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
                marginBottom: 2,
              }]}
            >
              <View style={[styles.txIcon, { backgroundColor: colors.surfaceContainerHighest }]}>
                <tx.icon color={colors.onSurfaceVariant} size={18} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.txName, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                  {tx.name}
                </Text>
                <Text style={[styles.txMeta, { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 2 }]}>
                  {tx.time} • {tx.cat}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <Text style={[styles.txAmt, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                  {tx.amt}
                </Text>
                <ChevronRight color={colors.onSurfaceVariant} size={16} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spending Velocity */}
        <View style={[styles.velocityCard, {
          backgroundColor: colors.surfaceContainerLow,
          marginHorizontal: spacing.lg,
          marginTop: spacing.xxl,
          borderRadius: borderRadius.xl,
          overflow: 'hidden',
        }]}>
          {/* Subtle teal glow bg */}
          <View style={[styles.velocityGlow, { backgroundColor: `${colors.primary}08` }]} />

          <View style={{ padding: spacing.lg }}>
            <View style={styles.velocityHeader}>
              <Text style={[styles.velocityLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1 }]}>
                MONTHLY FREQUENCY
              </Text>
              <View style={[styles.highBadge, { backgroundColor: `${colors.primary}20` }]}>
                <Text style={[styles.highText, { color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 13 }]}>
                  High
                </Text>
              </View>
            </View>
            <Text style={[styles.velocityBody, {
              color: colors.onSurfaceVariant,
              fontFamily: 'Inter_400Regular',
              fontSize: 13,
              lineHeight: 20,
              marginTop: 12,
            }]}>
              You've visited{' '}
              <Text style={{ color: colors.primary, fontFamily: 'Inter_500Medium' }}>14 dining spots</Text>{' '}
              this month. This is 3 more than your average.
            </Text>
          </View>
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
  headerTitle: {},
  hero: {},
  heroIconBox: {
    width: 68,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLabel: {},
  heroAmt: {},
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  trendRed: {},
  trendNormal: {},
  searchBar: {},
  searchInput: {},
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {},
  txCard: {},
  txIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txName: {},
  txMeta: {},
  txAmt: {},
  velocityCard: {},
  velocityGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  velocityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  velocityLabel: {},
  highBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  highText: {},
  velocityBody: {},
});
