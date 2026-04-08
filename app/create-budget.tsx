import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet, Utensils, Car, ShoppingCart, Zap, Home, Plane, Globe } from 'lucide-react-native';
import { useState, useRef, useEffect } from 'react';
import { PanResponder } from 'react-native';
import { useTransactions } from '../src/context/TransactionContext';

const MAX_BUDGET = 100000;
const MIN_BUDGET = 0;

const CATEGORIES = [
  { id: 'global', label: 'Global Monthly', icon: Globe },
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
  const [selectedCategory, setSelectedCategory] = useState('global');
  const [sliderWidth, setSliderWidth] = useState(0);
  const { addCategoryBudget, setGlobalBudget } = useTransactions();

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
        <View style={{ alignItems: 'center', marginTop: 48, marginBottom: 20 }}>
          <View style={{
            width: 72,
            height: 72,
            backgroundColor: colors.primaryContainer,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Wallet color={colors.primary} size={30} />
          </View>
        </View>

        {/* Title */}
        <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 24, letterSpacing: -0.5, textAlign: 'center' }}>
          Create Budget
        </Text>

        {/* Budget Limit */}
        <View style={{ paddingHorizontal: spacing.xl, marginTop: 40, alignItems: 'center' }}>
          <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 11, letterSpacing: 1.5 }}>
            BUDGET LIMIT
          </Text>

          {/* Amount Display */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 4 }}>
            <Text style={{ color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 40 }}>₹</Text>
            <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 56, letterSpacing: -2 }}>
              {formatAmount(budgetValue)}
            </Text>
          </View>

          {/* Slider Track */}
          <View
            style={{
              height: 4,
              backgroundColor: colors.surfaceContainerHighest,
              marginTop: 24,
              width: '100%',
              borderRadius: 2,
              position: 'relative',
            }}
            onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
            {...panResponder.panHandlers}
          >
            {/* Fill */}
            <View style={{ height: '100%', backgroundColor: colors.primary, borderRadius: 2, width: `${progress * 100}%` }} />
            {/* Thumb */}
            <View
              style={{
                position: 'absolute',
                width: 24,
                height: 24,
                borderRadius: 12,
                top: -10,
                marginLeft: -12,
                backgroundColor: '#86FFD9',
                left: `${progress * 100}%`,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
                elevation: 8,
              }}
            />
          </View>

          {/* Min/Max labels */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 12 }}>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 12 }}>₹0</Text>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 12 }}>₹1,00,000</Text>
          </View>
        </View>

        {/* Budget Name Input */}
        <View style={{ paddingHorizontal: spacing.xl, marginTop: 40, opacity: selectedCategory === 'global' ? 0.3 : 1 }}>
          <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 11, letterSpacing: 1.2, marginBottom: 12 }}>
            BUDGET NAME
          </Text>
          <TextInput
            value={selectedCategory === 'global' ? 'Main Monthly Limit' : budgetName}
            onChangeText={setBudgetName}
            placeholder="e.g. Monthly Groceries"
            placeholderTextColor={colors.onSurfaceVariant}
            editable={selectedCategory !== 'global'}
            selectionColor={colors.primary}
            cursorColor={colors.primary}
            underlineColorAndroid="transparent"
            style={{
              color: colors.onSurface,
              fontFamily: 'Manrope_400Regular',
              fontSize: 18,
              paddingBottom: 12,
            }}
          />
        </View>

        {/* Select Category */}
        <View style={{ paddingHorizontal: spacing.xl, marginTop: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 11, letterSpacing: 1.2 }}>
              SELECT CATEGORY
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary, fontFamily: 'Manrope_500Medium', fontSize: 13 }}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 16 }}
            contentContainerStyle={{ gap: 12, paddingRight: spacing.xl }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={{
                    backgroundColor: isSelected ? colors.primaryContainer : colors.surfaceContainerLow,
                    borderColor: isSelected ? colors.primary : 'transparent',
                    borderWidth: 1,
                    borderRadius: borderRadius.full,
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <cat.icon color={isSelected ? colors.primary : colors.onSurfaceVariant} size={16} />
                  <Text style={{
                    color: isSelected ? colors.primary : colors.onSurface,
                    fontFamily: 'Manrope_500Medium',
                    fontSize: 14,
                  }}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Create Budget Button */}
        <View style={{ paddingHorizontal: spacing.xl, marginTop: 48 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#86FFD9',
              borderRadius: borderRadius.md,
              paddingVertical: 18,
              alignItems: 'center',
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10,
            }}
            activeOpacity={0.85}
            onPress={() => {
              if (selectedCategory === 'global') {
                setGlobalBudget(budgetValue);
              } else {
                addCategoryBudget({
                  category: CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Other',
                  limit: budgetValue,
                  name: budgetName || selectedCategory,
                });
              }
              router.back();
            }}
          >
            <Text style={{ color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 18 }}>
              {selectedCategory === 'global' ? 'Set Global Limit' : 'Create Budget'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center', marginTop: 24 }} onPress={() => router.back()}>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 15 }}>
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
});
