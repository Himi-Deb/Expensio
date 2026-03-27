import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useTheme } from '../src/theme/theme';
import { useRouter } from 'expo-router';
import { ShieldCheck, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';

const { height } = Dimensions.get('window');

export default function SettleUpScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();
  
  // Animation for the bottom sheet slide up effect
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 20,
        stiffness: 90,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const closeBottomSheet = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      router.back();
    });
  };

  return (
    <View style={styles.container}>
      {/* Dark semi-transparent backdrop */}
      <Animated.View style={[styles.backdrop, { opacity }]}>
        <TouchableOpacity style={styles.backdropPress} onPress={closeBottomSheet} activeOpacity={1} />
      </Animated.View>

      {/* Bottom Sheet Modal */}
      <Animated.View style={[
        styles.sheet, 
        { 
          backgroundColor: colors.surfaceContainerLow,
          borderTopLeftRadius: borderRadius.xxl,
          borderTopRightRadius: borderRadius.xxl,
          transform: [{ translateY }]
        }
      ]}>
        <SafeAreaView edges={['bottom']} style={{ width: '100%' }}>
          {/* Drag Handle */}
          <View style={styles.dragHandleOuter}>
            <View style={[styles.dragHandle, { backgroundColor: colors.surfaceContainerHighest }]} />
          </View>

          <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.xl, alignItems: 'center' }}>
            
            <Text style={[styles.subText, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>Settling balance with</Text>
            <Text style={[styles.nameText, { color: colors.onSurface, marginBottom: 40 }]}>Jessica Smith</Text>

            <Text style={[styles.amountLabel, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>AMOUNT DUE</Text>
            <Text style={[styles.amountValue, { color: colors.primary, marginBottom: 40 }]}>₹450.00</Text>

            <View style={[styles.secureRow, { marginBottom: 32 }]}>
              <ShieldCheck color={colors.primary} size={16} />
              <Text style={[styles.secureText, { color: colors.onSurfaceVariant }]}>Confirm UPI Payment</Text>
            </View>

            {/* Pay Button */}
            <TouchableOpacity 
              style={[
                styles.payButton, 
                { backgroundColor: colors.primary, borderRadius: borderRadius.xl }
              ]}
              onPress={closeBottomSheet}
            >
              <Text style={[styles.payText, { color: colors.background }]}>Pay via UPI </Text>
              <Zap color={colors.background} size={18} fill={colors.background} />
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity onPress={closeBottomSheet} style={styles.cancelButton}>
              <Text style={[styles.cancelText, { color: colors.onSurface }]}>Cancel</Text>
            </TouchableOpacity>
            
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  backdropPress: {
    flex: 1,
  },
  sheet: {
    width: '100%',
    minHeight: 400,
  },
  dragHandleOuter: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
  },
  nameText: {
    fontSize: 24,
    fontFamily: 'Manrope_700Bold',
  },
  amountLabel: {
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
    letterSpacing: 2,
  },
  amountValue: {
    fontSize: 56,
    fontFamily: 'Manrope_700Bold',
    letterSpacing: -2,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secureText: {
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
  },
  payButton: {
    width: '100%',
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  payText: {
    fontSize: 18,
    fontFamily: 'Manrope_700Bold',
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
  },
});
