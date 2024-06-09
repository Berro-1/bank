import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { Button, TextInput, Text, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0f969c', 
    accent: '#6da5c0',
    background: '#05161a',
    surface: '#072e33',
    text: '#ffffff',
    disabled: '#294d61',
    placeholder: '#6da5c0',
  },
};

const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignupPress = () => {
    console.log('Signup attempt with:', { fullName, email, password, confirmPassword, address, phoneNumber });
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.container}>
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          style={styles.signupBox}
        >
          <Text style={styles.title}>Sign Up</Text>
          <Animatable.View
            animation="fadeInLeft"
            delay={300}
            style={{ width: "100%" }}
          >
            <TextInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              mode="flat"
              underlineColor={theme.colors.accent}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode="flat"
              underlineColor={theme.colors.accent}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="flat"
              underlineCityColor={theme.colors.accent}
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
              mode="flat"
              underlineCityColor={theme.colors.accent}
            />
            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
              mode="flat"
              underlineCityColor={theme.colors.accent}
            />
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              mode="flat"
              underlineCityColor={theme.colors.accent}
            />
          </Animatable.View>
  <Animatable.View 
            animation="bounceIn"
            delay={900}
            style={{ width: '100%' }}
          >

          <Button
            mode="contained"
            onPress={handleSignupPress}
            style={styles.button}
            labelStyle={{ color: theme.colors.text }}
          >
            Sign Up
          </Button>
          </Animatable.View>
        </Animatable.View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  signupBox: {
    width: '90%',
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: theme.colors.text,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  button: {
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
  },
});

export default SignupScreen;
