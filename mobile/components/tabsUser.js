import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainPage from "../screens/mainPage";
import Submissions from "../screens/submissions";
import UserDetails from "../screens/userDetails";
import Payments from "../screens/Payments"; // Assuming you have this screen
import Accounts from "../screens/accountsScreen"; // Assuming you have this screen
import AccountsScreen from "../screens/accountsScreen";

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
      <Animated.View
        style={[
          styles.customTabBarButtonView,
          focused ? styles.customTabBarButtonViewFocused : null,
          { transform: [{ scale }] },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const TabBarLabel = ({ focused, label }) => (
  <Text
    style={[styles.tabBarLabel, focused ? styles.tabBarLabelFocused : null]}
  >
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
          } else if (route.name === "Payments") {
            iconName = "credit-card";
          } else if (route.name === "Accounts") {
            iconName = "briefcase";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === "MainPage") {
            label = "Home";
          } else if (route.name === "Submissions") {
            label = "Submissions";
          } else if (route.name === "UserDetails") {
            label = "Details";
          } else if (route.name === "Payments") {
            label = "Payments";
          } else if (route.name === "Accounts") {
            label = "Accounts";
          }
          return <TabBarLabel focused={focused} label={label} />;
        },
        tabBarActiveTintColor: "#0f969c",
        tabBarInactiveTintColor: "#6da5c0",
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                setSelectedTab("MainPage");
                props.onPress();
              }}
            >
              <View style={styles.defaultTabBarButtonView}>
                <Icon
                  name="home"
                  size={30}
                  color={selectedTab === "MainPage" ? "#0f969c" : "#6da5c0"}
                />
                <Text
                  style={
                    selectedTab === "MainPage"
                      ? styles.tabBarLabelFocused
                      : styles.tabBarLabel
                  }
                >
                  Home
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={TransfersScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                setSelectedTab("transfersScreen");
                props.onPress();
              }}
            >
              <View style={styles.defaultTabBarButtonView}>
                <Icon
                  name="credit-card"
                  size={30}
                  color={selectedTab === "Payments" ? "#0f969c" : "#6da5c0"}
                />
                <Text
                  style={
                    selectedTab === "transfersScreen"
                      ? styles.tabBarLabelFocused
                      : styles.tabBarLabel
                  }
                >
                  Payments
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Submissions"
        component={Submissions}
        options={{
          tabBarButton: (props) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1.5,
              }}
            >
              <CustomTabBarButton
                {...props}
                focused={selectedTab === "Submissions"}
                onPress={() => {
                  setSelectedTab("Submissions");
                  props.onPress();
                }}
              >
                <Icon
                  name={selectedTab === "Submissions" ? "send" : "send-o"}
                  size={30}
                  color={selectedTab === "Submissions" ? "#0f969c" : "#fff"}
                  style={{ right: 2 }}
                />
              </CustomTabBarButton>
              <Text
                style={[
                  styles.tabBarLabel,
                  selectedTab === "Submissions"
                    ? styles.tabBarLabelFocused
                    : { color: "#6da5c0" },
                  styles.tabBarLabelNoWrap,
                ]}
              >
                Submissions
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                setSelectedTab("Accounts");
                props.onPress();
              }}
            >
              <View style={styles.defaultTabBarButtonView}>
                <Icon
                  name="briefcase"
                  size={30}
                  color={selectedTab === "Accounts" ? "#0f969c" : "#6da5c0"}
                />
                <Text
                  style={
                    selectedTab === "Accounts"
                      ? styles.tabBarLabelFocused
                      : styles.tabBarLabel
                  }
                >
                  Accounts
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                setSelectedTab("UserDetails");
                props.onPress();
              }}
            >
              <View style={styles.defaultTabBarButtonView}>
                <Icon
                  name="user"
                  size={30}
                  color={selectedTab === "UserDetails" ? "#0f969c" : "#6da5c0"}
                />
                <Text
                  style={
                    selectedTab === "UserDetails"
                      ? styles.tabBarLabelFocused
                      : styles.tabBarLabel
                  }
                >
                  Details
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
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
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    color: "gray",
  },
  tabBarLabelFocused: {
    color: "#0f969c",
  },
  tabBarLabelNoWrap: {
    position: "absolute",
    bottom: 1,
    whiteSpace: "nowrap",
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
    backgroundColor: "#0f969c",
    justifyContent: "center",
    alignItems: "center",
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
    right: 3,
  },
});

export default TabsUser;
