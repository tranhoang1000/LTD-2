import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { appColors } from '../constants/appColors';
import { Text, Space, Button, Input } from '../components';

export const SignUpScreen = ({ onNavigateToLogin, onSignUpSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.white} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={onNavigateToLogin}
          style={styles.backBtn}
        >
          <Text text="←" size={24} color={appColors.text} />
        </TouchableOpacity>

        <Space height={12} />

        {/* Title */}
        <Text text="Sign up" size={26} weight="700" color={appColors.text} />

        <Space height={20} />

        {/* Inputs */}
        <Input
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
          prefix={
            <Image
              source={require('../../img/Profile.png')}
              style={styles.inputIcon}
              resizeMode="contain"
            />
          }
        />

        <Space height={16} />

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

        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          isPassword
          prefix={
            <Image
              source={require('../../img/Password_icon.png')}
              style={styles.inputIcon}
              resizeMode="contain"
            />
          }
        />

        <Space height={28} />

        {/* Sign Up Button */}
        <Button
          text="SIGN UP"
          onPress={() => onSignUpSuccess && onSignUpSuccess(email || 'abc@gmail.com')}
          icon={<Text text="  ➜" size={18} color={appColors.white} />}
          iconFlex="right"
        />

        <Space height={22} />

        {/* OR Divider */}
        <View style={styles.orSection}>
          <Text text="OR" size={16} weight="600" color={appColors.textSecondary} />
        </View>

        <Space height={18} />

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

        <Space height={28} />

        {/* Bottom Sign In Link */}
        <View style={styles.bottomRow}>
          <Text text="Already have an account? " size={15} color={appColors.text} />
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text text="Sign in" size={15} weight="600" color={appColors.primary} />
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
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 6,
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

export default SignUpScreen;
