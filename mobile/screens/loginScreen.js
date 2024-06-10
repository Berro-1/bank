import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  Button,
  TextInput,
  Text,
  Provider as PaperProvider,
  DefaultTheme,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from 'react-native-dotenv';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom dark theme configuration
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0f969c",
    accent: "#6da5c0",
    background: "#05161a",
    surface: "#072e33",
    text: "#ffffff",
    disabled: "#294d61",
    placeholder: "#6da5c0",
  },
};
const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  // Ensure the navigation prop is destructured here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLoginPress = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token, user } = response.data;
      await AsyncStorage.setItem("jwtToken", token);
      console.log("Login successful:", user);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          width,
          backgroundColor: theme.colors.background,
        }}
      >
        <Animatable.View animation="fadeInUpBig" duration={800} style={styles.loginBox}>
          <Text style={styles.title}>Login</Text>
          <Animatable.View animation="fadeInLeft" delay={300} style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={20} color={theme.colors.accent} />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode="flat"
              underlineColor="transparent"
              dense
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.accent } }}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInRight" delay={600} style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={theme.colors.accent} />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode="flat"
              secureTextEntry={!showPassword}
              underlineColor="transparent"
              dense
              right={<TextInput.Icon name={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
              theme={{ colors: { text: theme.colors.text, primary: theme.colors.accent } }}
            />
          </Animatable.View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Animatable.View animation="bounceIn" delay={900} style={styles.buttonContainer}>
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
      </KeyboardAwareScrollView>
    </PaperProvider>);
};

const styles = StyleSheet.create({
  loginBox: {
    width: "90%",
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    elevation: 15,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: theme.colors.text,
    fontWeight: 'bold',
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.accent,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "transparent",
    color: theme.colors.text,
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: 12,
  },
  button: {
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default LoginScreen;
