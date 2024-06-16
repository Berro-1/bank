import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/signup";
import LoginScreen from "./screens/loginScreen";
import MainPage from "./screens/mainPage";
import Tabs from "./components/tabs"; // Ensure this or any other screen component does not include another NavigationContainer
import TabsUser from "./components/tabsUser";
import { Provider } from "react-redux";
import store from './store/store'
import AccountsScreen from "./screens/accountsScreen";
import TransfersScreen from "./screens/transfersScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import LoansScreen from "./screens/loansScreen";
import PaymentsScreen from "./screens/Payments";
import TestScreen from "./screens/testScreen";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Tabs"
            screenOptions={{
              headerShown: false, // This hides the header globally
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={TabsUser} />
            <Stack.Screen name="SignUp" component={Signup} />
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Accounts" component={AccountsScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
            <Stack.Screen name="Transfers" component={TransfersScreen} />
            <Stack.Screen name="Loans" component={LoansScreen} />
            <Stack.Screen name="Payments" component={PaymentsScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
