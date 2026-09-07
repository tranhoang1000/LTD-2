import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { appColors } from '../constants/appColors';
import { Text, Space } from '../components';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Explore Upcoming and\nNearby Events',
    description:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
    image: require('../../img/onboarding1.png'),
    illustrationType: 'image',
  },
  {
    id: '2',
    title: 'Web Almost Event To\nLook Up More Events',
    description:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
    image: require('../../img/onboarding2.png'),
    illustrationType: 'calendar',
  },
  {
    id: '3',
    title: 'To Look Up More Events\nor Activities Nearby By Map',
    description:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
    image: require('../../img/onboarding3.png'),
    illustrationType: 'location',
  },
];

export const OnboardingScreen = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      if (onFinish) {
        onFinish();
      }
    }
  };

  const handleSkip = () => {
    if (onFinish) {
      onFinish();
    } else {
      flatListRef.current?.scrollToIndex({
        index: onboardingData.length - 1,
        animated: true,
      });
    }
  };

  const renderIllustration = (item) => {
    if (item.image) {
      return (
        <Image
          source={item.image}
          style={styles.mockupImage}
          resizeMode="contain"
        />
      );
    }

    switch (item.illustrationType) {
      case 'calendar':
        return (
          <View style={styles.artCard}>
            <View style={styles.calendarHeader}>
              <View style={styles.calendarPin} />
              <View style={styles.calendarPin} />
            </View>
            <View style={styles.calendarGrid}>
              {[...Array(9)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.calendarDot,
                    i === 4 && styles.calendarDotActive,
                  ]}
                />
              ))}
            </View>
            <Space height={12} />
            <View style={styles.artLineLong} />
          </View>
        );
      case 'location':
        return (
          <View style={styles.artCard}>
            <View style={styles.mapPinOuter}>
              <View style={styles.mapPinInner} />
            </View>
            <Space height={16} />
            <View style={styles.artLineLong} />
            <View style={styles.artLineShort} />
          </View>
        );
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {/* Top Hero Art / Mockup Section */}
        <View style={styles.topSection}>
          <View style={styles.bgDecorCircle} />
          <View style={styles.illustrationWrapper}>
            {renderIllustration(item)}
          </View>
        </View>

        {/* Bottom Curved Content Card */}
        <View style={styles.bottomCard}>
          <Text
            text={item.title}
            size={22}
            weight="700"
            color={appColors.white}
            style={styles.title}
          />
          <Space height={14} />
          <Text
            text={item.description}
            size={14}
            color={appColors.textLight}
            style={styles.description}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Onboarding Sliders */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
      />

      {/* Floating Bottom Control Bar */}
      <View style={styles.bottomControls}>
        {/* Skip Button */}
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
          <Text text="Skip" size={16} weight="500" color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Next / Get Started Button */}
        <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
          <Text
            text={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            size={16}
            weight="600"
            color={appColors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  slide: {
    width: width,
    height: height,
  },
  topSection: {
    height: height * 0.54,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
    position: 'relative',
    paddingTop: 30,
  },
  bgDecorCircle: {
    position: 'absolute',
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: '#EEF0FF',
  },
  illustrationWrapper: {
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mockupImage: {
    width: width * 0.72,
    height: height * 0.44,
  },
  artCard: {
    width: width * 0.6,
    height: height * 0.26,
    backgroundColor: appColors.white,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  artLineShort: {
    width: '40%',
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E4E7FF',
  },
  artLineLong: {
    width: '85%',
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E4E7FF',
    marginBottom: 6,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 14,
  },
  calendarPin: {
    width: 10,
    height: 14,
    borderRadius: 4,
    backgroundColor: appColors.primary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 100,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  calendarDot: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#EEF2FF',
    marginVertical: 4,
  },
  calendarDotActive: {
    backgroundColor: appColors.primary,
  },
  mapPinOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPinInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: appColors.primary,
  },
  bottomCard: {
    height: height * 0.46,
    backgroundColor: appColors.primary,
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
    paddingHorizontal: 36,
    paddingTop: 36,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    lineHeight: 30,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.85,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  skipBtn: {
    padding: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: appColors.white,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextBtn: {
    padding: 8,
  },
});

export default OnboardingScreen;
