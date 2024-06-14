import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Animated, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getCards } from "../store/creditCards/creditCardsActions";
import Icon from "react-native-vector-icons/FontAwesome";

const AccountItem = ({ item, isExpanded, onPress, navigation }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const formatBalance = (balance) => `$${balance.toFixed(2)}`;

  return (
    <View style={styles.accountItemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.accountItem}>
        <Text style={styles.accountType}>{item.itemType === "account" ? item.type : item.card_name}</Text>
        <View style={styles.balanceAndIcon}>
          <Text style={styles.accountBalance}>
            {item.itemType === "account" ? formatBalance(item.balance) : formatBalance(item.available_credit)}
          </Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Icon name="chevron-down" size={20} color="#0c7076" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.dropdownContent}>
          <TouchableOpacity onPress={() => navigation.navigate("Transactions", { accountId: item._id })}>
            <Text style={styles.viewTransactionsText}>View Transactions</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const AccountsScreen = ({ navigation }) => {
  const userId = "66577a78511763b4296b4311";
  const { accounts } = useSelector((state) => state.accounts || { accounts: [] });
  const { cards } = useSelector((state) => state.cards || { cards: [] });

  const [expandedAccount, setExpandedAccount] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getAllAccounts(userId));
      dispatch(getCards(userId));
    }
  }, [dispatch, userId]);

  const combinedData = [
    ...accounts.map((account) => ({ ...account, itemType: "account" })),
    ...cards.map((card) => ({ ...card, itemType: "card" })),
  ];

  const toggleDropdown = (id) => {
    setExpandedAccount(expandedAccount === id ? null : id);
  };

  const renderItem = ({ item }) => (
    <AccountItem
      item={item}
      isExpanded={expandedAccount === item._id}
      onPress={() => toggleDropdown(item._id)}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.header}>
        <Text style={styles.headerTitle}>Accounts</Text>
      </Animated.View>
      {combinedData.length === 0 ? (
        <Text style={styles.emptyText}>No accounts or cards available.</Text>
      ) : (
        <FlatList
        style={{padding:10}}
          data={combinedData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
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
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  accountItemContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  accountItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceAndIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContent: {
    backgroundColor: "#e0f7fa",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#0c7076",
  },
  accountType: {
    fontSize: 20,
    color: "#0c7076",
    fontWeight: "600",
  },
  accountBalance: {
    fontSize: 20,
    color: "#0c7076",
    marginRight: 10,
    fontWeight: "600",
  },
  viewTransactionsText: {
    fontSize: 18,
    color: "#0c7076",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    color: "#0c7076",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AccountsScreen;
