import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { appColors } from '../constants/appColors';
import { Text, Space, Button, Input } from '../components';

export const ResetPasswordScreen = ({
  onNavigateBack,
  onSubmitSuccess,
}) => {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    if (onSubmitSuccess) {
      onSubmitSuccess(email || 'abc@gmail.com');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={appColors.white} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={onNavigateBack}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Text text="←" size={24} color={appColors.text} />
          </TouchableOpacity>

          <Space height={20} />

          {/* Title */}
          <Text text="Reset Password" size={26} weight="700" color={appColors.text} />

          <Space height={12} />

          {/* Subtitle / Description */}
          <Text
            text="Please enter your email address to request a password reset"
            size={15}
            color={appColors.textSecondary}
            style={styles.descText}
          />

          <Space height={28} />

          {/* Email Input */}
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

          <Space height={36} />

          {/* Send Button */}
          <Button
            text="SEND"
            onPress={handleSend}
            icon={<Text text="  ➜" size={18} color={appColors.white} />}
            iconFlex="right"
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 6,
  },
  descText: {
    lineHeight: 23,
  },
  inputIcon: {
    width: 20,
    height: 20,
  },
});

export default ResetPasswordScreen;
