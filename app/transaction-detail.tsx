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
  ChevronLeft, Pencil, Utensils, Users, Building2,
  Calendar, MessageSquare, Camera, Paperclip,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function TransactionDetailScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [note, setNote] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingVertical: spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.primary} size={26} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          Transaction Detail
        </Text>
        <TouchableOpacity>
          <Pencil color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* Hero Amount */}
        <View style={[styles.hero, { paddingTop: spacing.xl, paddingBottom: spacing.lg, alignItems: 'center' }]}>
          <View style={[styles.heroIconBox, { backgroundColor: colors.surfaceContainerHigh, borderRadius: 20 }]}>
            <Utensils color={colors.primary} size={26} />
          </View>
          <Text style={[styles.heroAmt, {
            color: colors.onSurface,
            fontFamily: 'Manrope_700Bold',
            fontSize: 44,
            letterSpacing: -1.5,
            marginTop: 20,
          }]}>
            ₹1,200.00
          </Text>
          <Text style={[styles.heromerchant, {
            color: colors.onSurfaceVariant,
            fontFamily: 'Manrope_400Regular',
            fontSize: 14,
            marginTop: 4,
          }]}>
            West Village Bistro
          </Text>
          {/* Category Pill */}
          <View style={[styles.categoryPill, {
            backgroundColor: colors.surfaceContainerHighest,
            borderRadius: borderRadius.full,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 6,
            gap: 6,
            marginTop: 14,
          }]}>
            <Utensils color={colors.onSurfaceVariant} size={12} />
            <Text style={[styles.categoryPillText, {
              color: colors.onSurfaceVariant,
              fontFamily: 'Manrope_500Medium',
              fontSize: 11,
              letterSpacing: 1,
            }]}>
              DINING
            </Text>
          </View>
        </View>

        {/* Split with Group */}
        <TouchableOpacity
          style={[styles.splitBtn, {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.full,
            marginHorizontal: spacing.lg,
            paddingVertical: 18,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            marginBottom: spacing.xl,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 10,
          }]}
          activeOpacity={0.85}
          onPress={() => router.push('/select-group')}
        >
          <Users color={colors.onPrimary} size={20} />
          <Text style={[styles.splitBtnText, { color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
            Split with Group
          </Text>
        </TouchableOpacity>

        {/* Detail Cards */}
        <View style={[styles.detailSection, { paddingHorizontal: spacing.lg, gap: 10 }]}>

          {/* Account Used */}
          <View style={[styles.detailCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 12 }]}>
              ACCOUNT USED
            </Text>
            <View style={styles.fieldRow}>
              <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHighest, borderRadius: 10 }]}>
                <Building2 color={colors.onSurfaceVariant} size={18} />
              </View>
              <View>
                <Text style={[styles.fieldValue, { color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }]}>
                  ICICI Bank
                </Text>
                <Text style={[styles.fieldMeta, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 12, marginTop: 2 }]}>
                  **** 9012
                </Text>
              </View>
            </View>
          </View>

          {/* Transaction Date */}
          <View style={[styles.detailCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 10 }]}>
              TRANSACTION DATE
            </Text>
            <Text style={[styles.fieldValue, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
              Aug 14, 2024
            </Text>
            <Text style={[styles.fieldMeta, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 13, marginTop: 2 }]}>
              8:42 PM
            </Text>
          </View>

          {/* Source SMS */}
          <View style={[styles.detailCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <View style={styles.smsHeader}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }]}>
                SOURCE SMS
              </Text>
              <MessageSquare color={colors.onSurfaceVariant} size={16} />
            </View>
            <View style={[styles.smsBody, { backgroundColor: colors.surfaceContainerHighest, borderRadius: borderRadius.sm, padding: 12, marginTop: 10 }]}>
              <Text style={[styles.smsText, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18 }]}>
                Vp-ICICIB: Acct XX9012 debited for INR 1,200.00 on 14-Aug-24. Info: West Village Bistro. Call 1800...
              </Text>
            </View>
          </View>

          {/* Notes & Evidence */}
          <View style={[styles.detailCard, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.md }]}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 12 }]}>
              NOTES & EVIDENCE
            </Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Add a note..."
              placeholderTextColor={colors.onSurfaceVariant}
              multiline
              style={[styles.noteInput, {
                color: colors.onSurface,
                fontFamily: 'Manrope_400Regular',
                fontSize: 14,
                minHeight: 52,
                borderBottomWidth: 1,
                borderBottomColor: colors.outline,
                paddingBottom: 12,
              }]}
            />

            {/* Add Attachment */}
            <TouchableOpacity style={[styles.attachRow, { marginTop: 14 }]}>
              <View style={[styles.attachIconBox, { backgroundColor: colors.surfaceContainerHighest, borderRadius: 10 }]}>
                <Camera color={colors.onSurfaceVariant} size={18} />
              </View>
              <Text style={[styles.attachText, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 14, flex: 1 }]}>
                Add Attachment
              </Text>
              <View style={[styles.attachPlaceholder, { backgroundColor: colors.surfaceContainerHighest, borderRadius: 10 }]}>
                <Paperclip color={colors.onSurfaceVariant} size={16} />
              </View>
            </TouchableOpacity>
          </View>

        </View>

        {/* Transaction ID Footer */}
        <Text style={[styles.txId, {
          color: colors.outlineVariant,
          fontFamily: 'Manrope_400Regular',
          fontSize: 11,
          textAlign: 'center',
          marginTop: spacing.xl,
          letterSpacing: 0.5,
        }]}>
          TRANSACTION ID: TXN_9012_VILLAGE_081424
        </Text>

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
  headerTitle: {},
  hero: {},
  heroIconBox: {
    width: 66,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroAmt: {},
  heromerchant: {},
  categoryPill: {},
  categoryPillText: {},
  splitBtn: {},
  splitBtnText: {},
  detailSection: {},
  detailCard: {},
  fieldLabel: {},
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fieldIconBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldValue: {},
  fieldMeta: {},
  smsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smsBody: {},
  smsText: {},
  noteInput: {},
  attachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  attachIconBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachText: {},
  attachPlaceholder: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txId: {},
});
