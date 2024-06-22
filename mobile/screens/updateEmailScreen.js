import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import Header from '../components/Header';
import { updateUser } from '../store/users/userAction';
import { getAllAccounts } from '../store/accounts/accountsActions';
import { getCards } from '../store/creditCards/creditCardsActions';
import { getAllLoans } from '../store/loans/loansActions';

const UpdateEmail = ({ navigation }) => {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        console.log('No token found');
        return;
      }
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      await Promise.all([
        dispatch(getAllAccounts(decoded.id)),
        dispatch(getCards(decoded.id)),
        dispatch(getAllLoans(decoded.id)),
      ]);
    };

    fetchUserData();
  }, [dispatch]);

  const handleSubmit = () => {
    if (!oldEmail || !newEmail) {
      alert('Both old email and new email fields are required.');
      return;
    }
    if (oldEmail === newEmail) {
      alert('New email cannot be the same as the old email!');
      return;
    }
    if (!validateEmail(newEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    dispatch(updateUser(userId, { newEmail })).then(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          delay: 1000,
        }).start();
      });
    });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Update Email" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
        <MaterialIcons name="email" size={80} color="#0c7076" style={styles.icon} />
        <Text style={styles.instructionText}>
          Please enter your old email address, then provide a new email address.
        </Text>
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
        {status === 'loading' && <Text>Updating...</Text>}
        {status === 'failed' && error && (
          <Text style={styles.error}>{getErrorMessage(error)}</Text>
        )}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
        <Animated.View style={[styles.successContainer, { opacity }]}>
          <MaterialIcons name="check-circle" size={80} color="green" />
          <Text style={styles.successText}>Email Updated Successfully!</Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  } else if (error && error.message) {
    return error.message;
  } else {
    return 'An unknown error occurred.';
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f4f7'
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0c7076',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#0c7076',
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  successText: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
});

export default UpdateEmail;
