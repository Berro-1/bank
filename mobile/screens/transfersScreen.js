import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getCards } from "../store/creditCards/creditCardsActions";
import { useDispatch, useSelector } from "react-redux";
import { createTransfer } from "../store/transfers/transfersActions";

const TransfersScreen = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [combinedData, setCombinedData] = useState([]);
  const dynamicKey = combinedData.reduce((prev, curr) => prev + curr.value, "");

  const userId = "66577a78511763b4296b4311";
  const accounts = useSelector((state) => state.accounts.accounts);
  const cards = useSelector((state) => state.cards.cards);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAccounts(userId));
    dispatch(getCards(userId));
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
        <Text style={styles.label}>To Account ID:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAccountId(text)}
          value={accountId}
          placeholder="Enter account ID"
          placeholderTextColor="#0c7076"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAmount(text)}
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
    width: '100%',
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
    shadowOpacity: 0.30,
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
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical:10,
    padding: 20,
    borderRadius: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
  label: {
    color: "#333333",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
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
});

export default TransfersScreen;
