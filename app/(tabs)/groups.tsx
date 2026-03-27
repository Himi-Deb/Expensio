import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Plus, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function GroupsScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  const groups = [
    { id: '1', name: 'Trip to Goa', balance: -450, members: 4, lastActive: '2h ago' },
    { id: '2', name: 'Flatmates', balance: 1250, members: 3, lastActive: '1d ago' },
    { id: '3', name: 'Work Lunch', balance: 0, members: 8, lastActive: '3d ago' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingHorizontal: spacing.xl, paddingTop: spacing.xl }]}>
        <Text style={[styles.title, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 32, letterSpacing: -0.8 }]}>
           Groups
        </Text>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: spacing.xl, paddingTop: spacing.lg }]}>
        {/* Summary Card - Level 1 Tonal Layering */}
        <View style={[styles.summaryCard, { 
          backgroundColor: colors.surfaceContainerLow, 
          borderRadius: borderRadius.xl,
          padding: spacing.lg,
          marginBottom: spacing.xxl
        }]}>
          <View style={styles.summaryItem}>
             <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>Total Payables</Text>
             <Text style={[styles.summaryValue, { color: colors.tertiary, fontSize: 24, fontFamily: 'Manrope_700Bold' }]}>₹450.00</Text>
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: 'rgba(22, 29, 24, 0.08)' }]} />
          <View style={styles.summaryItem}>
             <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>Total Receivables</Text>
             <Text style={[styles.summaryValue, { color: colors.primary, fontSize: 24, fontFamily: 'Manrope_700Bold' }]}>₹1,250.00</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20, marginBottom: spacing.lg }]}>
           Your Groups
        </Text>

        {groups.map((group) => (
          <TouchableOpacity 
            key={group.id} 
            activeOpacity={0.7}
            style={[styles.groupItem, { marginBottom: spacing.xl }]}
            onPress={() => group.balance < 0 && router.push('/settle-up')}
          >
            {/* NO-LINE RULE: Content separated by space and background shifts */}
            <View style={[styles.groupIcon, { backgroundColor: colors.surfaceContainerHigh, borderRadius: borderRadius.lg }]}>
              <Users color={colors.primary} size={24} />
            </View>
            
            <View style={styles.groupInfo}>
              <Text style={[styles.groupName, { color: colors.onSurface, fontSize: 16, fontFamily: 'Manrope_700Bold' }]}>{group.name}</Text>
              
              {/* Overlapping Avatars Placeholder */}
              <View style={styles.avatarRow}>
                {[1, 2, 3].map((i) => (
                   <View key={i} style={[styles.miniAvatar, { 
                     backgroundColor: colors.outlineVariant, 
                     borderColor: colors.background, 
                     borderWidth: 2,
                     marginLeft: i === 1 ? 0 : -8 
                   }]} />
                ))}
                <Text style={[styles.groupMeta, { color: colors.onSurfaceVariant, marginLeft: 8 }]}>{group.members} members</Text>
              </View>
            </View>

            <View style={styles.groupBalance}>
              <Text style={[
                styles.balanceAmount, 
                { color: group.balance < 0 ? colors.tertiary : group.balance > 0 ? colors.primary : colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold' }
              ]}>
                {group.balance === 0 ? 'Settled' : `₹${Math.abs(group.balance)}`}
              </Text>
              {group.balance !== 0 && (
                <Text style={[styles.balanceDesc, { color: colors.onSurfaceVariant, fontSize: 10, marginTop: 2 }]}>
                  {group.balance < 0 ? 'owes you' : 'you owe'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Add Button with Botanical Shadow */}
      <TouchableOpacity 
        style={[styles.fab, { 
          backgroundColor: colors.primary, 
          borderRadius: borderRadius.full,
          shadowColor: '#161d18',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.1,
          shadowRadius: 40,
          elevation: 10
        }]}
        onPress={() => router.push('/add-expense')}
      >
        <Plus color="white" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {},
  title: {},
  content: {},
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  summaryValue: {},
  summaryDivider: {
    width: 1,
    height: '60%',
  },
  sectionTitle: {},
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  groupIcon: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    marginBottom: 4,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  groupMeta: {
    fontSize: 12,
    fontFamily: 'Manrope_400Regular',
  },
  groupBalance: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: 16,
  },
  balanceDesc: {},
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
