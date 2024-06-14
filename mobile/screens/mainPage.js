import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
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

      <FadeInView style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions &&
          transactions.map((transaction) => (
            <Card key={transaction._id} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Title style={styles.cardTitle}>
                  {transactionDetail(transaction, userId)}
                </Title>
                <Paragraph style={styles.cardAmount}>{`$${transaction.amount}`}</Paragraph>
                <Paragraph style={styles.cardDate}>{formatDate(transaction.createdAt)}</Paragraph>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#05161a",
  },
  balanceSection: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#072e33",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    marginHorizontal: 10,
  },
  balanceText: {
    fontSize: 20,
    color: "#6da5c0",
    marginBottom: 10,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0f969c",
  },
  transactionsSection: {
    marginTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6da5c0",
    textAlign: "center",
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#0a2e36",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  cardContent: {
    backgroundColor: "#0a2e36",
  },
  cardTitle: {
    color: "#6da5c0",
    fontWeight: "bold",
  },
  cardAmount: {
    color: "#0f969c",
    fontSize: 18,
  },
  cardDate: {
    color: "#a9a9a9",
    fontSize: 14,
  },
});

export default MainPage;
