import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Header from '../components/Header';

const UpdateEmail = ({ navigation }) => {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = async () => {
    if (oldEmail === newEmail) {
      alert('New email cannot be the same as the old email!');
      return;
    }
    // Add logic to validate and update the email
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Update Email" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Old Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          onChangeText={setOldEmail}
          value={oldEmail}
        />
        <Text style={styles.label}>New Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          onChangeText={setNewEmail}
          value={newEmail}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Update Email</Text>
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
    backgroundColor: '#fff'
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

export default UpdateEmail;
