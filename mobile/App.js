import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './screens/signup';
import LoginScreen from './screens/loginScreen'
import MainPage from './screens/mainPage';
import Tabs from './components/tabs'
export default function App() {
  return (
    <View style={styles.container}>
       {/* <Tabs/>  */}
      <MainPage/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});
