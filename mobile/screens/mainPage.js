import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

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

const MainPage = () => {
  const accountBalance = "12,345.67";
  const recentTransactions = [
    { id: 1, type: "Deposit", amount: "500.00", date: "2024-06-08" },
    { id: 2, type: "Withdrawal", amount: "200.00", date: "2024-06-07" },
  ];

  return (
    <ScrollView style={styles.container}>
      <FadeInView style={styles.balanceSection}>
        <Text style={styles.balanceText}>Your Balance</Text>
        <Text style={styles.balance}>{`$${accountBalance}`}</Text>
      </FadeInView>

      <View style={styles.actionSection}>
        <CustomButton
          title="Send Money"
          onPress={() => alert("Send Money")}
          style={{ backgroundColor: "#0c7076", marginHorizontal:1 }}
        />
        <CustomButton
          title="Pay Loan"
          onPress={() => alert("Pay Loan")}
          style={{ backgroundColor: "#347d85", marginHorizontal: 1 }}
        />
        <CustomButton
          title="Check Accounts"
          onPress={() => alert("Check Accounts")}
          style={{ backgroundColor: "#589a9e", marginHorizontal:1 }}
        />
      </View>

      <FadeInView style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {recentTransactions.map((transaction) => (
          <Card key={transaction.id} style={styles.card}>
            <Card.Content style={{ backgroundColor: "#fff" }}>
              <Title>{transaction.type}</Title>
              <Paragraph>{`$${transaction.amount}`}</Paragraph>
              <Paragraph>{transaction.date}</Paragraph>
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
