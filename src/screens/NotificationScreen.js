import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import NotificationAlert from "../components/NotificationAlert";

const NotificationScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [notifications, setNotifications] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const fetchNotifications = () => {
    console.log(userId);
    fetch(
      `https://lifeshaderapi.azurewebsites.net/api/NotificationService/GetUserNotificationByUserID?id=${userId}`
    )
      .then((response) => response.json())

      .then(
        (data) => {
          console.log("Response", data);
          setIsLoading(false);
          setNotifications(data);
        },
        (error) => {
          setIsLoading(false);
          console.error("Error fetching notifications", error);
        }
      );
  };

  const showMessage = (header, message) => {
    setSelectedMessage({ header, message });
    setIsDetailsVisible(true);
  };

  const handleCloseNotification = () => {
    setIsDetailsVisible(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        notifications.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              showMessage(
                item.notifications[0].header,
                item.notifications[0].message
              )
            }
          >
            <Text style={styles.header}>{item.notifications[0].header}</Text>
            <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
              {item.notifications[0].message}
            </Text>
          </TouchableOpacity>
        ))
      )}
      <NotificationAlert
        visible={isDetailsVisible}
        header={selectedMessage?.header}
        message={selectedMessage?.message}
        onClose={handleCloseNotification}
      ></NotificationAlert>
    </View>
  );
};
// return <View style={styles.container}>{getContent()}</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: "#f2f6f7",
  },
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: "#ffffff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
  },
});

export default NotificationScreen;
