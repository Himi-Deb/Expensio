import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Settings, UserPlus, Camera, ChevronDown, Link as LinkIcon, Share, QrCode, Search, ChevronRight, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function CreateGroupScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'setup' | 'invite'>('setup');
  
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['Travel', 'Housing', 'Food & Drink', 'Entertainment'];
  
  const suggestedContacts = [
    { id: '1', name: 'Rohan Mehra', handle: '@rohanm_pay', action: 'Add' },
    { id: '2', name: 'Sneha Kapoor', handle: '@sneha_kp', action: 'Add' },
    { id: '3', name: 'Vikram Roy', handle: '@vikram_fin', action: 'Add' },
    { id: '4', name: 'Karan Das', handle: '@karandas_99', action: 'Invite' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.xl, paddingTop: spacing.md }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color={colors.primary} size={28} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Create Group</Text>
        <TouchableOpacity onPress={() => activeTab === 'setup' ? setActiveTab('invite') : null}>
          <Text style={[styles.headerAction, { color: colors.primary }]}>
            {activeTab === 'setup' ? 'Next' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Tabs */}
          <View style={[styles.tabsContainer, { marginHorizontal: spacing.xl, backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'setup' ? { backgroundColor: colors.primary, borderRadius: borderRadius.lg } : {}
              ]}
              onPress={() => setActiveTab('setup')}
            >
              <Settings color={activeTab === 'setup' ? colors.background : colors.onSurfaceVariant} size={20} />
              <Text style={[styles.tabText, { color: activeTab === 'setup' ? colors.background : colors.onSurfaceVariant }]}>Setup</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'invite' ? { backgroundColor: colors.primary, borderRadius: borderRadius.lg } : {}
              ]}
              onPress={() => setActiveTab('invite')}
            >
              <UserPlus color={activeTab === 'invite' ? colors.background : colors.onSurfaceVariant} size={20} />
              <Text style={[styles.tabText, { color: activeTab === 'invite' ? colors.background : colors.onSurfaceVariant }]}>Invite</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'setup' ? (
            <View style={{ paddingHorizontal: spacing.xl }}>
              {/* Cover Upload */}
              <View style={styles.uploadSection}>
                <TouchableOpacity style={[styles.uploadCircle, { backgroundColor: colors.surfaceContainerLow }]}>
                  <Camera color={colors.onSurfaceVariant} size={32} />
                  <View style={[styles.uploadBadge, { backgroundColor: colors.background }]}><Text style={{ color: colors.onSurfaceVariant, fontSize: 16 }}>+</Text></View>
                </TouchableOpacity>
                <Text style={[styles.uploadLabel, { color: colors.onSurfaceVariant }]}>ADD GROUP COVER</Text>
              </View>

              {/* Form Fields */}
              <View style={[styles.fieldGroup, { marginBottom: spacing.xl }]}>
                <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>GROUP NAME</Text>
                <TextInput 
                  style={[styles.input, { color: colors.onSurface }]}
                  placeholder="e.g. Weekend Warriors"
                  placeholderTextColor={colors.onSurfaceVariant}
                  value={groupName}
                  onChangeText={setGroupName}
                />
              </View>

              <View style={[styles.fieldGroup, { marginBottom: spacing.xl }]}>
                <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>DESCRIPTION</Text>
                <TextInput 
                  style={[styles.input, { color: colors.onSurface }]}
                  placeholder="What's this group about?"
                  placeholderTextColor={colors.onSurfaceVariant}
                  value={description}
                  onChangeText={setDescription}
                />
              </View>

              <View style={[styles.fieldGroup, { marginBottom: spacing.xl }]}>
                <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>CURRENCY</Text>
                <View style={styles.pickerRow}>
                  <Text style={[styles.input, { color: colors.onSurface, flex: 1 }]}>₹</Text>
                  <ChevronDown color={colors.onSurfaceVariant} size={20} />
                </View>
              </View>

              {/* Fake Slider */}
              <View style={[styles.fieldGroup, { marginBottom: spacing.xl }]}>
                <View style={styles.rowBetween}>
                  <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant }]}>MONTHLY BUDGET</Text>
                  <Text style={[styles.input, { color: colors.onSurface }]}>₹ 25,000</Text>
                </View>
                
                <View style={[styles.sliderTrack, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <View style={[styles.sliderFill, { backgroundColor: colors.primary, width: '40%' }]} />
                  <View style={[styles.sliderThumb, { backgroundColor: colors.primary, borderColor: colors.primary }]} />
                </View>
                <View style={styles.rowBetween}>
                  <Text style={[styles.sliderMinMax, { color: colors.onSurfaceVariant }]}>₹ 0</Text>
                  <Text style={[styles.sliderMinMax, { color: colors.onSurfaceVariant }]}>₹ 1,00,000+</Text>
                </View>
              </View>

              {/* Categories */}
              <View style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, marginBottom: spacing.md }]}>CATEGORY</Text>
                <View style={styles.categoryRow}>
                  {categories.map((cat, i) => (
                    <TouchableOpacity key={i} style={[styles.categoryPill, { backgroundColor: colors.surfaceContainerLow }]}>
                      <Text style={[styles.categoryPillText, { color: colors.onSurfaceVariant }]}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={{ paddingHorizontal: spacing.xl }}>
              {/* Share Block */}
              <View style={styles.shareOuter}>
                <View style={[styles.shareHeaderRow, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg, padding: spacing.lg }]}>
                  <View style={[styles.mintBox, { backgroundColor: colors.primary, borderRadius: borderRadius.md }]}>
                    <LinkIcon color={colors.background} size={24} />
                  </View>
                  <View style={styles.shareTextCol}>
                    <Text style={[styles.shareTitle, { color: colors.onSurface }]}>Share Group Link</Text>
                    <Text style={[styles.shareSub, { color: colors.onSurfaceVariant }]}>Anyone with this link can join</Text>
                  </View>
                  <Share color={colors.onSurface} size={20} />
                </View>
                <View style={[styles.urlRow, { marginTop: spacing.md }]}>
                  <View style={[styles.urlBox, { backgroundColor: colors.surfaceContainerHigh, borderRadius: borderRadius.lg }]}>
                    <Text style={[styles.urlText, { color: colors.onSurfaceVariant }]} numberOfLines={1}>obsidian.fin/join/gr_4829...</Text>
                  </View>
                  <QrCode color={colors.onSurface} size={24} style={{ marginLeft: spacing.lg }} />
                </View>
              </View>

              {/* Selected Members */}
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, marginBottom: spacing.md }]}>SELECTED MEMBERS</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectedScroll}>
                <View style={styles.selectedMember}>
                  <View style={[styles.selectedAvatar, { borderColor: colors.primary, borderWidth: 2 }]} />
                  <View style={[styles.removeBadge, { backgroundColor: colors.background }]}><X color={colors.onSurfaceVariant} size={10} /></View>
                  <Text style={[styles.selectedName, { color: colors.onSurface }]}>Arjun K.</Text>
                </View>
                <View style={styles.selectedMember}>
                  <View style={[styles.selectedAvatar, { borderColor: colors.primary, borderWidth: 2 }]} />
                  <View style={[styles.removeBadge, { backgroundColor: colors.background }]}><X color={colors.onSurfaceVariant} size={10} /></View>
                  <Text style={[styles.selectedName, { color: colors.onSurface }]}>Priya S.</Text>
                </View>
                <View style={styles.selectedMember}>
                  <View style={[styles.selectedAvatar, { borderColor: colors.onSurfaceVariant, borderWidth: 1, borderStyle: 'dashed' }]}>
                    <UserPlus color={colors.onSurfaceVariant} size={20} />
                  </View>
                  <Text style={[styles.selectedName, { color: colors.onSurfaceVariant }]}>Add More</Text>
                </View>
              </ScrollView>

              {/* Search */}
              <View style={[styles.searchBox, { backgroundColor: colors.surfaceContainerLow, borderRadius: borderRadius.lg }]}>
                <Search color={colors.onSurfaceVariant} size={20} />
                <TextInput 
                  style={[styles.searchInput, { color: colors.onSurface }]}
                  placeholder="Search contacts or ID..."
                  placeholderTextColor={colors.onSurfaceVariant}
                />
              </View>

              {/* Suggested Contacts */}
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceVariant, marginBottom: spacing.lg, marginTop: spacing.xl }]}>SUGGESTED CONTACTS</Text>
              {suggestedContacts.map((contact, i) => (
                <View key={i} style={[styles.contactRow, { marginBottom: spacing.xl }]}>
                  <View style={[styles.contactAvatar, { backgroundColor: colors.surfaceContainerHigh }]} />
                  <View style={styles.contactInfo}>
                    <Text style={[styles.contactName, { color: colors.onSurface }]}>{contact.name}</Text>
                    <Text style={[styles.contactHandle, { color: colors.onSurfaceVariant }]}>{contact.handle}</Text>
                  </View>
                  <TouchableOpacity style={[
                    styles.contactActionBtn,
                    { 
                      borderColor: contact.action === 'Add' ? colors.primary : 'transparent',
                      borderWidth: contact.action === 'Add' ? 1 : 0,
                      backgroundColor: contact.action === 'Invite' ? colors.primary : 'transparent',
                      borderRadius: borderRadius.md
                    }
                  ]}>
                    <Text style={{ 
                      color: contact.action === 'Invite' ? colors.background : colors.primary,
                      fontFamily: 'Manrope_700Bold', fontSize: 14 
                    }}>{contact.action}</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Info Note */}
              <View style={styles.inviteNoteOuter}>
                <Text style={[styles.inviteNoteText, { color: colors.onSurfaceVariant }]}>
                  ⓘ Inviting members allows you to split bills, track shared expenses, and settle balances instantly in <Text style={{fontWeight: 'bold'}}>₹ (INR)</Text>. New users will receive an SMS invitation.
                </Text>
              </View>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky Bottom Button */}
      <View style={[styles.bottomBtnOuter, { paddingHorizontal: spacing.xl, paddingBottom: spacing.xl }]}>
        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: colors.primary, borderRadius: borderRadius.xl }]}
          onPress={() => activeTab === 'setup' ? setActiveTab('invite') : router.back()}
        >
          <Text style={[styles.primaryButtonText, { color: colors.background }]}>
            {activeTab === 'setup' ? 'Next →' : 'Create Group'}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
  },
  headerAction: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 4,
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  tabText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
  },
  uploadSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  uploadCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  uploadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 11,
    letterSpacing: 1.5,
  },
  fieldGroup: {},
  fieldLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  input: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 20,
    padding: 0,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    marginVertical: 16,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 5,
    position: 'absolute',
    top: -7,
    left: '38%',
    shadowColor: '#73FFE3',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  sliderMinMax: {
    fontSize: 10,
    fontFamily: 'Manrope_400Regular',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryPillText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
  },
  shareOuter: {
    marginBottom: 32,
  },
  shareHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mintBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  shareTextCol: {
    flex: 1,
  },
  shareTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  shareSub: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlBox: {
    flex: 1,
    padding: 16,
  },
  urlText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
  },
  selectedScroll: {
    marginBottom: 32,
  },
  selectedMember: {
    alignItems: 'center',
    marginRight: 24,
    position: 'relative',
  },
  selectedAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 11,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    padding: 0,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    marginBottom: 2,
  },
  contactHandle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
  },
  contactActionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  inviteNoteOuter: {
    marginTop: 16,
  },
  inviteNoteText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  bottomBtnOuter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  primaryButton: {
    padding: 20,
    alignItems: 'center',
    shadowColor: '#73FFE3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  primaryButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
  },
});
