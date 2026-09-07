import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { appColors } from '../constants/appColors';
import { Text, Space, Button, Input } from '../components';

export const LoginScreen = ({
  onNavigateToSignUp,
  onNavigateToForgotPassword,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.white} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Space height={16} />

        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('../../img/logo_onboarding.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Space height={20} />

        {/* Title */}
        <Text text="Sign in" size={26} weight="700" color={appColors.text} />

        <Space height={20} />

        {/* Inputs */}
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="abc@email.com"
          type="email-address"
          allowClear
          prefix={
            <Image
              source={require('../../img/Mail_icon.png')}
              style={styles.inputIcon}
              resizeMode="contain"
            />
          }
        />

        <Space height={16} />

        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          isPassword
          prefix={
            <Image
              source={require('../../img/Password_icon.png')}
              style={styles.inputIcon}
              resizeMode="contain"
            />
          }
        />

        <Space height={16} />

        {/* Remember Me & Forgot Password */}
        <View style={styles.rowBetween}>
          <View style={styles.rememberRow}>
            <Switch
              trackColor={{ false: appColors.gray, true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onValueChange={setIsRemember}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <Text text="Remember Me" size={14} color={appColors.text} />
          </View>

          <TouchableOpacity
            onPress={() => onNavigateToForgotPassword && onNavigateToForgotPassword()}
            activeOpacity={0.7}
          >
            <Text text="Forgot Password?" size={14} color={appColors.text} />
          </TouchableOpacity>
        </View>

        <Space height={30} />

        {/* Sign In Button */}
        <Button
          text="SIGN IN"
          onPress={() => onLoginSuccess && onLoginSuccess()}
          icon={<Text text="  ➜" size={18} color={appColors.white} />}
          iconFlex="right"
        />

        <Space height={24} />

        {/* OR Divider */}
        <View style={styles.orSection}>
          <Text text="OR" size={16} weight="600" color={appColors.textSecondary} />
        </View>

        <Space height={20} />

        {/* Social Buttons */}
        <TouchableOpacity style={styles.socialBtn}>
          <Image
            source={require('../../img/logo_gg.png')}
            style={styles.socialIconImage}
            resizeMode="contain"
          />
          <Text text="Login with Google" size={15} color={appColors.text} weight="500" />
        </TouchableOpacity>

        <Space height={14} />

        <TouchableOpacity style={styles.socialBtn}>
          <Image
            source={require('../../img/logo_fb.png')}
            style={styles.socialIconImage}
            resizeMode="contain"
          />
          <Text text="Login with Facebook" size={15} color={appColors.text} weight="500" />
        </TouchableOpacity>

        <Space height={30} />

        {/* Bottom Sign Up Link */}
        <View style={styles.bottomRow}>
          <Text text="Don’t have an account? " size={15} color={appColors.text} />
          <TouchableOpacity onPress={onNavigateToSignUp}>
            <Text text="Sign up" size={15} weight="600" color={appColors.primary} />
          </TouchableOpacity>
        </View>

        <Space height={20} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  logoImage: {
    width: 180,
    height: 60,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -6,
  },
  orSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 14,
    backgroundColor: appColors.white,
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  socialIconImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  inputIcon: {
    width: 20,
    height: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
