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
import { X, Utensils, CreditCard, Calendar, Camera, Users, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';

export default function NewTransactionScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const displayAmount = amount || '0.00';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingVertical: spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <X color={colors.primary} size={22} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          New Transaction
        </Text>
        <TouchableOpacity>
          <Text style={[styles.saveText, { color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>

        {/* Amount Section */}
        <View style={[styles.amountSection, { paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.xl }]}>
          <Text style={[styles.amountLabel, {
            color: colors.onSurfaceVariant,
            fontFamily: 'Inter_500Medium',
            fontSize: 11,
            letterSpacing: 1.5,
            textAlign: 'center',
            marginBottom: 16,
          }]}>
            AMOUNT
          </Text>
          <View style={styles.amountRow}>
            <Text style={[styles.currencyGlyph, { color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 42 }]}>₹</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.surfaceContainerHighest}
              keyboardType="decimal-pad"
              style={[styles.amountInput, {
                color: colors.onSurface,
                fontFamily: 'Manrope_700Bold',
                fontSize: 56,
                letterSpacing: -2,
              }]}
            />
          </View>
        </View>

        {/* Form Fields */}
        <View style={[styles.formSection, { paddingHorizontal: spacing.lg, gap: 10 }]}>

          {/* Category */}
          <TouchableOpacity style={[styles.fieldCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
            <View style={[styles.fieldIconBox, { backgroundColor: colors.primaryContainer }]}>
              <Utensils color={colors.primary} size={18} />
            </View>
            <View style={styles.fieldBody}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1 }]}>
                CATEGORY
              </Text>
              <Text style={[styles.fieldValue, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }]}>
                Dining
              </Text>
            </View>
            <TouchableOpacity style={[styles.changeBtn, { backgroundColor: colors.surfaceContainerHighest, borderRadius: borderRadius.full, paddingHorizontal: 14, paddingVertical: 6 }]}>
              <Text style={[styles.changeBtnText, { color: colors.onSurface, fontFamily: 'Inter_500Medium', fontSize: 12 }]}>Change</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Spent From */}
          <TouchableOpacity style={[styles.fieldCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
            <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHighest }]}>
              <CreditCard color={colors.onSurfaceVariant} size={18} />
            </View>
            <View style={styles.fieldBody}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1 }]}>
                SPENT FROM
              </Text>
              <Text style={[styles.fieldValue, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }]}>
                Cash
              </Text>
            </View>
            <ChevronDown color={colors.onSurfaceVariant} size={20} />
          </TouchableOpacity>

          {/* Date */}
          <TouchableOpacity style={[styles.fieldCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
            <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHighest }]}>
              <Calendar color={colors.onSurfaceVariant} size={18} />
            </View>
            <View style={styles.fieldBody}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1 }]}>
                DATE
              </Text>
              <Text style={[styles.fieldValue, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }]}>
                Today
              </Text>
            </View>
            <Calendar color={colors.onSurfaceVariant} size={18} />
          </TouchableOpacity>

          {/* Notes */}
          <View style={[styles.notesCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Inter_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 10 }]}>
              NOTES
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="What was this for?"
              placeholderTextColor={colors.onSurfaceVariant}
              multiline
              style={[styles.notesInput, {
                color: colors.onSurface,
                fontFamily: 'Inter_400Regular',
                fontSize: 15,
                minHeight: 60,
              }]}
            />
          </View>
        </View>

        {/* Split with Group CTA */}
        <TouchableOpacity
          style={[styles.splitBtn, {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.full,
            marginHorizontal: spacing.lg,
            marginTop: 24,
            paddingVertical: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 10,
          }]}
          activeOpacity={0.85}
        >
          <Users color={colors.onPrimary} size={20} />
          <Text style={[styles.splitBtnText, { color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
            Split with Group
          </Text>
        </TouchableOpacity>

        {/* Add Receipt / Image */}
        <TouchableOpacity
          style={[styles.receiptCard, {
            backgroundColor: colors.surfaceContainerLow,
            borderRadius: borderRadius.lg,
            marginHorizontal: spacing.lg,
            marginTop: 12,
            paddingVertical: 28,
            alignItems: 'center',
            gap: 10,
          }]}
          activeOpacity={0.7}
        >
          <View style={[styles.cameraIconBox, { backgroundColor: colors.surfaceContainerHighest }]}>
            <Camera color={colors.onSurfaceVariant} size={22} />
          </View>
          <Text style={[styles.receiptText, { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 14 }]}>
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
  saveText: {},
  amountSection: {
    alignItems: 'center',
  },
  amountLabel: {},
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  currencyGlyph: {},
  amountInput: {
    minWidth: 120,
  },
  formSection: {},
  fieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  fieldIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldBody: {
    flex: 1,
  },
  fieldLabel: {},
  fieldValue: {},
  changeBtn: {},
  changeBtnText: {},
  notesCard: {},
  notesInput: {},
  splitBtn: {},
  splitBtnText: {},
  receiptCard: {},
  cameraIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptText: {},
});
