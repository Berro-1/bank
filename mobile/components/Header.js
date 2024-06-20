import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this installed or use an alternative icon library

const CommonHeader = ({ title, navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <MaterialIcons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.backIcon} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0c7076",
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  backIcon: {
    width: 28,
  }
});

export default CommonHeader;
