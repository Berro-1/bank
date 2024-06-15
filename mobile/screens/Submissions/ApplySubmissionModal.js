import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const ApplySubmissionModal = ({ isOpen, toggle, onSubmit }) => {
  const initialFormState = {
    requestType: "",
  };

  const initialCreditCardState = {
    cardName: "",
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().slice(0, 10),
    creditLimit: "",
  };

  const initialAccountState = {
    accountType: "",
    loanType: "",
    amount: "",
    loanTerm: "",
  };

  const [formDetails, setFormDetails] = useState(initialFormState);
  const [creditCardDetails, setCreditCardDetails] = useState(initialCreditCardState);
  const [accountDetails, setAccountDetails] = useState(initialAccountState);

  const resetForm = () => {
    setFormDetails(initialFormState);
    setCreditCardDetails(initialCreditCardState);
    setAccountDetails(initialAccountState);
  };

  const handleInputChange = (value, name) => {
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleCreditCardChange = (value, name) => {
    let creditLimit = "";
    switch (value) {
      case "Silver Card":
        creditLimit = 5000;
        break;
      case "Gold Card":
        creditLimit = 10000;
        break;
      case "Platinum Card":
        creditLimit = 20000;
        break;
      default:
        break;
    }
    setCreditCardDetails({ ...creditCardDetails, [name]: value, creditLimit });
  };

  const handleAccountChange = (value, name) => {
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleSubmit = () => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // if (user && user.id) {
      const userId = '66577a78511763b4296b4311';
      if(userId){
      if (formDetails.requestType === "Credit Card") {
        onSubmit({ ...creditCardDetails, requestType: "Credit Card", userId });
      } else if (formDetails.requestType === "New Account") {
        onSubmit({ ...accountDetails, requestType: "New Account", userId });
      }
      toggle();
      resetForm();
    } else {
      alert("User not found");
    }
  };

  const handleCancel = () => {
    toggle();
    resetForm();
  };

  const renderLoanOptions = () => {
    let options = [];
    for (let i = 6; i <= 36; i += 6) {
      options.push(<Picker.Item key={i} label={`${i} months`} value={i} />);
    }
    return options;
  };

  const renderConditionalInputs = () => {
    switch (formDetails.requestType) {
      case "Credit Card":
        return (
          <>
            <Picker
              selectedValue={creditCardDetails.cardName}
              onValueChange={(value) => handleCreditCardChange(value, "cardName")}
              style={styles.picker}
            >
              <Picker.Item label="Select Card Name" value="" />
              <Picker.Item label="Silver Card" value="Silver Card" />
              <Picker.Item label="Gold Card" value="Gold Card" />
              <Picker.Item label="Platinum Card" value="Platinum Card" />
            </Picker>
            {creditCardDetails.cardName && (
              <View style={styles.amountContainer}>
                <TextInput
                  style={styles.amountInput}
                  value={`$${creditCardDetails.creditLimit}`}
                  editable={false}
                />
                <Text style={styles.amountText}>USD</Text>
              </View>
            )}
          </>
        );
      case "New Account":
        return (
          <>
            <Picker
              selectedValue={accountDetails.accountType}
              onValueChange={(value) => handleAccountChange(value, "accountType")}
              style={styles.picker}
            >
              <Picker.Item label="Select Account Type" value="" />
              <Picker.Item label="Savings" value="Savings" />
              <Picker.Item label="Loan" value="Loan" />
            </Picker>
            {accountDetails.accountType === "Loan" && (
              <>
                <View style={styles.amountContainer}>
                  <TextInput
                    style={styles.amountInput}
                    onChangeText={(text) =>
                      setAccountDetails({ ...accountDetails, amount: text })
                    }
                    value={accountDetails.amount}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    placeholderTextColor="#0c7076 "
                  />
                  <Text style={styles.amountText}>USD</Text>
                </View>
                <Picker
                  selectedValue={accountDetails.loanType}
                  onValueChange={(value) => handleAccountChange(value, "loanType")}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Loan Type" value="" />
                  <Picker.Item label="Personal" value="Personal" />
                  <Picker.Item label="Mortgage" value="Mortgage" />
                  <Picker.Item label="Auto" value="Auto" />
                  <Picker.Item label="Education" value="Education" />
                </Picker>
                <Picker
                  selectedValue={accountDetails.loanTerm}
                  onValueChange={(value) => handleAccountChange(value, "loanTerm")}
                  style={styles.picker}
                >
                  {renderLoanOptions()}
                </Picker>
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>New Submission</Text>
          <Picker
            selectedValue={formDetails.requestType}
            onValueChange={(value) => handleInputChange(value, "requestType")}
            style={styles.picker}
          >
            <Picker.Item label="Select Request Type" value="" />
            <Picker.Item label="Credit Card" value="Credit Card" />
            <Picker.Item label="New Account" value="New Account" />
          </Picker>
          {renderConditionalInputs()}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0c7076",
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "#0c7076",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#0c7076",
    backgroundColor: "transparent",
    marginVertical: 10,
  },
  picker: {
    width: "100%",
    color: "#0c7076",
    borderColor: "#0c7076",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0c7076",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  amountInput: {
    flex: 1,
    height: 40,
    color: "#0c7076",
  },
  amountText: {
    marginLeft: 10,
    color: "#0c7076",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: "#333A45",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#0c7076",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ApplySubmissionModal;
