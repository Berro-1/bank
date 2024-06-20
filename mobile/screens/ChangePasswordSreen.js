import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Header from '../components/Header';

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // Logic to verify and update the password
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Change Password" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Old Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setOldPassword}
          value={oldPassword}
        />
        <Text style={styles.label}>New Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setNewPassword}
          value={newPassword}
        />
        <Text style={styles.label}>Confirm New Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Update Password</Text>
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
    paddingTop:30,
    flexGrow: 1,
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

export default ChangePassword;
