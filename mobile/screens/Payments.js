import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Payments({ navigation }) {
  const handleTransferPress = () => {
    // Navigate to the Transfers screen or handle transfer logic
    navigation.navigate('Transfers');
  };

  const handleLoanPaymentPress = () => {
    // Navigate to the Loan Payment screen or handle loan payment logic
    navigation.navigate('LoanPayment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Options</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <Icon name="info-outline" size={24} color="#0c7076" style={styles.descriptionIcon} />
          <Text style={styles.description}>
            Choose an option below to proceed with your payment.
          </Text>
        </View>
        <TouchableOpacity style={styles.optionButton} onPress={handleTransferPress}>
          <Icon name="swap-horiz" size={40} color="#0c7076" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionButtonText}>Transfer</Text>
            <Text style={styles.optionDescription}>Send money to another account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleLoanPaymentPress}>
          <Icon name="payment" size={40} color="#0c7076" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionButtonText}>Loan Payment</Text>
            <Text style={styles.optionDescription}>Pay off your loan</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    width: '90%',
  },
  descriptionIcon: {
    marginRight: 10,
  },
  description: {
    fontSize: 18,
    color: "#333",
    textAlign: 'center',
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  optionTextContainer: {
    marginLeft: 15,
  },
  optionButtonText: {
    color: '#0c7076',
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionDescription: {
    color: '#333',
    fontSize: 14,
  },
});
