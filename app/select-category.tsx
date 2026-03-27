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
  X, Search, ChevronRight, Utensils, ShoppingBag, Plane,
  FileText, Tv, ShoppingCart, Home, Plus,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const ALL_CATEGORIES = [
  { id: 'dining', label: 'Dining', avg: '₹2,400', icon: Utensils },
  { id: 'shopping', label: 'Shopping', avg: '₹5,100', icon: ShoppingBag },
  { id: 'travel', label: 'Travel', avg: '₹12,000', icon: Plane },
  { id: 'bills', label: 'Bills', avg: '₹3,500', icon: FileText },
  { id: 'entertainment', label: 'Entertainment', avg: '₹1,800', icon: Tv },
  { id: 'groceries', label: 'Groceries', avg: '₹6,200', icon: ShoppingCart },
  { id: 'rent', label: 'Rent', avg: '₹25,000', icon: Home },
];

export default function SelectCategoryScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [customName, setCustomName] = useState('');

  const filtered = ALL_CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md }]}>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 24 }]}>
            Select Category
          </Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 13, marginTop: 4 }]}>
            Organize your monthly ₹ expenses
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.closeBtn, { backgroundColor: colors.surfaceContainerHigh, borderRadius: borderRadius.full }]}
        >
          <X color={colors.onSurface} size={18} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, {
        backgroundColor: colors.surfaceContainerLow,
        borderRadius: borderRadius.full,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
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
          placeholder="Search categories..."
          placeholderTextColor={colors.onSurfaceVariant}
          style={[styles.searchInput, {
            flex: 1,
            color: colors.onSurface,
            fontFamily: 'Manrope_400Regular',
            fontSize: 15,
          }]}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Category list */}
        <View style={{ marginHorizontal: spacing.lg }}>
          {filtered.map((cat, idx) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.7}
              onPress={() => router.back()}
              style={[styles.catRow, {
                paddingVertical: 16,
                borderBottomWidth: idx < filtered.length - 1 ? 1 : 0,
                borderBottomColor: colors.outline,
              }]}
            >
              <View style={[styles.catIconBox, {
                backgroundColor: colors.surfaceContainerHigh,
                borderRadius: 14,
              }]}>
                <cat.icon color={colors.primary} size={20} />
              </View>
              <View style={styles.catText}>
                <Text style={[styles.catName, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }]}>
                  {cat.label}
                </Text>
                <Text style={[styles.catAvg, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 2 }]}>
                  AVG. {cat.avg} / MO
                </Text>
              </View>
              <ChevronRight color={colors.onSurfaceVariant} size={18} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Create Custom Category */}
        <View style={[styles.customSection, {
          marginHorizontal: spacing.lg,
          marginTop: spacing.xl,
          paddingVertical: 14,
          borderTopWidth: 1,
          borderTopColor: colors.outline,
        }]}>
          <View style={styles.customRow}>
            <View style={[styles.customAvatarBox, {
              backgroundColor: colors.surfaceContainerHigh,
              borderRadius: 14,
            }]}>
              <Text style={[styles.customAvatarText, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
                {customName ? customName[0].toUpperCase() : 'A'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                value={customName}
                onChangeText={setCustomName}
                placeholder="Category name (e.g. Subscriptions)"
                placeholderTextColor={colors.onSurfaceVariant}
                style={[styles.customInput, {
                  color: colors.onSurface,
                  fontFamily: 'Manrope_400Regular',
                  fontSize: 15,
                  paddingVertical: 2,
                }]}
              />
              <Text style={[styles.customHint, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 11, marginTop: 3 }]}>
                Emoji or initial will be used as icon
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Create Category Button — pinned at bottom */}
      <View style={[styles.bottomBar, {
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
        paddingBottom: 36,
        paddingTop: 12,
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
            Create Category
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: { flex: 1, paddingRight: 16 },
  title: {},
  subtitle: {},
  closeBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  searchBar: {},
  searchInput: {},
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  catIconBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catText: { flex: 1 },
  catName: {},
  catAvg: {},
  customSection: {},
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  customAvatarBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customAvatarText: {},
  customInput: {},
  customHint: {},
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  createBtn: {},
  createBtnText: {},
});
