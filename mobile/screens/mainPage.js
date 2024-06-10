import React from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const mainPage = () => {
  const accountBalance = "12,345.67";
  const recentTransactions = [
    { id: 1, type: "Deposit", amount: "500.00", date: "2024-06-08" },
    { id: 2, type: "Withdrawal", amount: "200.00", date: "2024-06-07" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceText}>Your Balance</Text>
        <Text style={styles.balance}>{`$${accountBalance}`}</Text>
      </View>

      <View style={styles.actionSection}>
        <Button
          color="#0c7076"
          title="Send Money"
          onPress={() => alert("Send Money")}
        />
        <Button
          color="#0c7076"
          title="Pay Bills"
          onPress={() => alert("Pay Bills")}
        />
        <Button
          color="#0c7076"
          title="Deposit"
          onPress={() => alert("Deposit")}
        />
      </View>

      <View style={styles.transactionsSection}>
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
      </View>
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
    justifyContent: "space-around",
    marginBottom: 20,
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
  },
});

export default mainPage;
