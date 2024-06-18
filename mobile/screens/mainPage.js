import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { TextInput, Button, Card, FAB } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Progress from 'react-native-progress';

const SignUpScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
    selfie: null,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const openCameraLib = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      setFormData({ ...formData, selfie: uri });
      console.log("Image captured: ", uri);
    } else {
      console.log("Camera access canceled or error occurred.");
    }
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Final submission data:", formData);
    // Submit logic or move to another screen
  };

  const renderProgressBar = () => (
    <Progress.Bar
      progress={step / 5}
      width={null}
      color="#0c7076"
      style={styles.progressBar}
    />
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>User Details</Text>
            <Card.Content>
              <TextInput
                label="Full Name"
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                style={styles.input}
                mode="outlined"
              />
            </Card.Content>
          </Card>
        );
      case 2:
        return (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Security Details</Text>
            <Card.Content>
              <TextInput
                label="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Confirm Password"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                style={styles.input}
                mode="outlined"
              />
            </Card.Content>
          </Card>
        );
      case 3:
        return (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Contact Information</Text>
            <Card.Content>
              <TextInput
                label="Address"
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Phone Number"
                value={formData.phoneNumber}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                style={styles.input}
                mode="outlined"
              />
            </Card.Content>
          </Card>
        );
      case 4:
        return (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Profile Picture</Text>
            <Card.Content style={styles.cameraContent}>
              <Button
                mode="contained"
                onPress={openCameraLib}
                style={styles.cameraButton}
                labelStyle={styles.buttonLabel}
                color="#0c7076"
              >
                Take Selfie
              </Button>
              {formData.selfie && (
                <Image
                  source={{ uri: formData.selfie }}
                  style={styles.selfieImage}
                />
              )}
            </Card.Content>
          </Card>
        );
      case 5:
        return (
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Review and Submit</Text>
            <Card.Content>
              <Text style={styles.reviewText}>Full Name: {formData.fullName}</Text>
              <Text style={styles.reviewText}>Email: {formData.email}</Text>
              <Text style={styles.reviewText}>Address: {formData.address}</Text>
              <Text style={styles.reviewText}>Phone Number: {formData.phoneNumber}</Text>
              {formData.selfie && (
                <Image
                  source={{ uri: formData.selfie }}
                  style={styles.selfieImage}
                />
              )}
            </Card.Content>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Account</Text>
        {renderProgressBar()}
      </View>
      {renderStepContent()}
      <View style={styles.fabContainer}>
        {step > 1 && (
          <FAB
            style={styles.fab}
            small
            icon="arrow-left"
            onPress={prevStep}
            color="#ffffff"
            label="Back"
          />
        )}
        {step < 5 ? (
          <FAB
            style={styles.fab}
            small
            icon="arrow-right"
            onPress={nextStep}
            color="#ffffff"
            label="Next"
          />
        ) : (
          <FAB
            style={styles.fab}
            small
            icon="check"
            onPress={handleSubmit}
            color="#ffffff"
            label="Sign Up"
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  progressBar: {
    alignSelf: 'center',
    marginVertical: 20,
    width: '80%',
  },
  card: {
    marginBottom: 30,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  buttonLabel: {
    fontSize: 18,
    color: "#fff",
  },
  reviewText: {
    fontSize: 16,
    color: "#212121",
    marginBottom: 10,
  },
  selfieImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  cameraContent: {
    alignItems: 'center',
  },
  fabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  fab: {
    backgroundColor: "#0c7076",
    margin: 10,
  },
});

export default SignUpScreen;
