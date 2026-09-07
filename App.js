import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'onboarding' | 'login' | 'signup' | 'verification' | 'resetPassword' | 'home' | 'menu'
  const [userEmail, setUserEmail] = useState('abc@gmail.com');
  const [previousScreen, setPreviousScreen] = useState('login');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return (
          <OnboardingScreen
            onFinish={() => setCurrentScreen('login')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onNavigateToSignUp={() => setCurrentScreen('signup')}
            onNavigateToForgotPassword={() => setCurrentScreen('resetPassword')}
            onLoginSuccess={() => setCurrentScreen('home')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onNavigateToLogin={() => setCurrentScreen('login')}
            onSignUpSuccess={(email) => {
              if (email) setUserEmail(email);
              setPreviousScreen('signup');
              setCurrentScreen('verification');
            }}
          />
        );
      case 'resetPassword':
        return (
          <ResetPasswordScreen
            onNavigateBack={() => setCurrentScreen('login')}
            onSubmitSuccess={(email) => {
              if (email) setUserEmail(email);
              setPreviousScreen('resetPassword');
              setCurrentScreen('verification');
            }}
          />
        );
      case 'verification':
        return (
          <VerificationScreen
            email={userEmail}
            onNavigateBack={() => setCurrentScreen(previousScreen || 'login')}
            onVerifySuccess={(code) => {
              console.log('Verified OTP:', code);
              setCurrentScreen('home');
            }}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onOpenDrawer={() => setCurrentScreen('menu')}
            onNotificationPress={() => console.log('Open Notifications')}
            onEventPress={(event) => console.log('Selected Event:', event)}
          />
        );
      case 'menu':
        return (
          <MenuScreen
            onNavigateBack={() => setCurrentScreen('home')}
            onNavigateTo={(screen) => {
              if (screen === 'logout') setCurrentScreen('login');
              else console.log('Navigate to:', screen);
            }}
          />
        );
      default:
        return <LoginScreen onNavigateToSignUp={() => setCurrentScreen('signup')} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
