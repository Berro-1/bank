import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getCards } from "../store/creditCards/creditCardsActions";

const AccountsScreen = () => {
  const userId = "66577a78511763b4296b4311";
  const { accounts } = useSelector((state) => state.accounts);
  const { cards } = useSelector((state) => state.cards);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getAllAccounts(userId));
      dispatch(getCards(userId));
      console.log("cards:", cards);
    }
  }, [dispatch, userId]);

  const combinedData = [
    ...accounts.map((account) => ({ ...account, itemType: "account" })),
    ...cards.map((card) => ({ ...card, itemType: "card" })),
  ];

  const formatBalance = (balance) => `$${balance.toFixed(2)}`;

  const renderItem = ({ item }) => {
    if (item.itemType === "account") {
      return (
        <View style={styles.accountItem}>
          <Text style={styles.accountType}>{item.type}</Text>
          <Text style={styles.accountBalance}>
            {formatBalance(item.balance)}
          </Text>
        </View>
      );
    } else if (item.itemType === "card") {
      return (
        <View style={styles.accountItem}>
          <Text style={styles.accountType}>{item.card_name}</Text>
          <Text style={styles.accountBalance}>
            {formatBalance(item.available_credit)}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleview}>
        <Text style={styles.title}>Your Accounts</Text>
      </View>
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05161a",
    padding: 20,
  },
  titleview: {
    borderBottomColor: "#6da5c0",
    borderBottomWidth: 2, // Thickness of the bottom border
    paddingBottom: 2,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 5,
    marginTop: 30,
    paddingBottom: 2,
  },
  accountItem: {
    backgroundColor: "#072e33",
    padding: 20,
    marginTop:10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountType: {
    fontSize: 18,
    color: "#ffffff",
  },
  accountBalance: {
    fontSize: 18,
    color: "#6da5c0",
  },
});

export default AccountsScreen;
