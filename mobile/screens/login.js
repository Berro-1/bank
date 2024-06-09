import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { Button, TextInput, Text, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

// Custom dark theme configuration
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0f969c',  // Light teal for primary actions
    accent: '#6da5c0',   // Sky blue for secondary elements and accents
    background: '#05161a', // Darkest blue as the background for the whole app
    surface: '#072e33',  // Dark blue for card-like surfaces
    text: '#ffffff',     // White text for contrast against dark backgrounds
    disabled: '#294d61', // Medium blue for disabled elements
    placeholder: '#6da5c0', // Lighter text for placeholders to ensure readability
  },
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    console.log('Login attempt with:', email, password);
    // Placeholder for further actions, e.g., navigation or API call
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Animatable.View 
          animation="fadeInUp"
          duration={800}
          style={styles.loginBox}
        >
          <Text style={styles.title}>Sign In</Text>
          <Animatable.View 
            animation="fadeInLeft" 
            delay={300}
            style={{ width: '100%' }}
          >
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode="flat"
              underlineColor={theme.colors.accent}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.accent } }}
            />
          </Animatable.View>
          <Animatable.View 
            animation="fadeInRight" 
            delay={600}
            style={{ width: '100%' }}
          >
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
          style={styles.input}
          mode="flat"
          secureTextEntry
          underlineColor={theme.colors.accent}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.accent } }}
            />
          </Animatable.View>
          <Animatable.View 
            animation="bounceIn"
            delay={900}
            style={{ width: '100%' }}
          >
            <Button
              mode="contained"
              onPress={handleLoginPress}
              style={styles.button}
              labelStyle={{ color: theme.colors.text }}
            >
              Log In
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
  loginBox: {
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

export default LoginScreen;
