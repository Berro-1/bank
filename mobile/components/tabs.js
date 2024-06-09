import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginScreen from "../screens/loginScreen";
import SignupScreen from "../screens/signup";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ color, size }) => (
              <Icon name="sign-in" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            tabBarLabel: "Signup",
            tabBarIcon: ({ color, size }) => (
              <Icon name="user-plus" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
