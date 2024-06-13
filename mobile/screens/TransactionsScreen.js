import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { getLatestTransactions } from "../store/transactions/transactionsActions";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TransactionsScreen = ({ route }) => {
  const { accountId } = route.params;
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getLatestTransactions(accountId));
  }, [dispatch, accountId]);

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
    return transaction.sender === accountId ? 
      `To: ${transaction.receiverName}` : 
      `From: ${transaction.senderName}`;
  };

  const renderItem = ({ item }) => (
    <Card key={item._id.toString()} style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{transactionDetail(item, accountId)}</Title>
        <Paragraph style={styles.amount}>{`$${item.amount}`}</Paragraph>
        <Paragraph style={styles.date}>{formatDate(item.createdAt)}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041F1E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#026873",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#033E3E",
    elevation: 4,
  },
  title: {
    fontSize: 18,
    color: "#CDE0C9",
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    color: "#A7D2CB",
  },
  date: {
    fontSize: 14,
    color: "#789F8A",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default TransactionsScreen;
