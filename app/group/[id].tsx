import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Settings, Plus, Zap, ShoppingCart, Wifi } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function GroupDetailsScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock Data
  const settlements = [
    { id: '1', name: 'Arjun', role: 'owes you', amount: '₹500', isPositive: true },
    { id: '2', name: 'You owe', role: 'to Priya', amount: '₹1,200', isPositive: false },
    { id: '3', name: 'Rohan', role: 'owes you', amount: '₹300', isPositive: true },
  ];

  const expenses = [
    { id: '1', title: 'Electricity Bill', subtitle: 'Paid by Arjun', splitInfo: 'Split equally', amount: '₹3,000', myShare: 'YOU OWE ₹1,000', icon: Zap, isOwe: true },
    { id: '2', title: 'Groceries', subtitle: 'Paid by You', splitInfo: 'Split 3 ways', amount: '₹1,500', myShare: 'YOU GET ₹1,000', icon: ShoppingCart, isOwe: false },
    { id: '3', title: 'Internet', subtitle: 'Paid by Rohan', splitInfo: 'Monthly plan', amount: '₹800', myShare: 'YOU OWE ₹266', icon: Wifi, isOwe: true },
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
          <Settings color={colors.onSurfaceVariant} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
        {/* Main Hero Section */}
        <View style={[styles.heroSection, { paddingVertical: spacing.xl }]}>
          <View style={[styles.coverImageContainer, { borderRadius: borderRadius.xl, backgroundColor: colors.surfaceContainerHigh }]}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }} 
              style={styles.coverImage}
            />
          </View>
          <Text style={[styles.groupName, { color: colors.onSurface }]}>Flatmates</Text>
          <Text style={[styles.heroSubtitle, { color: colors.onSurfaceVariant }]}>Total Group Balance</Text>
          <Text style={[styles.balanceAmount, { color: colors.primary }]}>₹42,850</Text>
        </View>

        {/* Settlements Section */}
        <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xl, marginBottom: spacing.md }]}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Settlements</Text>
          <TouchableOpacity onPress={() => router.push('/group/splits')}>
            <Text style={[styles.seeMore, { color: colors.primary }]}>See More</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: spacing.xl, marginBottom: spacing.xxl }}>
          <View style={[styles.card, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.xl, padding: spacing.lg }]}>
            {settlements.map((item, index) => (
              <View key={item.id} style={[styles.settlementRow, index < settlements.length - 1 && { marginBottom: spacing.lg }]}>
                <View style={[styles.miniAvatar, { backgroundColor: colors.surfaceContainerHigh }]} />
                <View style={styles.settlementInfo}>
                  <Text style={[styles.settlementName, { color: colors.onSurface }]}>{item.name}</Text>
                  <Text style={[styles.settlementRole, { color: colors.onSurfaceVariant }]}>{item.role}</Text>
                </View>
                <Text style={[styles.settlementAmount, { color: item.isPositive ? colors.primary : colors.error }]}>
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Expenses Section */}
        <View style={[styles.sectionHeader, { paddingHorizontal: spacing.xl, marginBottom: spacing.md }]}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Recent Expenses</Text>
          <Text style={[styles.dateLabel, { color: colors.onSurfaceVariant }]}>SEPTEMBER 2023</Text>
        </View>

        <View style={{ paddingHorizontal: spacing.xl }}>
          {expenses.map((exp, index) => (
            <View key={exp.id} style={[styles.expenseRow, { marginBottom: spacing.xl }]}>
              <View style={[styles.iconBox, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <exp.icon color={colors.onSurfaceVariant} size={24} />
              </View>
              <View style={styles.expenseInfo}>
                <Text style={[styles.expenseTitle, { color: colors.onSurface }]}>{exp.title}</Text>
                <View style={styles.expenseSubRow}>
                  <Text style={[styles.expenseSub, { color: colors.onSurfaceVariant }]}>{exp.subtitle}</Text>
                  <Text style={[styles.expenseSplit, { color: colors.onSurfaceVariant }]}>{exp.splitInfo}</Text>
                </View>
              </View>
              <View style={styles.expenseRight}>
                <Text style={[styles.expenseAmount, { color: colors.onSurface }]}>{exp.amount}</Text>
                <Text style={[styles.expenseMyShare, { color: exp.isOwe ? colors.error : colors.onSurfaceVariant }]}>
                  {exp.myShare}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, { 
          backgroundColor: colors.primary, 
          borderRadius: borderRadius.xl,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 10
        }]}
        onPress={() => router.push('/add-expense')}
      >
        <Plus color={colors.background} size={28} />
      </TouchableOpacity>
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
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
  },
  content: {},
  heroSection: {
    alignItems: 'center',
  },
  coverImageContainer: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    marginBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  groupName: {
    fontSize: 28,
    fontFamily: 'Manrope_700Bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 48,
    fontFamily: 'Manrope_700Bold',
    letterSpacing: -1.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Manrope_700Bold',
  },
  seeMore: {
    fontSize: 14,
    fontFamily: 'Manrope_700Bold',
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 1,
  },
  card: {},
  settlementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  settlementInfo: {
    flex: 1,
  },
  settlementName: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    marginBottom: 2,
  },
  settlementRole: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  settlementAmount: {
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    marginBottom: 4,
  },
  expenseSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expenseSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  expenseSplit: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  expenseRight: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    marginBottom: 4,
  },
  expenseMyShare: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
