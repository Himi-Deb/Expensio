import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../src/theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useRef, useState, useEffect } from 'react';

const AUTO_ADVANCE_MS = 5000;

// ─── Slide Data ───────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 'track',
    title: 'Track Spending',
    body: 'See where your money goes,\ncategorize, set budget and much more.',
    image: require('../Expensio/Onboardin1-Track-Spending.png'),
  },
  {
    id: 'split',
    title: 'Split Bills',
    body: 'Split money, easily track group spending\nand settle up without any tension.',
    image: require('../Expensio/Onboardin2-Splitbills.png'),
  },
  {
    id: 'personalize',
    title: 'Personalize',
    body: 'Set Goals, tracks assets, build wealth all\nfrom one app.',
    image: require('../Expensio/Onboarding3-Personalize.png'),
  },
];

type Slide = (typeof SLIDES)[0];

// ─── Slide Item ───────────────────────────────────────────────────────

function SlideItem({
  item,
  slideWidth,
  imageHeight,
  colors,
  borderRadius,
  spacing,
}: {
  item: Slide;
  slideWidth: number;
  imageHeight: number;
  colors: ReturnType<typeof useTheme>['colors'];
  borderRadius: ReturnType<typeof useTheme>['borderRadius'];
  spacing: ReturnType<typeof useTheme>['spacing'];
}) {
  return (
    <View
      style={{
        width: slideWidth,
        flex: 1,
        paddingHorizontal: spacing.xl,
        paddingTop: 8,
      }}
    >
      {/* Title — Top */}
      <Text
        style={{
          color: colors.onSurface,
          fontFamily: 'Manrope_700Bold',
          fontSize: 34,
          letterSpacing: -1,
          textAlign: 'center',
          marginBottom: 16, // some space just in case
        }}
      >
        {item.title}
      </Text>

      {/* Flex spacer — pushes everything below it (image + body) strictly to the bottom */}
      <View style={{ flex: 1 }} />

      {/* Grouped Image & Text, natively aligned to bottom */}
      <View style={{ justifyContent: 'flex-end' }}>
        {/* Illustration (No background color) */}
        <View
          style={{
            width: '100%',
            height: imageHeight,
            overflow: 'hidden',
            marginBottom: 28,
          }}
        >
          <Image
            source={item.image}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>

        {/* Body text */}
        <Text
          style={{
            color: colors.onSurface,
            fontFamily: 'Manrope_400Regular',
            fontSize: 16,
            lineHeight: 24,
            textAlign: 'center',
          }}
        >
          {item.body}
        </Text>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const { colors, spacing, borderRadius } = useTheme();
  const router = useRouter();

  // 👇 Reactive: updates on resize / orientation change / web window resize
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // Responsive layout: cap content width on large screens (web/tablet)
  const MAX_CONTENT_WIDTH = 480;
  const isWide = windowWidth > MAX_CONTENT_WIDTH;
  const slideWidth = isWide ? MAX_CONTENT_WIDTH : windowWidth;

  // Reserve space for indicator bar + top margin + bottom CTA block
  const RESERVED_HEIGHT = 4 + 28 + 28 + 130 + 40; // indicators + margins + CTA
  const imageHeight = Math.max(180, (windowHeight - RESERVED_HEIGHT) * 0.55);

  const flatListRef = useRef<FlatList<Slide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // scrollToIndex uses the current slideWidth; wrap in a callback to avoid stale refs
  const scrollToIdx = (idx: number) => {
    flatListRef.current?.scrollToIndex({ index: idx, animated: true });
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  };

  // ── Auto-advance ───────────────────────────────────────────────────
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const next = (activeIndexRef.current + 1) % SLIDES.length;
      scrollToIdx(next);
      timerRef.current = null;
      resetTimer();
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-snap to active slide on resize so content doesn't get stuck mid-scroll
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: activeIndexRef.current,
      animated: false,
    });
  }, [windowWidth]);

  // ── Viewability (manual swipe) ─────────────────────────────────────
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        activeIndexRef.current = viewableItems[0].index;
        setActiveIndex(viewableItems[0].index);
        resetTimer();
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // ── Navigation ─────────────────────────────────────────────────────
  const goNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      scrollToIdx(activeIndex + 1);
      resetTimer();
    } else {
      router.replace('/register');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

      {/* ── Center content on wide screens ── */}
      <View style={[styles.inner, isWide && styles.innerWide]}>

        {/* ── Fixed: Progress Indicators ── */}
        <View
          style={[
            styles.progressRow,
            { paddingHorizontal: spacing.xl, marginTop: spacing.lg },
          ]}
        >
          {SLIDES.map((_, idx) => (
            <View
              key={`indicator-${idx}`}
              style={[
                styles.progressBar,
                { backgroundColor: idx <= activeIndex ? '#FFFFFF' : '#242424' },
              ]}
            />
          ))}
        </View>

        {/* ── Sliding Content ── */}
        <FlatList
          ref={flatListRef}
          data={SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          // getItemLayout is critical for scrollToIndex to work correctly
          getItemLayout={(_, index) => ({
            length: slideWidth,
            offset: slideWidth * index,
            index,
          })}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          style={{ marginTop: 36 }} // increased by 8px
          // Clip so items outside viewport don't overflow on web
          contentContainerStyle={{ overflow: 'hidden' } as never}
          renderItem={({ item }) => (
            <SlideItem
              item={item}
              slideWidth={slideWidth}
              imageHeight={imageHeight}
              colors={colors}
              borderRadius={borderRadius}
              spacing={spacing}
            />
          )}
        />

        {/* ── Fixed: Bottom CTA ── */}
        <View
          style={{
            paddingHorizontal: spacing.xl,
            paddingBottom: 40,
            paddingTop: 16,
          }}
        >
          <TouchableOpacity
            onPress={goNext}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#73FFE3',
              borderRadius: borderRadius.lg,
              paddingVertical: 18,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Manrope_600SemiBold',
                fontSize: 18,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => router.replace('/sign-in')}
          >
            <Text
              style={{
                color: '#ADAAAA',
                fontFamily: 'Manrope_400Regular',
                fontSize: 14,
              }}
            >
              Already have an account with us?{' '}
              <Text style={{ color: '#73FFE3', fontFamily: 'Manrope_500Medium' }}>
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // On web, center the card horizontally
    alignItems: 'center',
    justifyContent: 'center',
  },
  // On narrow screens the inner view fills the full width
  inner: {
    flex: 1,
    width: '100%',
  },
  // On wide screens cap at MAX_CONTENT_WIDTH and show as a card
  innerWide: {
    maxWidth: 480,
    width: 480,
    alignSelf: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 4,
  },
  progressBar: {
    flex: 1,
    height: '100%',
    borderRadius: 2,
  },
});
