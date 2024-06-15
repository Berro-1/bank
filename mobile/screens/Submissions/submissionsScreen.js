import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { getSubmissions, submitNewAccountDetails, submitCreditCardDetails } from "../../store/submissions/submissionsActions";
import ApplySubmissionModal from "./ApplySubmissionModal";

const StatusIndicator = ({ status }) => {
  const backgroundColor =
    status === "Approved"
      ? "#4CAF50" // Green
      : status === "Rejected"
      ? "#F44336" // Red
      : "#F6B000"; // Default color (yellow)

  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor,
        marginRight: 10,
      }}
    />
  );
};

const SubmissionsScreen = () => {
  const dispatch = useDispatch();
  const { loading, submissions } = useSelector((state) => state.submissions);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("All"); // Default filter

  useEffect(() => {
    dispatch(getSubmissions('66577a78511763b4296b4311'));
  }, [dispatch]);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleFormSubmit = (formDetails) => {
    const userId = '66577a78511763b4296b4311';
    switch (formDetails.requestType) {
      case "Credit Card":
        dispatch(submitCreditCardDetails(formDetails, userId));
        break;
      case "Loan": // Changed from "New Account" to "Loan"
        dispatch(submitNewAccountDetails(formDetails, userId));
        break;
      case "Savings": // Added case for Savings
        dispatch(submitNewAccountDetails(formDetails, userId));
        break;
      default:
        break;
    }
    toggleModal();
  };

  const filteredSubmissions = () => {
    switch (filter) {
      case "Accepted":
        return submissions.filter(item => item.status === "Approved");
      case "Pending":
        return submissions.filter(item => item.status === "Pending");
      case "Rejected":
        return submissions.filter(item => item.status === "Rejected");
      default:
        return submissions;
    }
  };

  const renderSubmission = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <StatusIndicator status={item.status} />
        <View style={styles.textContainer}>
          <Text style={styles.requestType}>
            {item.details.requestType === "New Account" ? 
              item.details.accountType : item.details.requestType}
          </Text>
          <Paragraph>
            Amount: ${item.details.creditLimit || item.details.amount || "0"}
          </Paragraph>
          <Paragraph>
            Status: {item.status}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Submissions</Text>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "All" && styles.activeFilter]}
          onPress={() => setFilter("All")}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Accepted" && styles.activeFilter]}
          onPress={() => setFilter("Accepted")}
        >
          <Text style={styles.filterText}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Pending" && styles.activeFilter]}
          onPress={() => setFilter("Pending")}
        >
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "Rejected" && styles.activeFilter]}
          onPress={() => setFilter("Rejected")}
        >
          <Text style={styles.filterText}>Rejected</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredSubmissions()}
          renderItem={renderSubmission}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <ApplySubmissionModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onSubmit={handleFormSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#0c7076",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#333A45",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  activeFilter: {
    backgroundColor: "#4CAF50",
  },
  listContent: {
    paddingBottom: 100, // Adjusted to accommodate apply button
    paddingHorizontal: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  requestType: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButton: {
    backgroundColor: "#0c7076",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SubmissionsScreen;
