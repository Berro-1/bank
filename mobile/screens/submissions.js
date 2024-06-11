import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Animatable from "react-native-animatable"; // Ensure this is correctly imported

const Submissions = () => {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="bounceIn" delay={500} style={styles.title}>
        <Text>Submissions</Text>
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use 'flex: 1' to ensure the container uses all available space
    alignItems: "center", // Center items horizontally in the container
    justifyContent: "center", // Center items vertically in the container
    padding: 20, // Add some padding around the content
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", // Make the title bold
  },
});

export default Submissions;
