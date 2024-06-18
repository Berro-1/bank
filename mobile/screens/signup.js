import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, ActivityIndicator } from "react-native";
import { TextInput, Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';

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
    idFront: null,
    idBack: null,
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: step - 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const openCameraLib = async (field) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.assets[0].uri;
      setFormData({ ...formData, [field]: uri });
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressBarContainer}>
      {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
        <React.Fragment key={num}>
          <Animated.View style={[
            styles.progressBarStep, 
            {
              backgroundColor: progress.interpolate({
                inputRange: [index - 1, index],
                outputRange: ['#e0e0e0', '#0c7076'],
                extrapolate: 'clamp'
              })
            }
          ]}>
            <Text style={styles.progressBarText}>{num}</Text>
          </Animated.View>
          {index < 6 && <Animated.View style={[
            styles.progressBarLine, 
            {
              backgroundColor: progress.interpolate({
                inputRange: [index, index + 1],
                outputRange: ['#e0e0e0', '#0c7076'],
                extrapolate: 'clamp'
              })
            }
          ]} />}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card style={styles.card}>
            <View style={styles.descriptionContainer}>
              <Icon name="info-outline" size={24} color="#0c7076" style={styles.descriptionIcon} />
              <Text style={styles.description}>Please enter your full name and email to get started.</Text>
            </View>
            <Card.Content>
              <TextInput
                label="Full Name"
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
                style={styles.input}
                mode="outlined"
                error={!!errors.fullName}
              />
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
              <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </Card.Content>
          </Card>
        );
      case 2:
        return (
          <Card style={styles.card}>
            <View style={styles.descriptionContainer}>
              <Icon name="lock-outline" size={24} color="#0c7076" style={styles.descriptionIcon} />
              <Text style={styles.description}>Set a strong password for your account.</Text>
            </View>
            <Card.Content>
              <TextInput
                label="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                style={styles.input}
                mode="outlined"
                error={!!errors.password}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <TextInput
                label="Confirm Password"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                style={styles.input}
                mode="outlined"
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </Card.Content>
          </Card>
        );
      case 3:
        return (
          <Card style={styles.card}>
            <View style={styles.descriptionContainer}>
              <Icon name="home" size={24} color="#0c7076" style={styles.descriptionIcon} />
              <Text style={styles.description}>Enter your address and phone number.</Text>
            </View>
            <Card.Content>
              <TextInput
                label="Address"
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
                style={styles.input}
                mode="outlined"
                error={!!errors.address}
              />
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
              <TextInput
                label="Phone Number"
                value={formData.phoneNumber}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                style={styles.input}
                mode="outlined"
                keyboardType="phone-pad"
                error={!!errors.phoneNumber}
              />
              {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
            </Card.Content>
          </Card>
        );
      case 4:
        return (
          <Card style={styles.card}>
            <View style={styles.descriptionContainer}>
              <Icon name="message" size={24} color="#0c7076" style={styles.descriptionIcon} />
              <Text style={styles.description}>Enter the OTP sent to your email or phone.</Text>
            </View>
            <Card.Content>
              <TextInput
                label="OTP"
                value={formData.otp}
                onChangeText={(text) => handleChange("otp", text)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.otp}
              />
              {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}
            </Card.Content>
          </Card>
        );
      case 5:
        return (
          <Card style={styles.card}>
            <View style={styles.descriptionContainer}>
              <Icon name="camera-alt" size={24} color="#0c7076" style={styles.descriptionIcon} />
              <Text style={styles.description}>Take a selfie to complete your profile.</Text>
            </View>
            <Card.Content style={styles.cameraContent}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => openCameraLib("selfie")}
              >
                <Icon name="camera-alt" size={24} color="#fff" />
                <Text style={styles.cameraButtonText}>Take Selfie</Text>
              </TouchableOpacity>
              {formData.selfie && (
                <Image
                  source={{ uri: formData.selfie }}
                  style={styles.selfieImage}
                />
              )}
              {errors.selfie && <Text style={styles.errorText}>{errors.selfie}</Text>}
            </Card.Content>
          </Card>
        );
      case 6:
        return (
          <Card style={styles.card}>
            <View style={styles.descriptionContainer}>
              <Icon name="verified-user" size={24} color="#0c7076" style={styles.descriptionIcon} />
              <Text style={styles.description}>Upload the front and back of your ID for KYC verification.</Text>
            </View>
            <Card.Content style={styles.cameraContent}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => openCameraLib("idFront")}
              >
                <Icon name="camera-alt" size={24} color="#fff" />
                <Text style={styles.cameraButtonText}>Upload ID Front</Text>
              </TouchableOpacity>
              {formData.idFront && (
                <Image
                  source={{ uri: formData.idFront }}
                  style={styles.selfieImage}
                />
              )}
              {errors.idFront && <Text style={styles.errorText}>{errors.idFront}</Text>}
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => openCameraLib("idBack")}
              >
                <Icon name="camera-alt" size={24} color="#fff" />
                <Text style={styles.cameraButtonText}>Upload ID Back</Text>
              </TouchableOpacity>
              {formData.idBack && (
                <Image
                  source={{ uri: formData.idBack }}
                  style={styles.selfieImage}
                />
              )}
              {errors.idBack && <Text style={styles.errorText}>{errors.idBack}</Text>}
            </Card.Content>
          </Card>
        );
      case 7:
        return (
          <Card style={styles.card}>
            <View style={styles.descriptionContainer}>
              <Icon name="check-circle" size={24} color="#0c7076" style={styles.descriptionIcon} />
              <Text style={styles.description}>Review your details before submitting.</Text>
            </View>
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
              {formData.idFront && (
                <Image
                  source={{ uri: formData.idFront }}
                  style={styles.selfieImage}
                />
              )}
              {formData.idBack && (
                <Image
                  source={{ uri: formData.idBack }}
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
      </View>
      {renderProgressBar()}
      {renderStepContent()}
      <View style={styles.fabContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.fab} onPress={prevStep}>
            <Icon name="arrow-back" size={24} color="#fff" />
            <Text style={styles.fabText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 7 ? (
          <TouchableOpacity style={styles.fab} onPress={nextStep}>
            <Icon name="arrow-forward" size={24} color="#fff" />
            <Text style={styles.fabText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.fab} onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="check" size={24} color="#fff" />
                <Text style={styles.fabText}>Sign Up</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
      {success && (
        <LottieView
          source={{ uri: 'https://lottie.host/9e8749e0-7595-46e0-8099-f134870082ed/SFvosT2DYa.json' }}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setTimeout(() => {
              setSuccess(false);
            }, 1000); // Show the success animation for 1 second after it finishes
          }}
          style={styles.lottieView}
        />
      )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  progressBarStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarStepActive: {
    backgroundColor: '#0c7076',
  },
  progressBarLine: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
  },
  progressBarLineActive: {
    backgroundColor: '#0c7076',
  },
  progressBarText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    marginBottom: 30,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    marginBottom: 5,
    backgroundColor: "#ffffff",
  },
  buttonLabel: {
    fontSize: 18,
    color: "#fff",
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#0c7076",
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
  fabText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#0c7076",
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  cameraButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  descriptionIcon: {
    marginRight: 10,
  },
  description: {
    fontSize: 18,
    color: "#333",
    textAlign: 'center',
    flex: 1,
  },
  lottieView: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
});

export default SignUpScreen;
