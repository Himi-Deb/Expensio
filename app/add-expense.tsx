import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { X, ChevronDown, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddExpenseScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing.lg }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color={colors.onSurface} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
           Add Expense
        </Text>
        <TouchableOpacity>
           <Text style={[styles.saveText, { color: colors.primary, fontFamily: 'Manrope_700Bold' }]}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.content, { paddingHorizontal: spacing.xl }]}>
        {/* Amount Input Section - Level 1 Tonal Layering */}
        <View style={[styles.amountSection, { 
          backgroundColor: colors.surfaceContainerLow, 
          borderRadius: borderRadius.xl,
          padding: spacing.xl,
          alignItems: 'center',
          marginBottom: spacing.xxl
        }]}>
          <Text style={[styles.sectionLabel, { color: colors.onSurfaceVariant, marginBottom: spacing.xs }]}>
             HOW MUCH?
          </Text>
          <View style={styles.amountInputRow}>
            <Text style={[styles.currency, { color: colors.onSurface, fontSize: 32, fontFamily: 'Manrope_700Bold' }]}>₹</Text>
            <TextInput 
              placeholder="0.00"
              style={[styles.amountInput, { color: colors.onSurface, fontSize: 48, fontFamily: 'Manrope_700Bold' }]}
              keyboardType="decimal-pad"
              autoFocus
            />
          </View>
        </View>

        {/* Form Fields - NO LINE RULE */}
        <View style={styles.form}>
           <Text style={[styles.label, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>DESCRIPTION</Text>
           <View style={[styles.inputBox, { backgroundColor: colors.surfaceContainerHigh, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.lg }]}>
              <TextInput placeholder="Dinner at Olive" style={{ fontFamily: 'Inter_400Regular', fontSize: 16 }} />
           </View>

           <Text style={[styles.label, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>GROUP</Text>
           <TouchableOpacity style={[styles.picker, { backgroundColor: colors.surfaceContainerHigh, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.lg }]}>
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 16 }}>Trip to Goa</Text>
              <ChevronDown color={colors.onSurfaceVariant} size={20} />
           </TouchableOpacity>

           <Text style={[styles.label, { color: colors.onSurfaceVariant, marginBottom: spacing.sm }]}>SPLIT MODE</Text>
           <View style={styles.splitModes}>
              {['Equal', 'Percentage', 'Custom'].map((mode, i) => (
                <TouchableOpacity key={mode} style={[
                  styles.modeButton, 
                  { 
                    backgroundColor: i === 0 ? colors.primary : colors.surfaceContainerHigh,
                    borderRadius: borderRadius.full,
                    paddingHorizontal: 20,
                    paddingVertical: 10
                  }
                ]}>
                   <Text style={{ 
                     color: i === 0 ? 'white' : colors.onSurfaceVariant, 
                     fontFamily: 'Inter_500Medium',
                     fontSize: 13
                   }}>
                     {mode}
                   </Text>
                </TouchableOpacity>
              ))}
           </View>
        </View>
      </View>
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
  title: {},
  saveText: {},
  content: {},
  amountSection: {},
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: 'Inter_500Medium',
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currency: {},
  amountInput: {},
  form: {},
  label: {
    fontSize: 10,
    letterSpacing: 0.5,
    fontFamily: 'Inter_500Medium',
  },
  inputBox: {},
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  splitModes: {
    flexDirection: 'row',
    gap: 8,
  },
  modeButton: {},
});
