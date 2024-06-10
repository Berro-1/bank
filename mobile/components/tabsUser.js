import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import MainPage from "../screens/mainPage";
import Submissions from "../screens/submissions";
import UserDetails from "../screens/userDetails";

const Tab = createBottomTabNavigator();

const TabsUser = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,  // Correctly place the headerShown here
        tabBarIcon:({ focused, color, size }) => {
          let iconName;
          if (route.name === "MainPage") {
            iconName = "home";
          } else if (route.name === "Submissions") {
            iconName = focused ? "send" : "send-o";
          } else if (route.name === "UserDetails") {
            iconName = focused ? "user" : "user-o";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Submissions"
        component={Submissions}
        options={{
          tabBarLabel: "Submissions",
        }}
      />
      <Tab.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          tabBarLabel: "Details",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsUser;
