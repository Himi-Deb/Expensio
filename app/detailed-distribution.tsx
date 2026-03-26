import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, TrendingUp, Utensils, ShoppingBag, Car, Tv, FileText, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

// --- Donut Chart Component ---
function DonutChart({ total, pct }: { total: string; pct: string }) {
  const size = 200;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // 80% filled for the neon arc, rest grey
  const filled = circumference * 0.80;
  const gap = circumference * 0.20;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute' }}>
        {/* Background track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1C1E1D"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Filled arc (neon mint) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#32FCB3"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Center text */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#8A918E', fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1 }}>TOTAL SPENT</Text>
        <Text style={{ color: '#FFFFFF', fontFamily: 'Manrope_700Bold', fontSize: 28, letterSpacing: -1, marginTop: 4 }}>
          {total}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
          <TrendingUp color="#32FCB3" size={12} />
          <Text style={{ color: '#32FCB3', fontFamily: 'Inter_500Medium', fontSize: 11 }}>{pct}</Text>
        </View>
      </View>
    </View>
  );
}

// --- Category row data ---
const CATEGORIES = [
  { label: 'Dining', icon: Utensils, amt: '₹19,282', count: '14 TRANSACTIONS', pct: 45, color: '#32FCB3' },
  { label: 'Shopping', icon: ShoppingBag, amt: '₹10,712', count: '8 TRANSACTIONS', pct: 25, color: '#32FCB3' },
  { label: 'Transport', icon: Car, amt: '₹6,427', count: '22 TRANSACTIONS', pct: 15, color: '#32FCB3' },
  { label: 'Entertainment', icon: Tv, amt: '₹3,428', count: '3 TRANSACTIONS', pct: 8, color: '#32FCB3' },
  { label: 'Bills', icon: FileText, amt: '₹3,001', count: '5 TRANSACTIONS', pct: 7, color: '#32FCB3' },
];

export default function DetailedDistributionScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingVertical: spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.onSurface} size={26} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          Detailed Distribution
        </Text>
        <TouchableOpacity>
          <Calendar color={colors.onSurface} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Donut Chart Card */}
        <View style={[styles.chartCard, {
          backgroundColor: colors.surfaceContainerLow,
          marginHorizontal: spacing.lg,
          marginTop: spacing.md,
          borderRadius: borderRadius.xl,
          padding: spacing.lg,
        }]}>
          <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
            <DonutChart total="₹42,850" pct="+12%" />
          </View>

          {/* Stats Row */}
          <View style={[styles.statsRow, {
            borderTopWidth: 1,
            borderTopColor: colors.outline,
            paddingTop: spacing.md,
            marginTop: spacing.sm,
          }]}>
            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: colors.primaryContainer }]}>
                <Utensils color={colors.primary} size={16} />
              </View>
              <Text style={[styles.statLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 0.8, marginTop: 8, marginBottom: 2 }]}>
                Highest Expense
              </Text>
              <Text style={[styles.statValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
                Dining Out
              </Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: colors.outline }]} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: colors.primaryContainer }]}>
                <TrendingUp color={colors.primary} size={16} />
              </View>
              <Text style={[styles.statLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 0.8, marginTop: 8, marginBottom: 2 }]}>
                Daily Average
              </Text>
              <Text style={[styles.statValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
                ₹1,428
              </Text>
            </View>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={[styles.sectionHeader, { paddingHorizontal: spacing.lg, marginTop: spacing.xxl }]}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }]}>
            Category Breakdown
          </Text>
          <TouchableOpacity>
            <Text style={[styles.showAll, { color: colors.primary, fontFamily: 'Inter_500Medium', fontSize: 13 }]}>
              SHOW ALL
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: spacing.lg, marginTop: spacing.md, gap: 2 }}>
          {CATEGORIES.map((cat, idx) => (
            <TouchableOpacity
              key={cat.label}
              onPress={() => router.push('/dining-transactions')}
              activeOpacity={0.7}
              style={[styles.catRow, {
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: idx === 0 ? borderRadius.lg : idx === CATEGORIES.length - 1 ? borderRadius.lg : 0,
                ...(idx === 0 && { borderTopLeftRadius: borderRadius.lg, borderTopRightRadius: borderRadius.lg, borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }),
                ...(idx === CATEGORIES.length - 1 && { borderBottomLeftRadius: borderRadius.lg, borderBottomRightRadius: borderRadius.lg, borderTopLeftRadius: 4, borderTopRightRadius: 4 }),
                ...(idx > 0 && idx < CATEGORIES.length - 1 && { borderRadius: 4 }),
                padding: spacing.md,
                marginBottom: 2,
              }]}
            >
              <View style={[styles.catIconBox, { backgroundColor: colors.primaryContainer }]}>
                <cat.icon color={colors.primary} size={18} />
              </View>
              <View style={styles.catInfo}>
                <View style={styles.catTopRow}>
                  <Text style={[styles.catName, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                    {cat.label}
                  </Text>
                  <Text style={[styles.catAmt, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 15 }]}>
                    {cat.amt}
                  </Text>
                </View>
                {/* Progress bar */}
                <View style={[styles.progressBg, { backgroundColor: colors.surfaceContainerHighest, marginTop: 8 }]}>
                  <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${cat.pct}%` }]} />
                </View>
                <View style={[styles.catBottomRow, { marginTop: 4 }]}>
                  <Text style={[styles.catPct, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 11 }]}>
                    {cat.pct}%
                  </Text>
                  <Text style={[styles.catCount, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 0.5 }]}>
                    {cat.count}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spending Insight Card */}
        <View style={[styles.insightCard, {
          backgroundColor: colors.primaryContainer,
          marginHorizontal: spacing.lg,
          marginTop: spacing.xl,
          borderRadius: borderRadius.xl,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: `${colors.primary}30`,
        }]}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIconBox, { backgroundColor: `${colors.primary}20` }]}>
              <Sparkles color={colors.primary} size={18} />
            </View>
            <Text style={[styles.insightTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16, marginLeft: 12 }]}>
              Spending Insight
            </Text>
          </View>
          <Text style={[styles.insightBody, {
            color: colors.onSurfaceVariant,
            fontFamily: 'Inter_400Regular',
            fontSize: 13,
            lineHeight: 20,
            marginTop: spacing.md,
            marginBottom: spacing.lg,
          }]}>
            Your "Dining" spends are 20% higher than last month. You could save{' '}
            <Text style={{ color: colors.onSurface, fontFamily: 'Inter_500Medium' }}>₹3,500</Text> by reaching your goal.
          </Text>
          <TouchableOpacity
            style={[styles.insightBtn, {
              backgroundColor: colors.surfaceContainerHigh,
              borderRadius: borderRadius.full,
              paddingVertical: 10,
              paddingHorizontal: 24,
              alignSelf: 'flex-start',
            }]}
            onPress={() => router.push('/create-budget')}
          >
            <Text style={[styles.insightBtnText, { color: colors.onSurface, fontFamily: 'Inter_500Medium', fontSize: 13, letterSpacing: 0.5 }]}>
              SET BUDGET
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
  headerTitle: {},
  chartCard: {},
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {},
  statValue: {},
  statDivider: {
    width: 1,
    height: 60,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {},
  showAll: {},
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  catIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catInfo: {
    flex: 1,
  },
  catTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catName: {},
  catAmt: {},
  progressBg: {
    height: 3,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  catBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  catPct: {},
  catCount: {},
  insightCard: {},
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightTitle: {},
  insightBody: {},
  insightBtn: {},
  insightBtnText: {},
});
