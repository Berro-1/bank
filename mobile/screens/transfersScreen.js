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
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initialize fadeAnim with a value of 1
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
   // Combine accounts and cards whenever there's a change
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
   console.log("new data:   ",combinedData);
 }, [accounts, cards]);

  

 const handlePress = async () => {
   await dispatch(
     createTransfer(selectedAccount, accountId, amount, "Transfer", userId)
   );

   // Refetch accounts and cards data
   dispatch(getAllAccounts(userId));
   dispatch(getCards(userId));

   // Animation sequence
   Animated.sequence([
     Animated.timing(fadeAnim, {
       toValue: 0.5, // Fade to half opacity
       duration: 300,
       useNativeDriver: true,
     }),
     Animated.timing(fadeAnim, {
       toValue: 1, // Fade back to full opacity
       duration: 300,
       useNativeDriver: true,
     }),
   ]).start();
 };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transfer Funds</Text>
      </View>
      <View style={styles.list}>
        <SelectList
          key={dynamicKey} // Dynamic key based on content changes
          setSelected={(val) => setSelectedAccount(val)}
          data={combinedData}
          placeholder="Select Sender Account"
          inputStyles={{ color: "#6da5c0" }}
          dropdownTextStyles={{ color: "#6da5c0" }}
          dropdownStyles={{
            borderColor: "#6da5c0",
            backgroundColor: "#072e33",
          }}
          maxHeight={125}
          boxStyles={{
            backgroundColor: "#072e33",
            borderColor: "#6da5c0",
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
          placeholderTextColor="#6da5c0"
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
          placeholderTextColor="#6da5c0"
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
    backgroundColor: "#05161a",
    paddingHorizontal: 20,
  },
  list: {
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#294d61",
  },
  title: {
    fontSize: 24,
    color: "#6da5c0",
    marginTop: 30,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#072e33",
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  label: {
    color: "#6da5c0",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 40,
    borderColor: "#294d61",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#6da5c0",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#072e33",
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
    color: "#6da5c0",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TransfersScreen;
