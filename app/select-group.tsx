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
import { X, Search, Plus, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

type Group = {
  id: string;
  name: string;
  members: number;
  status: string;
  balanceLabel: string;
  balanceAmt: string;
  balanceColor: string;
  bgColor: string;
  emoji: string;
};

const GROUPS: Group[] = [
  {
    id: '1',
    name: 'Flatmates',
    members: 4,
    status: 'Active split',
    balanceLabel: 'You owe',
    balanceAmt: '₹1,200',
    balanceColor: '#FF5964',
    bgColor: '#2A1A1F',
    emoji: '🏠',
  },
  {
    id: '2',
    name: 'Trip to Bali',
    members: 6,
    status: 'Upcoming',
    balanceLabel: 'Owed to you',
    balanceAmt: '₹500',
    balanceColor: '#32FCB3',
    bgColor: '#1A2A24',
    emoji: '🏝',
  },
  {
    id: '3',
    name: 'Office Coffee',
    members: 12,
    status: 'Recurring',
    balanceLabel: 'Settled',
    balanceAmt: '₹0',
    balanceColor: '#8A918E',
    bgColor: '#1C1E1D',
    emoji: '☕',
  },
];

export default function SelectGroupScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const filtered = GROUPS.filter((g) =>
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Sheet Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.xl, paddingBottom: spacing.md }]}>
        {/* Drag handle */}
        <View style={[styles.dragHandle, { backgroundColor: colors.outlineVariant }]} />
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 22 }]}>
            Select Group to Split
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.closeBtn, { backgroundColor: colors.surfaceContainerHighest, borderRadius: borderRadius.full }]}
          >
            <X color={colors.onSurface} size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, {
        backgroundColor: colors.surfaceContainerLow,
        borderRadius: borderRadius.full,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: 13,
        gap: 10,
      }]}>
        <Search color={colors.onSurfaceVariant} size={18} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search groups or friends..."
          placeholderTextColor={colors.onSurfaceVariant}
          style={[styles.searchInput, {
            flex: 1,
            color: colors.onSurface,
            fontFamily: 'Inter_400Regular',
            fontSize: 15,
          }]}
        />
      </View>

      {/* Group List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={{ paddingHorizontal: spacing.lg, gap: 10 }}>
          {filtered.map((group) => (
            <TouchableOpacity
              key={group.id}
              activeOpacity={0.75}
              onPress={() => router.back()}
              style={[styles.groupCard, {
                backgroundColor: colors.surfaceContainerLow,
                borderRadius: borderRadius.lg,
                padding: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
              }]}
            >
              {/* Avatar */}
              <View style={[styles.groupAvatar, {
                backgroundColor: group.bgColor,
                borderRadius: 16,
              }]}>
                <Text style={styles.groupEmoji}>{group.emoji}</Text>
              </View>

              {/* Info */}
              <View style={{ flex: 1 }}>
                <Text style={[styles.groupName, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }]}>
                  {group.name}
                </Text>
                <Text style={[styles.groupMeta, { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: 2 }]}>
                  {group.members} Members • {group.status}
                </Text>
              </View>

              {/* Balance */}
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.balanceLabel, { color: group.balanceColor, fontFamily: 'Inter_500Medium', fontSize: 11 }]}>
                  {group.balanceLabel}
                </Text>
                <Text style={[styles.balanceAmt, { color: group.balanceColor, fontFamily: 'Manrope_700Bold', fontSize: 15, marginTop: 1 }]}>
                  {group.balanceAmt}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Create New Group — pinned */}
      <View style={[styles.bottomBar, {
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
        paddingBottom: 36,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.outline,
      }]}>
        <TouchableOpacity
          style={[styles.createBtn, {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.full,
            paddingVertical: 18,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 10,
          }]}
          activeOpacity={0.85}
        >
          <Plus color={colors.onPrimary} size={20} />
          <Text style={[styles.createBtnText, { color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
            Create New Group
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'flex-start' },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {},
  closeBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {},
  searchInput: {},
  groupCard: {},
  groupAvatar: {
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupEmoji: {
    fontSize: 26,
  },
  groupName: {},
  groupMeta: {},
  balanceLabel: {},
  balanceAmt: {},
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  createBtn: {},
  createBtnText: {},
});
