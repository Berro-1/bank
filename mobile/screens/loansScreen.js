import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Animated, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllLoans } from "../store/loans/loansActions";
import { getAllAccounts } from "../store/accounts/accountsActions";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  NativeBaseProvider,
  Collapse,
  Pressable,
  Icon,
  Modal,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SelectList } from "react-native-dropdown-select-list";
import { createLoanPayment } from "../store/loans/loansActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const LoanScreen = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const loans = useSelector((state) => state.loans.loans || []);
  const accounts = useSelector((state) => state.accounts.accounts || []);

  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
    loanId: "",
    amount: 0,
    accountId: "",
    paymentAmount: "", // This will hold the amount input by the user in the TextInput
  });
  const openModal = (loanId, amount,userId) => {
    setModalInfo({
      isVisible: true,
      loanId,
      amount,
      accountId: "",
      paymentAmount: "",
      userId,
      key: new Date().getTime(), // Unique key based on the current time
    });
  };
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.id); // Assuming 'id' is the field in the token
          dispatch(getAllAccounts(decoded.id)); // Dispatch actions with decoded data
          dispatch(getAllLoans(decoded.id));
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, [dispatch]);


  const rotation = Array.isArray(loans)
    ? loans.reduce((acc, loan) => {
        acc[loan._id] = new Animated.Value(0);
        return acc;
      }, {})
    : {};


  useEffect(() => {
    if (Array.isArray(loans)) {
  loans.forEach(loan => {
      Animated.spring(rotation[loan._id], {
        toValue: expanded === loan._id ? 1 : 0,
        useNativeDriver: true,
      }).start();
    });}
  }, [expanded, loans]);

  const toggleExpand = (loanId) => {
    setExpanded(expanded === loanId ? null : loanId);
  };

 const handleConfirm = async () => {
   // Convert the input to a float and check if it is a number and greater than zero
   const amount = parseFloat(modalInfo.paymentAmount);

   if (isNaN(amount) || amount <= 0) {
     Alert.alert(
       "Invalid Amount",
       "Please enter a valid numeric amount greater than $0."
     );
   } else if (!modalInfo.accountId) {
     Alert.alert("Account Selection Required", "Please select an account.");
   } else {
     // Proceed with dispatching the action if the amount and account ID are valid
     dispatch(
       createLoanPayment(
         modalInfo.loanId,
         modalInfo.accountId,
         amount, // Use the parsed amount
         userId
       )
     );
     // Optionally close the modal here or upon successful transaction completion
     setModalInfo({ ...modalInfo, isVisible: false });
   }
 };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const accountOptions = accounts.map((account) => ({
    key: account._id,
    value: `${account.type} - $${account.balance.toFixed(2)}`, // Formats the balance as currency and adds some text structure
  }));

  return (
    <NativeBaseProvider>
      <Animated.View style={styles.header}>
        <Text style={styles.headerTitle}>Loans</Text>
      </Animated.View>
      <ScrollView contentContainerStyle={styles.container}>
        {Array.isArray(loans) &&
          loans.map((loan) => (
            <Box key={loan._id} style={styles.loanItem}>
              <Pressable
                onPress={() => toggleExpand(loan._id)}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading size="md" style={styles.text}>
                  {loan.type + " Loan - Status: " + loan.status}
                </Heading>
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: rotation[loan._id].interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", "180deg"],
                        }),
                      },
                    ],
                  }}
                >
                  <Icon as={<Ionicons name="chevron-down" />} size="6" />
                </Animated.View>
              </Pressable>
              <Collapse isOpen={expanded === loan._id}>
                <VStack space={3} style={styles.collapseBody}>
                  <Text fontSize="sm" style={styles.text}>
                    Amount: ${loan.amount.toFixed(2)}
                  </Text>
                  <Text fontSize="sm" style={styles.text}>
                    Term: {loan.loan_term} months
                  </Text>
                  <Text fontSize="sm" style={styles.text}>
                    Interest Rate: {loan.interest_rate}%
                  </Text>
                  <Text fontSize="sm" style={styles.text}>
                    Term Start Date: {formatDate(loan.createdAt)}
                  </Text>
                  {loan.status === "Active" && (
                    <Button
                      size="sm"
                      variant="solid"
                      style={styles.button}
                      onPress={() => openModal(loan._id, loan.amount,userId)}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Pay Loan
                      </Text>
                    </Button>
                  )}
                </VStack>
              </Collapse>
            </Box>
          ))}
      </ScrollView>
      <Modal
        isOpen={modalInfo.isVisible}
        onClose={() => setModalInfo({ ...modalInfo, isVisible: false })}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text style={styles.text}>Confirm Payment</Text>
          </Modal.Header>
          <Modal.Body>
            <Text style={styles.textdialog}>
              The loan still needs ${modalInfo.amount}
            </Text>
            <SelectList
              key={modalInfo.key} // Use the key here
              setSelected={(val) =>
                setModalInfo({ ...modalInfo, accountId: val })
              }
              data={accountOptions}
              placeholder="Select Sender Account"
              inputStyles={{ color: "#0c7076" }}
              dropdownTextStyles={{ color: "#0c7076" }}
              dropdownStyles={{
                borderColor: "#0c7076",
                backgroundColor: "#ffffff",
              }}
              maxHeight={125}
              boxStyles={{
                backgroundColor: "#ffffff",
                borderColor: "#0c7076",
                width: "100%",
              }}
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setModalInfo({ ...modalInfo, paymentAmount: text })
              }
              value={modalInfo.paymentAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              placeholderTextColor="#0c7076"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                onPress={() => setModalInfo({ ...modalInfo, isVisible: false })}
              >
                <Text style={styles.text}>Cancel</Text>
              </Button>
              <Button onPress={handleConfirm} style={styles.button}>
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#0c7076",
    fontWeight: "bold",
  },
  text: {
    color: "#0c7076",
    fontWeight: "bold",
  },
  textdialog: {
    color: "#0c7076",
    marginBottom: 10,
    marginTop: -15,
  },
  input: {
    height: 40,
    borderColor: "#0c7076",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#0c7076",
    backgroundColor: "transparent",
    marginTop: 10,
  },
  header: {
    width: "100%",
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    marginTop: 45,
    marginBottom: 20,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  loanItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  collapseBody: {
    padding: 10,
  },
});

export default LoanScreen;
