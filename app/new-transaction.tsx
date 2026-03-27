import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Utensils, CreditCard, Calendar, Camera, Users, ChevronDown, Coffee, Car, ShoppingBag, Monitor, Home, Activity as ActivityIcon, CircleDollarSign } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useTransactions } from '../src/context/TransactionContext';
import { autoCategorizeTransaction, TransactionIcon } from '../src/utils/categorization';

const IconMap: Record<TransactionIcon, any> = {
  Coffee,
  Car,
  ShoppingBag,
  Utensils,
  Monitor,
  Home,
  Activity: ActivityIcon,
  CircleDollarSign,
};

export default function NewTransactionScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const { addTransaction } = useTransactions();
  
  const [amount, setAmount] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [category, setCategory] = useState('General');
  const [iconName, setIconName] = useState<TransactionIcon>('CircleDollarSign');

  // Intelligent Categorizer Map
  useEffect(() => {
    const { category: newCat, iconName: newIcon } = autoCategorizeTransaction(merchantName);
    setCategory(newCat);
    setIconName(newIcon);
  }, [merchantName]);

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) return;
    
    addTransaction({
      name: merchantName || 'Unknown',
      amount: -Math.abs(Number(amount)), // Assuming debit for prototyping
      category,
      iconName,
      date: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: 'CLEARED'
    });
    
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.xl, paddingVertical: spacing.md }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <X color={colors.primary} size={22} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          New Transaction
        </Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{ color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48, marginTop: 16 }}>

        {/* Amount Section */}
        <View style={[styles.amountSection, { paddingHorizontal: spacing.xl, paddingBottom: spacing.xl }]}>
          <Text style={{
            color: colors.onSurfaceVariant,
            fontFamily: 'Manrope_500Medium',
            fontSize: 11,
            letterSpacing: 1.5,
            textAlign: 'center',
            marginBottom: 16,
          }}>
            AMOUNT
          </Text>
          <View style={styles.amountRow}>
            <Text style={{ color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 42 }}>₹</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.surfaceContainerHighest}
              keyboardType="decimal-pad"
              style={{
                color: colors.onSurface,
                fontFamily: 'Manrope_700Bold',
                fontSize: 64,
                letterSpacing: -2,
                minWidth: 140,
                textAlign: 'center',
              }}
            />
          </View>
        </View>

        {/* Form Fields - Flat Structure */}
        <View style={{ paddingHorizontal: spacing.xl, gap: 12, marginTop: 12 }}>

          {/* Category */}
          <View style={styles.flatFieldRow}>
            <View style={[styles.fieldIconBox, { backgroundColor: colors.primary }]}>
              {(() => {
                const CurrentIcon = IconMap[iconName] || CircleDollarSign;
                return <CurrentIcon color={colors.onPrimary} size={18} />;
              })()}
            </View>
            <View style={styles.fieldBody}>
              <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }}>
                CATEGORY
              </Text>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }}>
                {category}
              </Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: colors.surfaceContainerHighest, borderRadius: borderRadius.full, paddingHorizontal: 16, paddingVertical: 8 }}>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_500Medium', fontSize: 12 }}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Spent From */}
          <View style={styles.flatFieldRow}>
            <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              <CreditCard color={colors.onSurface} size={18} />
            </View>
            <View style={styles.fieldBody}>
              <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }}>
                SPENT FROM
              </Text>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }}>
                Cash
              </Text>
            </View>
            <ChevronDown color={colors.onSurfaceVariant} size={20} />
          </View>

          {/* Date */}
          <View style={styles.flatFieldRow}>
            <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Calendar color={colors.onSurface} size={18} />
            </View>
            <View style={styles.fieldBody}>
              <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }}>
                DATE
              </Text>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }}>
                Today
              </Text>
            </View>
            <Calendar color={colors.onSurfaceVariant} size={18} />
          </View>

          {/* Title / Merchant */}
          <View style={{ backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.lg, marginTop: 8 }}>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>
              MERCHANT / TITLE
            </Text>
            <TextInput
              value={merchantName}
              onChangeText={setMerchantName}
              placeholder="Who did you pay?"
              placeholderTextColor={colors.onSurfaceVariant}
              style={{
                color: colors.onSurface,
                fontFamily: 'Manrope_600SemiBold',
                fontSize: 16,
                minHeight: 40,
              }}
            />
          </View>
        </View>

        {/* Split with Group CTA */}
        <TouchableOpacity
          style={[styles.splitBtn, {
            backgroundColor: '#86FFD9', // Bright mint from image
            borderRadius: borderRadius.md,
            marginHorizontal: spacing.xl,
            marginTop: 24,
            paddingVertical: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 20,
            elevation: 10,
          }]}
          activeOpacity={0.85}
        >
          <Users color={colors.onPrimary} size={20} />
          <Text style={{ color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>
            Split with Group
          </Text>
        </TouchableOpacity>

        {/* Add Receipt / Image */}
        <TouchableOpacity
          style={{
            borderColor: colors.outlineVariant,
            borderWidth: 1.5,
            borderStyle: 'dashed',
            borderRadius: borderRadius.lg,
            marginHorizontal: spacing.xl,
            marginTop: 16,
            paddingVertical: 32,
            alignItems: 'center',
            gap: 12,
          }}
          activeOpacity={0.7}
        >
          <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.surfaceContainerHighest,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Camera color={colors.onSurfaceVariant} size={20} />
          </View>
          <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 14 }}>
            Add Receipt or Image
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {},
  headerTitle: {},
  amountSection: {
    alignItems: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flatFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 16,
  },
  fieldIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldBody: {
    flex: 1,
  },
  splitBtn: {},
});

