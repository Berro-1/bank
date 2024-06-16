import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons as Icon } from "@expo/vector-icons";

const TestScreen = () => {
  const [accountId, setAccountId] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setAccountId(data);
    setIsScannerVisible(false); // Hide scanner after scanning
    Alert.alert("QR Code Scanned", `Account ID: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAccountId}
        value={accountId}
        placeholder="Enter account ID"
        placeholderTextColor="#0c7076"
      />
      <TouchableOpacity
        onPress={() => setIsScannerVisible(true)}
        style={styles.icon}
      >
        <Icon name="camera-alt" size={24} color="#0c7076" />
      </TouchableOpacity>

      {isScannerVisible && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <Text
            style={styles.capture}
            onPress={() => setIsScannerVisible(false)}
          >
            Cancel
          </Text>
        </BarCodeScanner>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  },
  capture: {
    fontSize: 18,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
});

export default TestScreen;
