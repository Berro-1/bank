import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const darkTheme = {
  backgroundColor: '#111827',
  color: '#ffffff',
  primary: '#64CCC5',
  secondary: '#03dac6',
};

const services = [
  {
    title: 'Savings Account',
    description: `Secure your future with our high-interest savings accounts.`,
    image: require('../assets/savings.jpg'), // Ensure this path is correct
  },
  {
    title: 'Loans',
    description: `Get the financial support you need with our loan services.`,
    image: require('../assets/loan.jpg'), // Ensure this path is correct
  },
  // Add more services as needed
];

const MainPage = () => {
  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={styles.card}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={darkTheme.backgroundColor} />
      <Text style={styles.header}>Our Services</Text>
      <Carousel
        data={services}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8}
        loop={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: darkTheme.primary,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#1a2238',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: darkTheme.primary,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default MainPage;
