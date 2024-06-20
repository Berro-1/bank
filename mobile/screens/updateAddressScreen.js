import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Header from '../components/Header';

const ManageAddresses = ({ navigation }) => {
  const [address, setAddress] = useState('');

  const updateAddress = () => {
    // Logic to update the address in your backend
    alert("Address updated!");
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Manage Address" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
          multiline
        />
        <TouchableOpacity onPress={updateAddress} style={styles.button}>
          <Text style={styles.buttonText}>Update Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f4f7'
  },
  container: {
    flexGrow: 1,
    paddingTop:30,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0c7076'
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 100,
  },
  button: {
    backgroundColor: '#0f969c',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageAddresses;
