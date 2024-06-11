import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const UserDetails = () => {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInUp" duration={800} style={styles.title}>
        <Text>User Details</Text>
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default UserDetails;
