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
  ChevronLeft, Pencil, Users, Building2,
  Calendar, MessageSquare, Camera, Paperclip,
  Zap, Plane, Globe, ShoppingBag, Coffee, Car, Monitor,
  Utensils, X, Plus, Clock, ChevronRight, Heart, Tv, ShoppingCart,
  Home, Activity, CircleDollarSign
} from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useMemo, useEffect } from 'react';
import { Modal, Platform, Image, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTransactions } from '../src/context/TransactionContext';
import { useGroups } from '../src/context/GroupContext';
import { getIconForCategory } from '../src/utils/categorization';

// Icon Map for Dynamic Rendering
const IconMap: { [key: string]: any } = {
  'Coffee': Coffee,
  'Car': Car,
  'ShoppingBag': ShoppingBag,
  'Utensils': Utensils,
  'Monitor': Monitor,
  'Home': Home,
  'Activity': Activity,
  'CircleDollarSign': CircleDollarSign,
  'Zap': Zap,
  'Plane': Plane,
  'Globe': Globe,
  'ShoppingCart': ShoppingBag,
  'Heart': Heart,
  'Tv': Tv,
  'DiningOut': Utensils,
  'DiningOutIcon': Utensils,
  'Shopping': ShoppingBag,
  'ShoppingIcon': ShoppingBag,
  'Transport': Car,
  'TransportIcon': Car,
  'Utilities': Zap,
  'UtilitiesIcon': Zap,
  'Travel': Plane,
  'TravelIcon': Plane,
  'Electronics': Monitor,
  'ElectronicsIcon': Monitor,
  'Entertainment': Tv,
  'EntertainmentIcon': Tv,
  'Health': Heart,
  'General': CircleDollarSign
};

const CATEGORIES = [
  'Dining Out', 'Shopping', 'Transport', 'Utilities', 'Travel', 'Health', 'Entertainment'
];

export default function TransactionDetailScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { transactions, updateTransaction } = useTransactions();
  const { groups } = useGroups();

  // High-Fidelity State
  const [note, setNote] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [isEditingMerchant, setIsEditingMerchant] = useState(false);
  const [category, setCategory] = useState('');
  const [txDate, setTxDate] = useState(new Date());
  const [attachment, setAttachment] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  // Modal State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Finding and Initializing Data
  const transaction = useMemo(() => {
    return transactions.find(t => t.id === id) || {
      id: id || 'TXN_9012_VILLAGE_081424',
      name: 'West Village Bistro',
      originalName: 'West Village Bistro',
      amount: -1200.00,
      category: 'Dining Out',
      date: 'Aug 14, 2024',
      status: 'CLEARED',
      iconName: 'Utensils',
      source: 'ICICI Bank **** 9012'
    };
  }, [id, transactions]);

  useEffect(() => {
    if (transaction) {
      setMerchantName(transaction.name);
      setCategory(transaction.category);
      // Parsing the date string is complex for mock data, so we'll just set it to current or mock fixed
      setTxDate(new Date(transaction.date.includes('Aug') ? 'August 14, 2024' : Date.now()));
    }
  }, [transaction]);

  const TransactionIcon = IconMap[transaction.iconName] || Utensils;

  const handleUpdate = (updates: any) => {
    if (transaction.id && typeof transaction.id === 'string') {
      updateTransaction(transaction.id, updates);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAttachment(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (selectedDate > new Date()) return;
      setTxDate(selectedDate);
      handleUpdate({ date: selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingVertical: spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.primary} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 18 }]}>
          Transaction Detail
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* Hero Amount Section */}
        <View style={[styles.hero, { paddingTop: spacing.xl, paddingBottom: spacing.lg, paddingHorizontal: spacing.xl, alignItems: 'center' }]}>
          <View style={[styles.heroIconBox, { backgroundColor: colors.surfaceContainerHighest, borderRadius: 28 }]}>
            <TransactionIcon color={colors.primary} size={36} />
          </View>
          <Text style={[styles.heroAmt, {
            color: colors.onSurface,
            fontFamily: 'Manrope_700Bold',
            fontSize: 48,
            letterSpacing: -1.5,
            marginTop: 20,
          }]}>
            ₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 }}>
            {isEditingMerchant ? (
              <TextInput
                value={merchantName}
                autoFocus
                onChangeText={(val) => {
                  setMerchantName(val);
                  handleUpdate({ name: val });
                }}
                onBlur={() => setIsEditingMerchant(false)}
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                underlineColorAndroid="transparent"
                style={[styles.heromerchant, {
                  color: colors.onSurface,
                  fontFamily: 'Manrope_600SemiBold',
                  fontSize: 18,
                  textAlign: 'center',
                  minWidth: 200,
                }]}
              />
            ) : (
              <Text style={[styles.heromerchant, {
                color: colors.onSurfaceVariant,
                fontFamily: 'Manrope_500Medium',
                fontSize: 18,
                textAlign: 'center'
              }]}>
                {transaction.name || merchantName}
              </Text>
            )}
            <TouchableOpacity onPress={() => setIsEditingMerchant(!isEditingMerchant)}>
              <Pencil color={colors.primary} size={16} />
            </TouchableOpacity>
          </View>

          {/* Category Pill - Clickable */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowCategoryModal(true)}
            style={[styles.categoryPill, {
              backgroundColor: colors.surfaceContainerHighest,
              borderRadius: borderRadius.full,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 10,
              gap: 8,
              marginTop: 24,
            }]}
          >
            <TransactionIcon color={colors.primary} size={14} />
            <Text style={[styles.categoryPillText, {
              color: colors.primary,
              fontFamily: 'Manrope_700Bold',
              fontSize: 11,
              letterSpacing: 1,
            }]}>
              {category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Split Action Area */}
        {selectedGroup ? (
          <View style={[styles.groupCard, {
            backgroundColor: colors.surfaceContainerLow,
            padding: spacing.lg,
            borderRadius: 24,
            marginHorizontal: spacing.lg,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            marginBottom: spacing.xl
          }]}>
            <View style={[styles.groupAvatar, { backgroundColor: selectedGroup.bgColor || colors.primaryContainer, width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={{ fontSize: 24 }}>{selectedGroup.emoji || '👥'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 17 }}>{selectedGroup.name}</Text>
              <Text style={{ color: colors.onSurfaceVariant, fontSize: 13, marginTop: 2 }}>{selectedGroup.members} Members • {selectedGroup.status}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedGroup(null)} style={{ padding: 8 }}>
              <X color={colors.onSurfaceVariant} size={22} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.splitBtn, {
              backgroundColor: colors.primary,
              borderRadius: 20,
              marginHorizontal: spacing.lg,
              paddingVertical: 18,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
              marginBottom: spacing.xl,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 10,
            }]}
            activeOpacity={0.85}
            onPress={() => setShowGroupModal(true)}
          >
            <Users color={colors.onPrimary} size={22} />
            <Text style={[styles.splitBtnText, { color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
              Split with Group
            </Text>
          </TouchableOpacity>
        )}

        {/* Detail Cards Section */}
        <View style={[styles.detailSection, { paddingHorizontal: spacing.lg, gap: 16 }]}>

          {/* Account Used */}
          <View style={[styles.detailCard, { gap: 12, paddingVertical: 24 }]}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1 }]}>
              ACCOUNT USED
            </Text>
            <View style={styles.fieldRow}>
              <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHighest, borderRadius: 12 }]}>
                <Building2 color={colors.onSurface} size={20} />
              </View>
              <View>
                <Text style={[styles.fieldValueBold, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16 }]}>
                  {transaction.source || 'ICICI Bank'}
                </Text>
                <Text style={[styles.fieldMeta, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 13, marginTop: 2 }]}>
                  **** 9012
                </Text>
              </View>
            </View>
          </View>

          {/* Transaction Date - Clickable */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
            style={[styles.detailCard, { gap: 8, paddingBottom: 24, paddingTop: 0 }]}
          >
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1 }]}>
              TRANSACTION DATE
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={[styles.fieldValueLarge, { color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20 }]}>
                {txDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Text>
              <Calendar color={colors.primary} size={18} />
            </View>
            <Text style={[styles.fieldMeta, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_400Regular', fontSize: 14 }]}>
              8:42 PM
            </Text>
          </TouchableOpacity>

          {/* Source SMS - Clean Header */}
          <View style={[styles.detailCard, { gap: 12 }]}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1 }]}>
              SOURCE SMS
            </Text>
            <View style={[styles.smsBody, { backgroundColor: colors.surfaceContainerHighest, borderRadius: 24, padding: 24 }]}>
              <Text style={[styles.smsText, {
                color: colors.onSurfaceVariant,
                fontFamily: 'Manrope_400Regular',
                fontSize: 14,
                lineHeight: 22,
              }]}>
                Vp-ICICIB: Acct XX9012 debited for INR {Math.abs(transaction.amount).toLocaleString('en-IN')} on {transaction.date}. Info: {transaction.originalName || transaction.name} (Edited: {transaction.name}). Call 1800...
              </Text>
            </View>
          </View>

          {/* Notes & Evidence - Unified Card */}
          <View style={[styles.detailCard, { gap: 12 }]}>
            <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1, marginBottom: 4 }]}>
              NOTES & EVIDENCE
            </Text>
            <View style={[styles.notesUnified, { backgroundColor: colors.surfaceContainerHighest, borderRadius: 24, padding: 20 }]}>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Add a note..."
                placeholderTextColor={colors.onSurfaceVariant}
                multiline
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                underlineColorAndroid="transparent"
                style={[styles.noteInput, {
                  color: colors.onSurface,
                  fontFamily: 'Manrope_400Regular',
                  fontSize: 15,
                  minHeight: 80,
                  textAlignVertical: 'top'
                }]}
              />

              {/* Add Attachment Row */}
              <View style={[styles.attachRow, { marginTop: 12, borderTopWidth: 1, borderTopColor: colors.outlineVariant, paddingTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
                >
                  <Camera color={colors.onSurfaceVariant} size={20} />
                  <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 14 }}>
                    {attachment ? 'Change Attachment' : 'Add Attachment'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>

        {/* Transaction ID Footer */}
        <Text style={[styles.txId, {
          color: colors.outlineVariant,
          fontFamily: 'Manrope_600SemiBold',
          fontSize: 11,
          textAlign: 'center',
          marginTop: 40,
          letterSpacing: 2,
        }]}>
          TRANSACTION ID: {String(transaction.id).toUpperCase()}
        </Text>

      </ScrollView>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCategoryModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainerLow, borderTopLeftRadius: 32, borderTopRightRadius: 32 }]}>
                <View style={[styles.modalHeader, { padding: spacing.lg }]}>
                  <View style={[styles.modalDrag, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Select Category</Text>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>
                  <View style={{ gap: 10 }}>
                    {CATEGORIES.map(cat => {
                      const catKey = cat.replace(' ', '');
                      const CatIcon = IconMap[catKey] || ShoppingBag;
                      return (
                        <TouchableOpacity
                          key={cat}
                          onPress={() => {
                            setCategory(cat);
                            handleUpdate({ category: cat, iconName: getIconForCategory(cat) });
                            setShowCategoryModal(false);
                          }}
                          style={[styles.catOption, {
                            backgroundColor: category === cat ? colors.primary : colors.surfaceContainerHighest,
                            padding: spacing.md,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 14
                          }]}
                        >
                          <View style={[styles.miniIconBox, { backgroundColor: category === cat ? 'rgba(255,255,255,0.2)' : colors.surfaceContainerLow, width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }]}>
                            <CatIcon color={category === cat ? colors.onPrimary : colors.primary} size={20} />
                          </View>
                          <Text style={{ flex: 1, color: category === cat ? colors.onPrimary : colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }}>{cat}</Text>
                          {category === cat && <ChevronRight color={colors.onPrimary} size={18} />}
                        </TouchableOpacity>
                      );
                    })}

                    {/* Custom Categories from state if any */}
                    {category && !CATEGORIES.includes(category) && (
                      <TouchableOpacity
                        onPress={() => setShowCategoryModal(false)}
                        style={[styles.catOption, {
                          backgroundColor: colors.primary,
                          padding: spacing.md,
                          borderRadius: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 14
                        }]}
                      >
                        <View style={[styles.miniIconBox, { backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }]}>
                          <Text style={{ color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>{category[0].toUpperCase()}</Text>
                        </View>
                        <Text style={{ flex: 1, color: colors.onPrimary, fontFamily: 'Manrope_600SemiBold', fontSize: 15 }}>{category}</Text>
                        <ChevronRight color={colors.onPrimary} size={18} />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Add New Category Input */}
                  <View style={{ marginTop: 20, gap: 12 }}>
                    <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1 }}>CREATE NEW</Text>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                      <TextInput
                        value={newCatName}
                        onChangeText={setNewCatName}
                        placeholder="Category name..."
                        placeholderTextColor={colors.onSurfaceVariant}
                        selectionColor={colors.primary}
                        cursorColor={colors.primary}
                        underlineColorAndroid="transparent"
                        style={{
                          flex: 1,
                          backgroundColor: colors.surfaceContainerHighest,
                          borderRadius: 16,
                          paddingHorizontal: 16,
                          height: 56,
                          color: colors.onSurface,
                          fontFamily: 'Manrope_500Medium'
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          if (newCatName.trim()) {
                            setCategory(newCatName);
                            handleUpdate({ category: newCatName, iconName: getIconForCategory(newCatName) });
                            setShowCategoryModal(false);
                            setNewCatName('');
                          }
                        }}
                        style={{
                          backgroundColor: colors.primary,
                          borderRadius: 16,
                          width: 56,
                          height: 56,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Plus color={colors.onPrimary} size={24} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Group Selection Modal */}
      <Modal
        visible={showGroupModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowGroupModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowGroupModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainerLow, borderTopLeftRadius: 32, borderTopRightRadius: 32 }]}>
                <View style={[styles.modalHeader, { padding: spacing.lg }]}>
                  <View style={[styles.modalDrag, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Select Group</Text>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>
                  <View style={{ gap: 10 }}>
                    {groups.map(group => (
                      <TouchableOpacity
                        key={group.id}
                        onPress={() => {
                          setSelectedGroup(group);
                          setShowGroupModal(false);
                        }}
                        style={[styles.groupOption, {
                          backgroundColor: colors.surfaceContainerHighest,
                          padding: spacing.md,
                          borderRadius: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 14
                        }]}
                      >
                        <View style={[styles.groupIconBox, { backgroundColor: group.bgColor || colors.primaryContainer, width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }]}>
                          <Text style={{ fontSize: 20 }}>{group.emoji || '👥'}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }}>{group.name}</Text>
                          <Text style={{ color: colors.onSurfaceVariant, fontSize: 12 }}>{group.members} Members</Text>
                        </View>
                        <ChevronRight color={colors.onSurfaceVariant} size={18} />
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[styles.createGroupAction, {
                      marginTop: 20,
                      borderWidth: 1,
                      borderColor: colors.outlineVariant,
                      borderStyle: 'dashed',
                      borderRadius: 16,
                      padding: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10
                    }]}
                  >
                    <Plus color={colors.primary} size={20} />
                    <Text style={{ color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 14 }}>Create New Group</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Date Picker Component */}
      {showDatePicker && (
        <DateTimePicker
          value={txDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          themeVariant="dark"
        />
      )}
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
    width: 80,
    height: 80,
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
    gap: 16,
  },
  fieldIconBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldValue: {},
  fieldValueBold: {},
  fieldValueLarge: {},
  fieldMeta: {},
  smsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smsBody: {},
  smsText: {},
  notesUnified: {},
  noteInput: {},
  attachRow: {},
  thumbBox: {},
  txId: {},
  groupCard: {},
  groupAvatar: {},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '80%',
  },
  modalHeader: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalDrag: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  catOption: {
    marginBottom: 8,
  },
  miniIconBox: {},
  groupOption: {
    marginBottom: 8,
  },
  groupIconBox: {},
  createGroupAction: {},
});
