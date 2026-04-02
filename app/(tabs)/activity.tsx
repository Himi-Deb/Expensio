import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft, Search, TrendingUp, Utensils, Coffee, Sandwich, Wine, ShoppingBasket,
  CreditCard, AlertCircle, ShoppingBag, Car, Zap, Home, Activity, CircleDollarSign,
  Globe, Monitor
} from 'lucide-react-native';
import Svg, { G, Circle, Path } from 'react-native-svg';
import { useTransactions } from '../../src/context/TransactionContext'; 
import { useRouter } from 'expo-router';
import { TransactionIcon } from '../../src/utils/categorization';
import { useCurrency, SUPPORTED_CURRENCIES } from '../../src/context/CurrencyContext';
import React, { useMemo } from 'react';

const IconMap: Record<string, any> = {
  Coffee,
  Car,
  ShoppingBag,
  Utensils,
  Monitor,
  Home,
  Activity,
  CircleDollarSign,
  ShoppingCart: ShoppingBag,
  Zap: Activity,
  Plane: Activity,
  Globe,
};

type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  status: string;
  iconName?: string;
};

export default function ActivityScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { transactions, getCategoryDistribution, getWeeklyTrends } = useTransactions();
  const { baseCurrency } = useCurrency();

  // Responsive Chart Constants
  const chartSize = Math.min(width * 0.7, 280);
  const center = chartSize / 2;
  const strokeWidth = 14;
  const radius = (chartSize / 2) - (strokeWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const dayGroups = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    transactions.forEach(tx => {
      const day = tx.date === 'Today' ? 'TODAY' : 
                  tx.date === 'Yesterday' ? 'YESTERDAY' : 
                  tx.date.toUpperCase();
      if (!groups[day]) groups[day] = [];
      groups[day].push(tx);
    });

    return Object.keys(groups).map(day => ({
      day,
      transactions: groups[day]
    }));
  }, [transactions]);

  const distribution = getCategoryDistribution();
  const weeklyTrends = getWeeklyTrends();
  const totalWeekly = weeklyTrends.reduce((sum, d) => sum + d.amount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.md }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft color={colors.onSurface} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          Visual Insights
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Dynamic Category Hero & Chart */}
        <View style={[styles.heroSection, { paddingHorizontal: spacing.lg }]}>
          <View style={{ position: 'relative', width: chartSize, height: chartSize, justifyContent: 'center', alignItems: 'center' }}>
            <Svg height={chartSize} width={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`}>
               {/* Base Background Circle */}
               <Circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke={colors.surfaceContainerHighest}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />

                {/* Slices */}
                {distribution.map((item, index) => {
                   const rotation = distribution.slice(0, index).reduce((sum, it) => sum + (it.value * 3.6), 0);
                   const strokeDashoffset = circumference - (item.value / 100) * circumference;
                   
                   return (
                     <G key={item.label} rotation={rotation - 90} origin={`${center}, ${center}`}>
                        <Circle
                          cx={center}
                          cy={center}
                          r={radius}
                          stroke={item.color}
                          strokeWidth={strokeWidth}
                          strokeDasharray={`${circumference} ${circumference}`}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                     </G>
                   );
                })}
            </Svg>

            {/* Inner Content */}
            <View style={{ position: 'absolute', alignItems: 'center' }}>
                <Text style={{ color: colors.onSurfaceVariant, fontSize: 10, fontFamily: 'Manrope_500Medium', letterSpacing: 1 }}>SPENT THIS WEEK</Text>
                <Text style={{ color: colors.onSurface, fontSize: chartSize * 0.16, fontFamily: 'Manrope_700Bold', letterSpacing: -1 }}>
                   {baseCurrency?.symbol || '₹'}{totalWeekly.toLocaleString('en-IN')}
                </Text>
            </View>
          </View>

          <View style={[styles.legendRow, { marginTop: 24 }]}>
             {distribution.slice(0, 3).map(item => (
                <View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                   <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: item.color, marginRight: 6 }} />
                   <Text style={{ color: colors.onSurface, fontSize: 12, fontFamily: 'Manrope_500Medium' }}>{item.label}</Text>
                </View>
             ))}
          </View>
        </View>

        {/* Stats Row */}
        <View style={[styles.statsRow, { marginHorizontal: spacing.lg, marginTop: spacing.xl }]}>
          <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }]}>
               TOP CATEGORY
            </Text>
            <Text style={[styles.statValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18, marginTop: 6 }]}>
               {distribution[0]?.label || 'None'}
            </Text>
            <Text style={[styles.statMeta, { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }]}>
               {distribution[0] ? `${Math.round(distribution[0].value)}% share` : 'No data'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.statLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }]}>
              FREQUENT DAY
            </Text>
            <Text style={[styles.statValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18, marginTop: 6 }]}>
              Saturday
            </Text>
            <Text style={[styles.statMeta, { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }]}>3 Avg. Tx/day</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.activityHeader, { paddingHorizontal: spacing.lg, marginTop: spacing.xxl }]}>
          <Text style={[styles.activityTitle, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 18 }]}>
            Activity Feed
          </Text>
        </View>

        {dayGroups.length === 0 ? (
           <View style={{ paddingVertical: 100, alignItems: 'center' }}>
              <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium' }}>No transactions recorded yet.</Text>
           </View>
        ) : dayGroups.map((group) => (
          <View key={group.day} style={{ marginTop: 20 }}>
            {/* Day label */}
            <Text style={[styles.dayLabel, {
              color: colors.onSurfaceVariant,
              fontFamily: 'Manrope_500Medium',
              fontSize: 11,
              letterSpacing: 1,
              paddingHorizontal: spacing.lg,
              marginBottom: 10,
            }]}>
              {group.day}
            </Text>

            {/* Transactions for this day from Context */}
            <View style={[styles.dayCard, { backgroundColor: colors.surfaceContainerLow, marginHorizontal: spacing.lg, borderRadius: borderRadius.lg }]}>
              {group.transactions.map((tx, idx) => {
                return (
                  <View key={tx.id}>
                    <TouchableOpacity 
                      activeOpacity={0.7}
                      onPress={() => router.push({ pathname: '/transaction-detail', params: { id: tx.id } })}
                    >
                      <View style={[styles.txRow, { padding: spacing.md }]}>
                        <View style={[styles.txIconBox, { backgroundColor: colors.surfaceContainerHighest }]}>
                           {(() => {
                              const IconComponent = IconMap[tx.iconName || ''] || Activity;
                              return <IconComponent color={colors.onSurfaceVariant} size={18} />;
                           })()}
                        </View>
                        <View style={styles.txInfo}>
                          <Text style={[styles.txName, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                            {tx.name}
                          </Text>
                          <Text style={[styles.txMeta, { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }]}>
                            {tx.category} • {tx.status}
                          </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                          <Text style={[styles.txAmt, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                            -{SUPPORTED_CURRENCIES.find(c => c.code === tx.currencyCode)?.symbol || '₹'}{Math.abs(tx.amount).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {idx < group.transactions.length - 1 && (
                      <View style={[styles.divider, { backgroundColor: colors.outline, marginHorizontal: spacing.md }]} />
                    )}
                  </View>
                );
              })}
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
            <Text style={[styles.bulkEditBtnText, { color: colors.onSurface, fontFamily: 'Manrope_500Medium', fontSize: 14 }]}>
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
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
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
