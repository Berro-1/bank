import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../store/accounts/accountsActions";
import { getAllLoans } from "../store/loans/loansActions";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  NativeBaseProvider,
  Collapse,
  Pressable,
  Icon
} from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import

const LoanScreen = () => {
  const dispatch = useDispatch();
  const userId = "6644dcb9c16b269cf9bae998";  // Corrected typo in the ID
  const loans = useSelector(state => state.loans.loans || []);

  useEffect(() => {
    dispatch(getAllAccounts(userId));
    dispatch(getAllLoans(userId));
  }, [dispatch, userId]);

  // State to manage collapse
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (loanId) => {
    setExpanded(expanded === loanId ? null : loanId);
  };

  // Rotation animation setup
  const rotation = loans.reduce((acc, loan) => {
    acc[loan._id] = new Animated.Value(0);
    return acc;
  }, {});

  useEffect(() => {
    loans.forEach(loan => {
      Animated.spring(rotation[loan._id], {
        toValue: expanded === loan._id ? 1 : 0,
        useNativeDriver: true,
      }).start();
    });
  }, [expanded, loans]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <NativeBaseProvider>
      <Animated.View style={styles.header}>
        <Text style={styles.headerTitle}>Loans</Text>
      </Animated.View>
      <ScrollView contentContainerStyle={styles.container}>
        {loans.map((loan) => (
          <Box key={loan._id} style={styles.loanItem}>
            <Pressable
              onPress={() => toggleExpand(loan._id)}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size="md" style={styles.text}>
                {loan.type + " Loan" + " Status: " + loan.status}
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
                    onPress={() =>
                      alert(`Paying loan for ${loan.amount.toFixed(2)}`)
                    }
                  >
                  <Text style={{color:"#fff",fontWeight:"bold",fontSize:"16"}}>  Pay Loan</Text>
                  </Button>
                )}
              </VStack>
            </Collapse>
          </Box>
        ))}
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  button:{backgroundColor:"#0c7076",
    fontWeight:"bold"
  },
  text: { color: "#0c7076" },
  header: {
    width: "100%",
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
    elevation: 4, // Only for Android
    borderWidth: 1,
    borderColor: "#E2E8F0", // a subtle border color
  },
  collapseBody: {
    padding: 10,
    
  },
});

export default LoanScreen;
