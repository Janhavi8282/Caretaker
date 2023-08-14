import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector } from "react-redux";
import { COLORS } from "../theme/theme";

const AddAvailibilityScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [date, setDate] = useState();
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [updateAvailability, setUpdatedAvailability] = useState("");
  const [availabilityId, setAvailabilityId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const addAvailability = {
    userId: userId,
    date: date,
    fromTime: fromTime,
    toTime: toTime,
  };
  const showAlert = () => {
    Alert.alert(
      "Please Enter values",
      "Need to fill all values to add availibilty",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleAddAvailability = async () => {
    console.log("Availability", userId);
    console.log("Availability", date);
    console.log("Availability", fromTime);
    console.log("Availability", toTime);
    //Make API call to update availablity
    if (date != null && fromTime != null && toTime != null) {
      try {
        const response = await fetch(
          `https://lifeshaderapi.azurewebsites.net/api/UserService/AddAvailibility?id=${userId}&date=${date}&fromTime=${fromTime}&toTime=${toTime}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              date: date,
              fromTime: fromTime,
              toTime: toTime,
            }),
          }
        );
        console.log("Response", response.ok);
        if (response.ok) {
          showSuccessBox();
          console.log("Data added");
        }
      } catch (error) {
        console.error("Error updating data", error);
      }
    } else {
      showAlert();
    }
  };

  //success box when shift is requested successfully
  const showSuccessBox = () => {
    Alert.alert(
      "Your availability is aaded successfully!!!",
      "Go back to availability screen",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("AvailabilityScreen"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          value={date}
          placeholder="e.g., 2023-08-14T03:22:20.431Z"
          onChangeText={(text) => setDate(text)}
          setValue={setDate}
        />
        <Text style={styles.label}>From Time:</Text>
        <TextInput
          style={styles.input}
          value={fromTime}
          placeholder="e.g., 2023-08-14T03:22:20.431Z"
          onChangeText={(text) => setFromTime(text)}
          setValue={setFromTime}
        />
        <Text style={styles.label}>To Time:</Text>
        <TextInput
          style={styles.input}
          value={toTime}
          placeholder="e.g., 2023-08-14T03:22:20.431Z"
          onChangeText={(text) => setToTime(text)}
          setValue={setToTime}
        />
        <CustomButton text="ADD" onPress={handleAddAvailability} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: COLORS.background,
  },
  infoContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: COLORS.blue,
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.white,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: COLORS.white,
    padding: 10,
    fontWeight: "bold",
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddAvailibilityScreen;
