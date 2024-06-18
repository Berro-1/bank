import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import QRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { MaterialIcons } from '@expo/vector-icons';
import { getCards } from './../store/creditCards/creditCardsActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const settingsData = [
  {
    id: "1",
    title: "Account Settings",
    options: [
      { id: "1-1", name: "Change Password" },
      { id: "1-2", name: "Update Email" },
      { id: "1-3", name: "Manage Addresses" },
    ],
  },
  {
    id: "2",
    title: "Privacy Settings",
    options: [
      { id: "2-1", name: "Manage Blocked Users" },
      { id: "2-2", name: "Activity Status" },
      { id: "2-3", name: "Data Download" },
    ],
  },
  {
    id: "3",
    title: "Notification Settings",
    options: [
      { id: "3-1", name: "Email Notifications" },
      { id: "3-2", name: "Push Notifications" },
      { id: "3-3", name: "SMS Notifications" },
    ],
  },
  {
    id: "4",
    title: "QR Code",
    options: [],
  },
];

const UserDetails = () => {
    const [userId, setUserId] = useState(null);

  const accounts = useSelector((state) => state.accounts.accounts || []);
    const cards = useSelector((state) => state.cards.cards || []);

  const [expandedId, setExpandedId] = useState(null);
  const dispatch = useDispatch();

   useEffect(() => {
     const loadUserData = async () => {
       try {
         const token = await AsyncStorage.getItem("jwtToken");
         if (token) {
           const decoded = jwtDecode(token);
           setUserId(decoded.id); // Assuming 'id' is the field in the token
           dispatch(getAllAccounts(decoded.id)); // Dispatch actions with decoded data
           dispatch(getCards(decoded.id));
         } else {
           console.log("No token found");
         }
       } catch (error) {
         console.error("Failed to load user data:", error);
       }
     };

     loadUserData();
   }, [dispatch]);

  const toggleExpand = (settingId) => {
    setExpandedId(expandedId === settingId ? null : settingId);
  };

  const renderSetting = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={800} style={styles.settingContainer}>
      <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.settingHeader}>
        <Text style={styles.settingText}>{item.title}</Text>
        <MaterialIcons name={expandedId === item.id ? "expand-less" : "expand-more"} size={24} color="#fff" />
      </TouchableOpacity>
      {expandedId === item.id && (
        <Animatable.View animation="fadeInUp" duration={800} style={styles.optionsContainer}>
          {item.options.length > 0 ? (
            item.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => {}}
                style={styles.option}
              >
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            accounts.map((account) => (
              <View key={account._id} style={styles.qrContainer}>
                <QRCode 
                  value={account._id} 
                  size={120} 
                  color="#0c7076" 
                  backgroundColor="transparent" 
                />
                <Text style={styles.qrText}>ID: {account._id}</Text>
                <Text style={styles.qrText}>Balance: ${account.balance}</Text>
              </View>
            ))
          )}
        </Animatable.View>
      )}
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <FlatList
        data={settingsData}
        renderItem={renderSetting}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  settingContainer: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: "#0f969c",
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  settingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  optionsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: "#0c7076",
    borderBottomWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "#0c7076",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrText: {
    fontSize: 16,
    color: "#05161a",
    marginTop: 10,
  },
});

export default UserDetails;