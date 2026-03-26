import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard, Utensils, Car, ShoppingCart, Zap, Home, Plane } from 'lucide-react-native';
import { useState, useRef } from 'react';
import { PanResponder, Animated } from 'react-native';

const MAX_BUDGET = 100000;
const MIN_BUDGET = 0;

const CATEGORIES = [
  { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
  { id: 'dining', label: 'Dining', icon: Utensils },
  { id: 'transport', label: 'Transport', icon: Car },
  { id: 'utilities', label: 'Utilities', icon: Zap },
  { id: 'housing', label: 'Housing', icon: Home },
  { id: 'travel', label: 'Travel', icon: Plane },
];

function formatAmount(val: number) {
  return val.toLocaleString('en-IN');
}

export default function CreateBudgetScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  const [budgetValue, setBudgetValue] = useState(25000);
  const [budgetName, setBudgetName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('shopping');
  const [sliderWidth, setSliderWidth] = useState(0);

  const progress = (budgetValue - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (sliderWidth === 0) return;
        const clampedX = Math.max(0, Math.min(gestureState.moveX, sliderWidth));
        const newProgress = clampedX / sliderWidth;
        const newValue = Math.round((newProgress * (MAX_BUDGET - MIN_BUDGET) + MIN_BUDGET) / 500) * 500;
        setBudgetValue(Math.max(MIN_BUDGET, Math.min(MAX_BUDGET, newValue)));
      },
    })
  ).current;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>

        {/* Category Icon */}
        <View style={[styles.heroIconWrap, { marginTop: 48, marginBottom: 20 }]}>
          <View style={[styles.heroIconBox, { backgroundColor: colors.surfaceContainerHigh, borderRadius: 24 }]}>
            <CreditCard color={colors.primary} size={28} />
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 28, letterSpacing: -0.5, textAlign: 'center' }]}>
          Create Budget
        </Text>

        {/* Budget Limit */}
        <View style={[styles.section, { paddingHorizontal: spacing.xl, marginTop: 36 }]}>
          <Text style={[styles.sectionLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 1.2 }]}>
            BUDGET LIMIT
          </Text>

          {/* Amount Display */}
          <View style={styles.amountRow}>
            <Text style={[styles.currencySymbol, { color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 42 }]}>₹</Text>
            <Text style={[styles.amountValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 52, letterSpacing: -2 }]}>
              {formatAmount(budgetValue)}
            </Text>
          </View>

          {/* Slider Track */}
          <View
            style={[styles.sliderTrack, { backgroundColor: colors.surfaceContainerHighest, marginTop: 16 }]}
            onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
            {...panResponder.panHandlers}
          >
            {/* Fill */}
            <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: `${progress * 100}%` }]} />
            {/* Thumb */}
            <View
              style={[
                styles.sliderThumb,
                {
                  backgroundColor: colors.primary,
                  left: `${progress * 100}%`,
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  shadowRadius: 10,
                  elevation: 8,
                },
              ]}
            />
          </View>

          {/* Min/Max labels */}
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12 }]}>₹0</Text>
            <Text style={[styles.sliderLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 12 }]}>₹1,00,000</Text>
          </View>
        </View>

        {/* Budget Name Input */}
        <View style={[styles.section, { paddingHorizontal: spacing.xl, marginTop: 28 }]}>
          <Text style={[styles.sectionLabel, { color: colors.primary, fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 1.2, marginBottom: 12 }]}>
            BUDGET NAME
          </Text>
          <TextInput
            value={budgetName}
            onChangeText={setBudgetName}
            placeholder="e.g. Monthly Groceries"
            placeholderTextColor={colors.onSurfaceVariant}
            style={[styles.textInput, {
              color: colors.onSurface,
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
              borderBottomColor: colors.outlineVariant,
              paddingBottom: 12,
            }]}
          />
        </View>

        {/* Select Category */}
        <View style={[styles.section, { paddingHorizontal: spacing.xl, marginTop: 28 }]}>
          <View style={styles.categoryHeaderRow}>
            <Text style={[styles.sectionLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 11, letterSpacing: 1.2 }]}>
              SELECT CATEGORY
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: colors.primary, fontFamily: 'Inter_500Medium', fontSize: 13 }]}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 14 }}
            contentContainerStyle={{ gap: 10, paddingRight: spacing.xl }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: isSelected ? colors.primary : colors.surfaceContainerHigh,
                      borderRadius: borderRadius.full,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    },
                  ]}
                >
                  <cat.icon color={isSelected ? colors.onPrimary : colors.onSurfaceVariant} size={16} />
                  <Text style={[styles.categoryLabel, {
                    color: isSelected ? colors.onPrimary : colors.onSurface,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 14,
                  }]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Create Budget Button */}
        <View style={[styles.actionsSection, { paddingHorizontal: spacing.xl, marginTop: 40 }]}>
          <TouchableOpacity
            style={[styles.createBtn, {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.full,
              paddingVertical: 18,
              alignItems: 'center',
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 10,
            }]}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <Text style={[styles.createBtnText, { color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
              Create Budget
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={[styles.cancelBtnText, { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 15 }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroIconWrap: {
    alignItems: 'center',
  },
  heroIconBox: {
    width: 78,
    height: 78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {},
  section: {},
  sectionLabel: {},
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
    gap: 4,
  },
  currencySymbol: {},
  amountValue: {},
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
    overflow: 'visible',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    top: -10,
    marginLeft: -12,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sliderLabel: {},
  textInput: {
    borderBottomWidth: 1,
  },
  categoryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {},
  categoryChip: {},
  categoryLabel: {},
  actionsSection: {},
  createBtn: {},
  createBtnText: {},
  cancelBtn: {
    alignItems: 'center',
    marginTop: 18,
    paddingBottom: 8,
  },
  cancelBtnText: {},
});
