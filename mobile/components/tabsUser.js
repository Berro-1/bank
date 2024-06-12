import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainPage from "../screens/mainPage";
import Submissions from "../screens/submissions";
import UserDetails from "../screens/userDetails";

const Tab = createBottomTabNavigator();


const CustomTabBarButton = ({ children, onPress, focused }) => {
  const scaleValue = new Animated.Value(0);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 2,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 0,
      friction: 2,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.customTabBarButton}
    >
      <Animated.View style={[styles.customTabBarButtonView, focused ? styles.customTabBarButtonViewFocused : null, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const TabBarLabel = ({ focused, label }) => (
  <Text style={[styles.tabBarLabel, focused ? styles.tabBarLabelFocused : null]}>
    {label}
  </Text>
);

const TabsUser = () => {
  const [selectedTab, setSelectedTab] = useState("MainPage");

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "MainPage") {
            iconName = "home";
          } else if (route.name === "Submissions") {
            iconName = focused ? "send" : "send-o";
          } else if (route.name === "UserDetails") {
            iconName = focused ? "user" : "user-o";
          }
          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={size} color={color} />
              {/* <TabBarLabel focused={focused} label={route.name} /> */}
            </View>
          );
        },
        tabBarActiveTintColor: "#FF6347",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="MainPage" component={MainPage} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="Submissions" component={Submissions} options={{ tabBarLabel: "Submissions" }} />
      <Tab.Screen name="UserDetails" component={UserDetails} options={{ tabBarLabel: "Details" }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "600",
  },
  tabBarLabelFocused: {
    color: "#FF6347",
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  customTabBarButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  customTabBarButtonView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
  },
  customTabBarButtonFocused: {
    top: -25,
  },
  customTabBarButtonViewFocused: {
    backgroundColor: "white",
  },
  defaultTabBarButtonView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default TabsUser;
