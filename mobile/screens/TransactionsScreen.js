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
import { getAllTransactions, getLatestTransactions } from "../store/transactions/transactionsActions";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TransactionsScreen = ({ route }) => {
  const { accountId } = route.params;
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllTransactions(accountId));
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
    return transaction.sender === accountId
      ? `To: ${transaction.receiverName}`
      : `From: ${transaction.senderName}`;
  };

  const renderItem = ({ item }) => (
    <Card key={item._id.toString()} style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Icon
            name={item.sender === accountId ? "send" : "receipt"}
            size={24}
            color="#0c7076"
          />
        </View>
        <View style={styles.textContainer}>
          <Title style={styles.title}>{transactionDetail(item, accountId)}</Title>
          <Paragraph style={styles.amount}>{`$${item.amount}`}</Paragraph>
          <Paragraph style={styles.date}>{formatDate(item.createdAt)}</Paragraph>
        </View>
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: '100%',
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
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
    flexDirection: 'row', // Added to make items in a row
    alignItems: 'center', // Center items vertically
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    flex: 1, // This ensures the title takes up remaining space
    alignItems:'center',
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 8,
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
  title: {
    fontSize: 18,
    color: "#0c7076",
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    color: "#0c7076",
  },
  date: {
    fontSize: 14,
    color: "#333333",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default TransactionsScreen;
