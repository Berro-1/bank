import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import { SelectList } from "react-native-dropdown-select-list";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getCards } from "../store/creditCards/creditCardsActions";
import { useDispatch, useSelector } from "react-redux";
import { createTransfer } from "../store/transfers/transfersActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const TransfersScreen = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [scannerModalVisible, setScannerModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [combinedData, setCombinedData] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false); // State to control scanning

  const dynamicKey = combinedData.reduce((prev, curr) => prev + curr.value, "");
  const [userId, setUserId] = useState(null);
  const accounts = useSelector((state) => state.accounts.accounts);
  const cards = useSelector((state) => state.cards.cards);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [dispatch]);

 useEffect(() => {
   const loadUserData = async () => {
     try {
       const token = await AsyncStorage.getItem("jwtToken");
       if (token) {
         const decoded = jwtDecode(token);
         setUserId(decoded.id); // Assuming 'id' is the field in the token
         dispatch(getAllAccounts(decoded.id)); // Dispatch actions with decoded data
         dispatch(getCards(decoded.id));
       } else {
         console.log("No token found");
       }
     } catch (error) {
       console.error("Failed to load user data:", error);
     }
   };

   loadUserData();
 }, [dispatch]);


  useEffect(() => {
    const newCombinedData = [
      ...accounts.map((account) => ({
        key: account._id,
        value: `${account.type} (Account) $${account.balance}`,
        itemType: "account",
      })),
      ...cards.map((card) => ({
        key: card._id,
        value: `${card.card_name} (Card) $${card.available_credit}`,
        itemType: "card",
      })),
    ];
    setCombinedData(newCombinedData);
  }, [accounts, cards]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!isScanning) {
      // Check if another scan is allowed
      setIsScanning(true); // Set scanning to true to block further scans
      setAccountId(data);
      setScannerModalVisible(false); // Close scanner modal after scanning
      Alert.alert("QR Code Scanned", `Account ID: ${data}`);

      setTimeout(() => {
        setIsScanning(false); // Reset scanning state after 2 seconds
      }, 2000);
    }
  };
  const handlePress = async () => {
    await dispatch(
      createTransfer(selectedAccount, accountId, amount, "Transfer", userId)
    );

    dispatch(getAllAccounts(userId));
    dispatch(getCards(userId));

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transfer Funds</Text>
      </View>
      <View style={styles.list}>
        <SelectList
          key={dynamicKey}
          setSelected={(val) => setSelectedAccount(val)}
          data={combinedData}
          placeholder="Select Sender Account"
          inputStyles={{ color: "#0c7076" }}
          dropdownTextStyles={{ color: "#0c7076" }}
          dropdownStyles={{
            borderColor: "#0c7076",
            backgroundColor: "#ffffff",
          }}
          maxHeight={125}
          boxStyles={{
            backgroundColor: "#ffffff",
            borderColor: "#0c7076",
            width: "90%",
          }}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setAccountId}
            value={accountId}
            placeholder="Scan or enter account ID"
            placeholderTextColor="#0c7076"
            multiline={false} // Ensuring TextInput is single-line
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => setScannerModalVisible(true)}
            style={styles.icon}
          >
            <Icon name="qr-code-scanner" size={24} color="#0c7076" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={scannerModalVisible}
        onRequestClose={() => setScannerModalVisible(false)}
      >
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setScannerModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close Scanner</Text>
          </TouchableOpacity>
        </BarCodeScanner>
      </Modal>

      <View style={styles.card}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.inputAmount}
          onChangeText={setAmount}
          value={amount}
          placeholder="Enter amount"
          keyboardType="numeric"
          placeholderTextColor="#0c7076"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Animated.View style={[styles.button, { opacity: fadeAnim }]}>
            <Text style={styles.buttonText}>Transfer</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: "100%",
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    alignItems: "center",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#0c7076",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%", // Ensure the container takes full width
    position: "relative", // Required for absolute positioning of the icon
  },
  input: {
    flex: 1, // Allows the text input to expand and fill the space
    height: 40,
    paddingLeft: 10,
    paddingRight: 44,
    color: "#0c7076",
    backgroundColor: "transparent",
  },
  icon: {
    position: "absolute",
    right: 10, // Place it towards the right, within the padding area of the TextInput
    height: "100%",
    justifyContent: "center",
    padding: 10,
    zIndex: 10, // Ensures the icon is clickable and not blocked by the TextInput
  },
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  label: {
    color: "#333333",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  inputAmount: {
    height: 40,
    borderColor: "#0c7076",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#0c7076",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0c7076",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalCloseButton: {
    marginTop: 30,
    alignSelf: "center",
    backgroundColor: "#0c7076",
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default TransfersScreen;
