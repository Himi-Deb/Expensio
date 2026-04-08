import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronDown, Coffee, Car, ShoppingBag, Monitor,
  Home, Activity, CircleDollarSign, Zap, Plane, Globe,
  ChevronRight, Plus, Heart, Tv, ShoppingCart, Building2, Check, Paperclip, 
  Utensils, X, CreditCard, Calendar, Camera, Users
} from 'lucide-react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useTransactions } from '../src/context/TransactionContext';
import { useGroups } from '../src/context/GroupContext';
import { useCurrency, SUPPORTED_CURRENCIES } from '../src/context/CurrencyContext';
import { autoCategorizeTransaction, TransactionIcon, getIconForCategory } from '../src/utils/categorization';

// Icon Map for Dynamic Rendering (Matching Detail Page)
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

const PAYMENT_SOURCES = [
  { id: 'cash', name: 'Cash', icon: CircleDollarSign },
  { id: 'icici', name: 'ICICI Bank **** 9012', icon: Building2 },
  { id: 'hdfc', name: 'HDFC Bank **** 4432', icon: Building2 },
];

export default function NewTransactionScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const { groups } = useGroups();
  const { baseCurrency } = useCurrency();

  const [amount, setAmount] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [category, setCategory] = useState('General');
  const [iconName, setIconName] = useState<TransactionIcon>('CircleDollarSign');
  const [currency, setCurrency] = useState(baseCurrency ?? SUPPORTED_CURRENCIES[0]);
  const [remarks, setRemarks] = useState('');

  // New States
  const [spentFrom, setSpentFrom] = useState(PAYMENT_SOURCES[0]);
  const [txDate, setTxDate] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [attachment, setAttachment] = useState<string | null>(null);

  // Modal States
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSpentFromModal, setShowSpentFromModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Intelligent Categorizer Map
  useEffect(() => {
    if (merchantName.length > 2) {
      const { category: newCat, iconName: newIcon } = autoCategorizeTransaction(merchantName);
      setCategory(newCat);
      setIconName(newIcon);
    }
  }, [merchantName]);

  const handleSave = () => {
    if (!amount || isNaN(Number(amount))) return;

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const dateStr = txDate.toDateString() === today.toDateString() ? 'Today' :
      txDate.toDateString() === yesterday.toDateString() ? 'Yesterday' :
        txDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    addTransaction({
      name: merchantName || 'Manual Entry',
      amount: -Math.abs(Number(amount)),
      currencyCode: currency.code,
      amountInBase: currency.code === 'INR' ? -Math.abs(Number(amount)) : undefined,
      category,
      iconName,
      date: dateStr,
      status: 'CLEARED',
      source: spentFrom.name,
      remarks: remarks.trim() || undefined,
      attachment: attachment || undefined,
    });

    router.back();
  };

  const handleDateChange = (selectedDate: Date) => {
    // Prevent future dates
    if (selectedDate > new Date()) return;
    setTxDate(selectedDate);
    setShowDatePicker(false);
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

  // Date Selection Modal Helper
  const DateSelectionModal = () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = txDate.toDateString() === today.toDateString();
    const isYesterday = txDate.toDateString() === yesterday.toDateString();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = txDate.getMonth();
    const currentYear = txDate.getFullYear();
    const currentDay = txDate.getDate();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <Modal visible={showDatePicker} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, {
                backgroundColor: colors.surfaceContainerLow,
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                paddingBottom: 40
              }]}>
                <View style={[styles.modalHeader, { padding: spacing.lg }]}>
                  <View style={[styles.modalDrag, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Select Date</Text>
                </View>

                {/* Presets (Swapped: Yesterday Left, Today Right) */}
                <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: spacing.lg, marginBottom: 24 }}>
                  <TouchableOpacity
                    onPress={() => handleDateChange(yesterday)}
                    style={{
                      flex: 1,
                      backgroundColor: isYesterday ? colors.primary : colors.surfaceContainerHighest,
                      paddingVertical: 12,
                      borderRadius: 16,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: isYesterday ? colors.onPrimary : colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 14 }}>Yesterday</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDateChange(today)}
                    style={{
                      flex: 1,
                      backgroundColor: isToday ? colors.primary : colors.surfaceContainerHighest,
                      paddingVertical: 12,
                      borderRadius: 16,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: isToday ? colors.onPrimary : colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 14 }}>Today</Text>
                  </TouchableOpacity>
                </View>

                {/* Month/Year Display */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.xl, marginBottom: 20 }}>
                  <TouchableOpacity onPress={() => {
                    const prev = new Date(txDate);
                    prev.setMonth(prev.getMonth() - 1);
                    setTxDate(prev);
                  }}>
                    <ChevronRight color={colors.primary} size={20} style={{ transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                  <Text style={{ color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 18 }}>
                    {months[currentMonth]} {currentYear}
                  </Text>
                  <TouchableOpacity onPress={() => {
                    const next = new Date(txDate);
                    next.setMonth(next.getMonth() + 1);
                    setTxDate(next);
                  }}>
                    <ChevronRight color={colors.primary} size={20} />
                  </TouchableOpacity>
                </View>

                {/* Days Grid (Simplified) */}
                <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                    {days.map(day => {
                      const dateObj = new Date(currentYear, currentMonth, day);
                      const isSelected = txDate.toDateString() === dateObj.toDateString();
                      return (
                        <TouchableOpacity
                          key={day}
                          onPress={() => handleDateChange(dateObj)}
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            backgroundColor: isSelected ? colors.primary : colors.surfaceContainerHighest,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{
                            color: isSelected ? colors.onPrimary : colors.onSurface,
                            fontFamily: 'Manrope_600SemiBold',
                            fontSize: 14
                          }}>
                            {day}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setShowDatePicker(false)}
                  style={{ margin: spacing.lg, backgroundColor: colors.surfaceContainerHigh, paddingVertical: 16, borderRadius: 16, alignItems: 'center' }}
                >
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
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
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60, marginTop: 16 }}>

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
          {/* Currency Pill — centered above the number */}
          <TouchableOpacity
            onPress={() => setShowCurrencyModal(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: colors.surfaceContainerLow,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 10,
              marginBottom: 8,
              alignSelf: 'center',
            }}
          >
            <Text style={{ color: colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 18 }}>{currency.symbol}</Text>
            <Text style={{ color: colors.primary, fontFamily: 'Manrope_600SemiBold', fontSize: 14 }}>{currency.code}</Text>
            <ChevronDown color={colors.primary} size={14} />
          </TouchableOpacity>

          <View style={styles.amountRow}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.surfaceContainerHighest}
              keyboardType="decimal-pad"
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              underlineColorAndroid="transparent"
              style={{
                color: colors.onSurface,
                fontFamily: 'Manrope_700Bold',
                fontSize: 64,
                letterSpacing: -2,
                minWidth: 140,
                textAlign: 'center',
              }}
              numberOfLines={1}
            />
          </View>
        </View>

        {/* Form Fields */}
        <View style={{ paddingHorizontal: spacing.xl, gap: 12, marginTop: 12 }}>

          {/* Title / Merchant */}
          <View style={{ backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: 8 }}>
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1, marginBottom: 10 }}>
              MERCHANT / TITLE
            </Text>
            <TextInput
              value={merchantName}
              onChangeText={setMerchantName}
              placeholder="Who did you pay?"
              placeholderTextColor={colors.onSurfaceVariant}
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              underlineColorAndroid="transparent"
              style={{
                color: colors.onSurface,
                fontFamily: 'Manrope_600SemiBold',
                fontSize: 18,
                minHeight: 40,
              }}
            />
          </View>

          {/* Category Trigger */}
          <TouchableOpacity
            onPress={() => setShowCategoryModal(true)}
            style={styles.flatFieldRow}
          >
            <View style={[styles.fieldIconBox, { backgroundColor: colors.primary }]}>
              {(() => {
                const cleanKey = String(category).replace(' ', '');
                const CurrentIcon = IconMap[cleanKey] || CircleDollarSign;
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
            <View style={{ backgroundColor: colors.surfaceContainerHighest, borderRadius: borderRadius.full, paddingHorizontal: 16, paddingVertical: 8 }}>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_500Medium', fontSize: 12 }}>Change</Text>
            </View>
          </TouchableOpacity>

          {/* Spent From Trigger */}
          <TouchableOpacity
            onPress={() => setShowSpentFromModal(true)}
            style={styles.flatFieldRow}
          >
            <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              {spentFrom.id === 'cash' ? <spentFrom.icon color={colors.onSurface} size={18} /> :
                <Building2 color={colors.onSurface} size={18} />}
            </View>
            <View style={styles.fieldBody}>
              <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }}>
                SPENT FROM
              </Text>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }}>
                {spentFrom.name}
              </Text>
            </View>
            <ChevronDown color={colors.onSurfaceVariant} size={20} />
          </TouchableOpacity>

          {/* Date Trigger */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.flatFieldRow}
          >
            <View style={[styles.fieldIconBox, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Calendar color={colors.onSurface} size={18} />
            </View>
            <View style={styles.fieldBody}>
              <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_500Medium', fontSize: 10, letterSpacing: 1 }}>
                DATE
              </Text>
              <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16, marginTop: 2 }}>
                {txDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Text>
            </View>
            <Calendar color={colors.onSurfaceVariant} size={18} />
          </TouchableOpacity>

        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: spacing.xl, marginTop: 32, gap: 12 }}>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.primaryBtn, {
              backgroundColor: colors.primary,
              borderRadius: 20,
              paddingVertical: 18,
              alignItems: 'center',
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }]}
          >
            <Text style={{ color: colors.onPrimary, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>
              Save Transaction
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowGroupModal(true)}
            style={[styles.secondaryBtn, {
              backgroundColor: 'transparent',
              borderRadius: 20,
              paddingVertical: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }]}
          >
            <Users color={colors.onSurfaceVariant} size={20} />
            <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>
              {selectedGroup ? `Split with ${selectedGroup.name}` : 'Split with Group'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notes & Evidence - Unified Card */}
        <View style={[styles.detailCard, { paddingHorizontal: spacing.xl, marginTop: 24, gap: 12 }]}>
          <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1, marginBottom: 4 }]}>
            NOTES & EVIDENCE
          </Text>
          <View style={[styles.notesUnified, { backgroundColor: colors.surfaceContainerLow, borderRadius: 24, padding: 20 }]}>
            <TextInput
              value={remarks}
              onChangeText={setRemarks}
              placeholder="Add a note about this transaction..."
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

            {attachment && (
              <View style={{ position: 'relative', width: 80, height: 80, marginTop: 16 }}>
                <Image
                  source={{ uri: attachment }}
                  style={{ width: 80, height: 80, borderRadius: 12 }}
                />
                <TouchableOpacity
                  onPress={() => setAttachment(null)}
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: colors.error,
                    borderRadius: 10,
                    padding: 2
                  }}
                >
                  <X color={colors.onPrimary} size={14} />
                </TouchableOpacity>
              </View>
            )}

            {/* Add Attachment Row */}
            <View style={[styles.attachRow, { marginTop: 12, borderTopWidth: 1, borderTopColor: colors.outlineVariant, paddingTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
              <TouchableOpacity
                onPress={pickImage}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <Camera color={colors.onSurfaceVariant} size={20} />
                <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 14 }}>
                  {attachment ? 'Change Attachment' : 'Add Attachment'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Category Selection Modal */}
      <Modal visible={showCategoryModal} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowCategoryModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainerLow, borderTopLeftRadius: 32, borderTopRightRadius: 32 }]}>
                <View style={[styles.modalHeader, { padding: spacing.lg }]}>
                  <View style={[styles.modalDrag, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={{ color: colors.onSurfaceVariant, fontFamily: 'Manrope_700Bold', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Select Category</Text>
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
                            setIconName(getIconForCategory(cat));
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
                          {category === cat && <Check color={colors.onPrimary} size={18} />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>

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
                            setIconName(getIconForCategory(newCatName));
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

      {/* Spent From Modal */}
      <Modal visible={showSpentFromModal} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowSpentFromModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainerLow, borderTopLeftRadius: 32, borderTopRightRadius: 32 }]}>
                <View style={[styles.modalHeader, { padding: spacing.lg }]}>
                  <View style={[styles.modalDrag, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Spent From</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>
                  <View style={{ gap: 10 }}>
                    {PAYMENT_SOURCES.map(source => (
                      <TouchableOpacity
                        key={source.id}
                        onPress={() => {
                          setSpentFrom(source);
                          setShowSpentFromModal(false);
                        }}
                        style={{
                          backgroundColor: spentFrom.id === source.id ? colors.primary : colors.surfaceContainerHighest,
                          padding: spacing.md,
                          borderRadius: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 14
                        }}
                      >
                        <View style={{ backgroundColor: spentFrom.id === source.id ? 'rgba(255,255,255,0.2)' : colors.surfaceContainerLow, width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                          <source.icon color={spentFrom.id === source.id ? colors.onPrimary : colors.primary} size={20} />
                        </View>
                        <Text style={{ flex: 1, color: spentFrom.id === source.id ? colors.onPrimary : colors.onSurface, fontFamily: 'Manrope_600SemiBold', fontSize: 16 }}>{source.name}</Text>
                        {spentFrom.id === source.id && <Check color={colors.onPrimary} size={18} />}
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Group Selection Modal */}
      <Modal visible={showGroupModal} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowGroupModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainerLow, borderTopLeftRadius: 32, borderTopRightRadius: 32 }]}>
                <View style={[styles.modalHeader, { padding: spacing.lg }]}>
                  <View style={[styles.modalDrag, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Split with Group</Text>
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
                        style={{
                          backgroundColor: colors.surfaceContainerHighest,
                          padding: spacing.md,
                          borderRadius: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 14
                        }}
                      >
                        <View style={{ backgroundColor: group.bgColor || colors.primaryContainer, width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
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
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Date Picker Modal */}
      <DateSelectionModal />

      {/* Currency Selection Modal */}
      <Modal visible={showCurrencyModal} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowCurrencyModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { backgroundColor: colors.surfaceContainerLow, borderTopLeftRadius: 32, borderTopRightRadius: 32 }]}>
                <View style={[styles.modalHeader, { padding: spacing.lg }]}>
                  <View style={[styles.modalDrag, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={{ color: colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 20, textAlign: 'center', marginTop: 10 }}>Select Currency</Text>
                </View>
                <ScrollView style={{ maxHeight: 400 }} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>
                  <View style={{ gap: 10 }}>
                    {SUPPORTED_CURRENCIES.map((cur: import('../src/context/CurrencyContext').Currency) => (
                      <TouchableOpacity
                        key={cur.code}
                        onPress={() => { setCurrency(cur); setShowCurrencyModal(false); }}
                        style={{
                          backgroundColor: currency.code === cur.code ? colors.primary : colors.surfaceContainerHighest,
                          padding: spacing.md,
                          borderRadius: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 14,
                        }}
                      >
                        <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: currency.code === cur.code ? 'rgba(255,255,255,0.2)' : colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: currency.code === cur.code ? colors.onPrimary : colors.primary, fontFamily: 'Manrope_700Bold', fontSize: 18 }}>{cur.symbol}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: currency.code === cur.code ? colors.onPrimary : colors.onSurface, fontFamily: 'Manrope_700Bold', fontSize: 16 }}>{cur.code}</Text>
                          <Text style={{ color: currency.code === cur.code ? 'rgba(255,255,255,0.7)' : colors.onSurfaceVariant, fontSize: 13 }}>{cur.name}</Text>
                        </View>
                        {currency.code === cur.code && <Check color={colors.onPrimary} size={18} />}
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '85%',
  },
  modalHeader: {
    alignItems: 'center',
  },
  modalDrag: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  catOption: {
    width: '100%',
  },
  miniIconBox: {},
  detailCard: {},
  fieldLabel: {},
  notesUnified: {},
  noteInput: {},
  attachRow: {},
});

