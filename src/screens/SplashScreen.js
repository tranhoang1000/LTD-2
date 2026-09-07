import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import { appColors } from '../constants/appColors';

const { width } = Dimensions.get('window');

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Decorative Background Circles */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      {/* Main Branding Logo Image */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../img/logo_onboarding.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Loading Indicator */}
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color={appColors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCircle: {
    position: 'absolute',
    top: -width * 0.4,
    right: -width * 0.3,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: '#EEF0FF',
    opacity: 0.7,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -width * 0.5,
    left: -width * 0.3,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: '#F5F6FF',
    opacity: 0.7,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: width * 0.65,
    height: 80,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
});

export default SplashScreen;
