import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import QRCode from "react-native-qrcode-svg";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { useDispatch, useSelector } from "react-redux";

const UserDetails = () => {
  const userId = "6644dcb9c16b269cf9bae998";
  const accounts = useSelector((state) => state.accounts.accounts || []);
  const [expandedId, setExpandedId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts(userId));
  }, [dispatch, userId]);

  const toggleExpand = (accountId) => {
    setExpandedId(expandedId === accountId ? null : accountId);
  };

  return (
    <View style={styles.container}>
      {accounts.map((account) => (
        <View key={account._id} style={styles.accountContainer}>
          <TouchableOpacity
            onPress={() => toggleExpand(account._id)}
            style={styles.accountHeader}
          >
            <Text style={styles.accountText}>
              Account ID: {account._id} - Type: {account.type}
            </Text>
          </TouchableOpacity>
          {expandedId === account._id && (
            <Animatable.View
              animation="fadeInUp"
              duration={800}
              style={styles.details}
            >
              <Text style={styles.detailsText}>
                Balance: ${account.balance.toFixed(2)}
              </Text>
              <QRCode
                value={account._id.toString()}
                size={150}
                color="#0c7076" // Dark teal color for the QR code itself
                backgroundColor="#f0f0f0" // Light grey background for the QR code
              />
            </Animatable.View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // White background for the main container
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  accountContainer: {
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#ffffff", // Maintains consistency with a white background
    borderRadius: 10, // Rounded corners for the account container
    shadowColor: "#000", // Black shadow for 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
  },
  accountHeader: {
    padding: 15,
    backgroundColor: "#0c7076", // Dark teal background for the header
    width: "100%",
    borderRadius:10,
    alignItems: "center",
  },
  accountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff", // White text for better contrast
  },
  details: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light grey background for the details section
    borderBottomLeftRadius: 10, // Rounded corners for the bottom
    borderBottomRightRadius: 10,
    padding: 15,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333", // Darker text for the details for better readability
  },
});

export default UserDetails;
