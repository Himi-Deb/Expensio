import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Calendar, TrendingUp, Utensils, ShoppingBag, Car, Tv, FileText, Sparkles, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

// --- Donut Chart Component ---
function DonutChart({ total, pct }: { total: string; pct: string }) {
  const size = 220;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Segment Percentages
  // 1: Mint (40%), 2: Blue (30%), 3: Red (20%), 4: Olive (10%)
  const p1 = 0.40;
  const p2 = 0.30;
  const p3 = 0.20;
  const p4 = 0.10;

  const getDashes = (p: number) => {
    return `${circumference * p} ${circumference * (1 - p)}`;
  };
  
  const getOffset = (pPrevSum: number) => {
    return -(circumference * pPrevSum);
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        {/* Background track (optional since it's fully filled, but good for gaps) */}
        
        {/* Olive */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#7E7A1C" // Olive
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={getDashes(p4)}
          strokeDashoffset={getOffset(p1 + p2 + p3)}
          strokeLinecap="round"
        />
        {/* Red */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#EF5A5A" // Red
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={getDashes(p3)}
          strokeDashoffset={getOffset(p1 + p2)}
          strokeLinecap="round"
        />
        {/* Blue */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4F8AF2" // Blue
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={getDashes(p2)}
          strokeDashoffset={getOffset(p1)}
          strokeLinecap="round"
        />
        {/* Mint (First) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#86FFD9" // Mint
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={getDashes(p1)}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
      </Svg>
      {/* Center text */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#ADAAAA', fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1.5 }}>TOTAL SPENT</Text>
        <Text style={{ color: '#FFFFFF', fontFamily: 'Manrope_700Bold', fontSize: 32, letterSpacing: -1.5, marginTop: 4 }}>
          {total}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#1A332B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, gap: 4 }}>
          <TrendingUp color="#86FFD9" size={12} />
          <Text style={{ color: '#86FFD9', fontFamily: 'Manrope_500Medium', fontSize: 11 }}>{pct}</Text>
        </View>
      </View>
    </View>
  );
}

// --- Category row data ---
const CATEGORIES = [
  { label: 'Dining', icon: Utensils, amt: '₹19,282', count: '14 TRANSACTIONS', pct: 45, color: '#86FFD9' },
  { label: 'Shopping', icon: ShoppingBag, amt: '₹10,712', count: '8 TRANSACTIONS', pct: 25, color: '#6A9287' },
  { label: 'Transport', icon: Car, amt: '₹6,427', count: '22 TRANSACTIONS', pct: 15, color: '#578276' },
  { label: 'Entertainment', icon: Tv, amt: '₹3,428', count: '3 TRANSACTIONS', pct: 8, color: '#4B7368' },
  { label: 'Bills', icon: FileText, amt: '₹3,001', count: '5 TRANSACTIONS', pct: 7, color: '#42665D' },
];

export default function DetailedDistributionScreen() {
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
          Detailed Distribution
        </Text>
        <TouchableOpacity>
          <Calendar color={colors.primary} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Chart Context (No background wrapper) */}
        <View style={{ alignItems: 'center', marginTop: 32, marginBottom: 40 }}>
          <DonutChart total="₹42,850" pct="+12%" />
        </View>

        {/* Stats Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.xl, marginBottom: 48 }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <View style={{ backgroundColor: colors.primaryContainer, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
              <CreditCard color={colors.primary} size={18} />
            </View>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 11, letterSpacing: 0.5, marginBottom: 4 }}>
              Highest Expense
            </Text>
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>
              Dining Out
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <View style={{ backgroundColor: colors.primaryContainer, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
              <TrendingUp color={colors.primary} size={18} />
            </View>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 11, letterSpacing: 0.5, marginBottom: 4 }}>
              Daily Average
            </Text>
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>
              ₹1,428
            </Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, marginBottom: 16 }}>
          <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }}>
            Category Breakdown
          </Text>
          <TouchableOpacity>
            <Text style={{ color: colors.primary, fontFamily: 'Manrope_500Medium', fontSize: 11, letterSpacing: 1.5 }}>
              SHOW ALL
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: spacing.xl, gap: 24 }}>
          {CATEGORIES.map((cat, idx) => (
            <TouchableOpacity
              key={cat.label}
              onPress={() => router.push('/dining-transactions')}
              activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
            >
              <View style={{ width: 48, height: 48, backgroundColor: colors.surfaceContainerHigh, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                <cat.icon color={colors.primary} size={20} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_500Medium', fontSize: 15 }}>
                    {cat.label}
                  </Text>
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 15 }}>
                    {cat.amt}
                  </Text>
                </View>
                
                {/* Progress bar and Subtext Row */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    {/* Bar */}
                    <View style={{ flex: 1, height: 4, backgroundColor: colors.surfaceContainerHighest, borderRadius: 2 }}>
                      <View style={{ height: '100%', backgroundColor: cat.color, borderRadius: 2, width: `${cat.pct}%` }} />
                    </View>
                    <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 11, width: 30 }}>
                      {cat.pct}%
                    </Text>
                  </View>
                  <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 0.5, marginLeft: 16 }}>
                    {cat.count}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spending Insight Card */}
        <View style={{
          backgroundColor: '#11221D', // Specific dark teal from screenshot
          marginHorizontal: spacing.xl,
          marginTop: 48,
          borderRadius: borderRadius.xl,
          padding: spacing.xl,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Sparkles color="#86FFD9" size={20} />
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>
              Spending Insight
            </Text>
          </View>
          <Text style={{
            color: '#AAB8B2',
            fontFamily: 'Manrope_400Regular',
            fontSize: 14,
            lineHeight: 22,
            marginTop: 16,
            marginBottom: 24,
          }}>
            Your "Dining" spends are 20% higher than last month. You could save{' '}
            <Text style={{ color: '#FFFFFF', fontFamily: 'Manrope_500Medium' }}>₹3,500</Text> by reaching your goal.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#86FFD9',
              borderRadius: borderRadius.md,
              paddingVertical: 12,
              paddingHorizontal: 24,
              alignSelf: 'flex-start',
            }}
            onPress={() => router.push('/create-budget')}
          >
            <Text style={{ color: '#000000', fontFamily: 'Manrope_700Bold', fontSize: 13, letterSpacing: 0.5 }}>
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
});
