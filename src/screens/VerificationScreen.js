import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { appColors } from '../constants/appColors';
import { Text, Space, Button } from '../components';

export const VerificationScreen = ({
  email = 'abc@gmail.com',
  onNavigateBack,
  onVerifySuccess,
}) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(20);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Tự động focus ô đầu tiên khi mở trang
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRefs[0]?.current?.focus();
    }, 300);
    return () => clearTimeout(focusTimer);
  }, []);

  const handleCodeChange = (text, index) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];

    // Hỗ trợ trường hợp paste cả mã OTP 4 số
    if (cleanText.length > 1) {
      const chars = cleanText.split('').slice(0, 4);
      chars.forEach((char, i) => {
        if (index + i < 4) {
          newCode[index + i] = char;
        }
      });
      setCode(newCode);
      const nextFocus = Math.min(index + chars.length, 3);
      inputRefs[nextFocus]?.current?.focus();
      setFocusedIndex(nextFocus);
      return;
    }

    newCode[index] = cleanText;
    setCode(newCode);

    // Tự động nhảy qua ô tiếp theo khi nhập số
    if (cleanText && index < 3) {
      inputRefs[index + 1]?.current?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs[index - 1]?.current?.focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(20);
      setCode(['', '', '', '']);
      inputRefs[0]?.current?.focus();
      setFocusedIndex(0);
    }
  };

  const handleContinue = () => {
    const fullCode = code.join('');
    if (onVerifySuccess) {
      onVerifySuccess(fullCode);
    }
  };

  const formattedTimer = timer < 10 ? `00:0${timer}` : `00:${timer}`;
  const isFilledAll = code.every((digit) => digit !== '');

  // Format email hiển thị dạng bảo mật nhẹ hoặc nguyên bản
  const maskEmail = (rawEmail) => {
    if (!rawEmail) return 'your email';
    const parts = rawEmail.split('@');
    if (parts.length < 2) return rawEmail;
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 2) return `${name}***@${domain}`;
    return `${name.slice(0, 2)}***${name.slice(-1)}@${domain}`;
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
          <Text text="Verification" size={26} weight="700" color={appColors.text} />

          <Space height={12} />

          {/* Subtitle / Description */}
          <Text
            text={`We’ve send you the verification\ncode on ${email || 'abc@gmail.com'}`}
            size={15}
            color={appColors.textSecondary}
            style={styles.descText}
          />

          <Space height={32} />

          {/* 4 OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {code.map((digit, index) => {
              const isFocused = focusedIndex === index;
              const isFilled = Boolean(digit);

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  onPress={() => {
                    inputRefs[index]?.current?.focus();
                    setFocusedIndex(index);
                  }}
                  style={[
                    styles.otpBox,
                    isFocused && styles.otpBoxFocused,
                    isFilled && styles.otpBoxFilled,
                  ]}
                >
                  <TextInput
                    ref={inputRefs[index]}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    placeholder="-"
                    placeholderTextColor={appColors.gray2 || '#DADADA'}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onFocus={() => setFocusedIndex(index)}
                    selectTextOnFocus
                    textAlign="center"
                    cursorColor={appColors.primary}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Space height={36} />

          {/* Continue Button */}
          <Button
            text="CONTINUE"
            onPress={handleContinue}
            disabled={!isFilledAll}
            style={!isFilledAll ? styles.btnDisabled : undefined}
            icon={<Text text="  ➜" size={18} color={appColors.white} />}
            iconFlex="right"
          />

          <Space height={28} />

          {/* Resend Section */}
          <View style={styles.resendContainer}>
            <Text text="Re-send code in  " size={15} color={appColors.text} />
            {timer > 0 ? (
              <Text
                text={formattedTimer}
                size={15}
                weight="600"
                color={appColors.primary}
              />
            ) : (
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text
                  text="Re-send"
                  size={15}
                  weight="700"
                  color={appColors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  otpBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E4DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  otpBoxFocused: {
    borderColor: appColors.primary,
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  otpBoxFilled: {
    borderColor: appColors.primary,
    backgroundColor: '#FAFAFF',
  },
  otpInput: {
    fontSize: 24,
    fontWeight: '700',
    color: appColors.text,
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  btnDisabled: {
    opacity: 0.65,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VerificationScreen;

