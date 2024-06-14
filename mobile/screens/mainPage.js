import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getLatestTransactions } from "../store/transactions/transactionsActions";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const CustomButton = ({ title, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const MainPage = ({ navigation }) => {
  const userId = "66577a78511763b4296b4311"; // This should be dynamically obtained in a real application
  const dispatch = useDispatch();
  const accountId = "665cd4f1a1fe882d71c8269d";
  const { accounts } = useSelector((state) => state.accounts);
  const { transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getLatestTransactions(accountId));
    if (userId) {
      dispatch(getAllAccounts(userId));
    }
  }, [dispatch, userId]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const transactionDetail = (transaction, accountId) => {
    if (transaction.sender === accountId) {
      return `To: ${transaction.receiverName}`;
    } else {
      if (transaction.receiverModel === "Loan") {
        return `To: ${transaction.senderName} (Loan)`;
      } else {
        return `From: ${transaction.senderName}`;
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <FadeInView style={styles.balanceSection}>
        <Text style={styles.balanceText}>Your Balance</Text>
        {accounts.map((account) => (
          <Text key={account._id} style={styles.balance}>
            {`$${account.balance}`}
          </Text>
        ))}
      </FadeInView>

      <View style={styles.actionSection}>
        <CustomButton
          title="Send Money"
          onPress={() => navigation.navigate("Transfers")}
          style={{ backgroundColor: "#0c7076", marginHorizontal: 1 }}
        />
        <CustomButton
          title="Pay Loan"
          onPress={() => alert("Pay Loan")}
          style={{ backgroundColor: "#347d85", marginOfficial: 1 }}
        />
        <CustomButton
          title="Check Accounts"
          onPress={() => navigation.navigate("Accounts")}
          style={{ backgroundColor: "#589a9e", marginHorizontal: 1 }}
        />
      </View>

      <FadeInView style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions &&
          transactions.map((transaction) => (
            <Card key={transaction._id} style={styles.card}>
              <Card.Content style={{ backgroundColor: "#fff" }}>
                <Title>{transactionDetail(transaction, userId)}</Title>
                <Paragraph>{`$${transaction.amount}`}</Paragraph>
                <Paragraph>{formatDate(transaction.createdAt)}</Paragraph>
              </Card.Content>
            </Card>
          ))}
      </FadeInView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#05161a",
  },
  balanceSection: {
    marginBottom: 20,
  },
  balanceText: {
    marginTop: 25,
    fontSize: 18,
    color: "#6da5c0",
    marginBottom: 5,
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f969c",
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  transactionsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0c7076",
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#072e33",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MainPage;
