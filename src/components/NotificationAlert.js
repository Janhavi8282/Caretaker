import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const NotificationAlert = ({ visible, header, message, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{header}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  alertBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  detail: {
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "pink",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default NotificationAlert;
