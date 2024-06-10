import React, { useState } from "react";
import {
  SafeAreaView,
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

// Custom dark theme configuration
const theme = {
  ...DefaultTheme,
  roundness: 2,
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

  const handleLoginPress = () => {
    console.log("Login attempt with:", email, password);
    navigation.navigate("Home"); // This uses the navigation prop
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
          width: width,
        }}
      >
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          style={styles.loginBox}
        >
          <Text style={styles.title}>Log In</Text>
          <Animatable.View
            animation="fadeInLeft"
            delay={300}
            style={{ width: "100%" }}
          >
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode="flat"
              underlineColor={theme.colors.accent}
              theme={{
                colors: {
                  text: theme.colors.text,
                  primary: theme.colors.accent,
                },
              }}
            />
          </Animatable.View>
          <Animatable.View
            animation="fadeInRight"
            delay={600}
            style={{ width: "100%" }}
          >
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode="flat"
              secureTextEntry
              underlineColor={theme.colors.accent}
              theme={{
                colors: {
                  text: theme.colors.text,
                  primary: theme.colors.accent,
                },
              }}
            />
          </Animatable.View>
          <Animatable.View
            animation="bounceIn"
            delay={900}
            style={{ width: "100%" }}
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
      </KeyboardAwareScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  loginBox: {
    width: "90%",
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: theme.colors.text,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  button: {
    paddingVertical: 8,
    backgroundColor: theme.colors.primary,
  },
});

export default LoginScreen;