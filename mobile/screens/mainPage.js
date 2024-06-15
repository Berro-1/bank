import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getLatestTransactions } from "../store/transactions/transactionsActions";
import Icon from "react-native-vector-icons/MaterialIcons";

const conversionRate = 89000; // Conversion rate from Dollar to LBP

const FadeInUpView = (props) => {
  const fadeAnim = useRef(new Animated.Value(50)).current; // Start position for the slide effect
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, opacityAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: opacityAnim,
        transform: [{ translateY: fadeAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const MainPage = () => {
  const accounts = useSelector((state) => state.accounts.accounts || []);
  const transactions = useSelector((state) => state.transactions.transactions || []);

  const userId = "66577a78511763b4296b4311"; // This should be dynamically obtained
  const dispatch = useDispatch();
  const accountId = "665cd4f1a1fe882d71c8269d";

  useEffect(() => {
    dispatch(getAllAccounts(userId));
    dispatch(getLatestTransactions(accountId));
  }, [dispatch, userId, accountId]);

  useEffect(() => {
    console.log("Accounts:", accounts);
    console.log("Transactions:", transactions);
  }, [accounts, transactions]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [fabOpen, setFabOpen] = useState(false);
  const [currency, setCurrency] = useState('Dollar');

  const toggleFab = () => {
    setFabOpen(!fabOpen);
  };

  const fabAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fabAnimation, {
      toValue: fabOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fabOpen, fabAnimation]);

  const lbpStyle = {
    transform: [
      {
        scale: fabAnimation,
      },
      {
        translateY: fabAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
    ],
    opacity: fabAnimation,
  };

  const dollarStyle = {
    transform: [
      {
        scale: fabAnimation,
      },
      {
        translateY: fabAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
    opacity: fabAnimation,
  };

  const convertAmount = (amount) => {
    return currency === 'Dollar' ? amount : amount * conversionRate;
  };

  const currencySymbol = currency === 'Dollar' ? '$' : 'LBP';

  return (
    <View style={styles.container}>
      <Animated.View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </Animated.View>
      <ScrollView style={styles.scrollContainer}>
        <FadeInUpView style={styles.balanceSection}>
          <Text style={styles.balanceText}>Your Balance</Text>
          {accounts.map((account) => (
            <Text key={account._id} style={styles.balance}>
              {`${currencySymbol} ${convertAmount(account.balance)}`}
            </Text>
          ))}
        </FadeInUpView>
        <FadeInUpView style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <Card key={transaction._id} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={transaction.sender === accountId ? "send" : "receipt"}
                    size={24}
                    color="#0c7076"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Title>{transaction.receiverName || transaction.senderName}</Title>
                  <Paragraph>{`${currencySymbol} ${convertAmount(transaction.amount)}`}</Paragraph>
                  <Paragraph>{formatDate(transaction.createdAt)}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          ))}
        </FadeInUpView>
      </ScrollView>
      {fabOpen && (
        <>
          <Animated.View style={[styles.fabOption, lbpStyle]}>
            <TouchableOpacity onPress={() => { setCurrency('LBP'); setFabOpen(false); }}>
              <Text style={styles.fabOptionText}>LBP</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.fabOption, dollarStyle]}>
            <TouchableOpacity onPress={() => { setCurrency('Dollar'); setFabOpen(false); }}>
              <Text style={styles.fabOptionText}>Dollar</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggleFab}>
        <Icon name="attach-money" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
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
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80, // Space for the FAB
  },
  balanceSection: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundImage: 'linear-gradient(45deg, #0c7076, #6da5c0)',
  },
  balanceText: {
    fontSize: 22,
    color: "#333333",
    marginBottom: 10,
    fontWeight: "bold",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0c7076",
  },
  transactionsSection: {
    marginTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
    textAlign: "center",
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0c7076",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabOption: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#0c7076",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 10,
  },
  fabOptionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MainPage;
