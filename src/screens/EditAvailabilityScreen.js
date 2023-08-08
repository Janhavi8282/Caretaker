import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector } from "react-redux";

const EditAvailabilityScreen = ({ route, navigation }) => {
  const { availability } = route.params;
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [date, setDate] = useState(availability.date);
  const [fromTime, setFromTime] = useState(availability.fromTime);
  const [toTime, setToTime] = useState(availability.toTime);
  const [updateAvailability, setUpdatedAvailability] = useState("");
  const [availabilityId, setAvailabilityId] = useState(null);
  const updatedUserAvailability = {
    userId: userId,
    date: date,
    fromTime: fromTime,
    toTime: toTime,
  };
  console.log("Updated availability", updatedUserAvailability);

  const handleUpdateAvailability = async (updatedUserAvailability) => {
    //console.log("Updated Availability", updatedUserAvailability);
    //Make API call to update availablity
    try {
      const response = await fetch(
        `https://lifeshaderapi.azurewebsites.net/api/UserService/UpdateAvailibility?id=${userId}&date=${availability.date}&fromTime=${availability.fromTime}&toTime=${availability.toTime}`,
        {
          method: "PUT",
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
      // console.log("Response", json.stringify(response));
      if (response.ok) {
        setUpdatedAvailability(updatedUserAvailability);
        //Data updated successfully
        showSuccessBox();
        console.log("Data updated");
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  //success box when shift is requested successfully
  const showSuccessBox = () => {
    Alert.alert(
      "Your availability is updated successfully!!!",
      "Go back to availability screen",
      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("AvailabilityScreen", {
              updateAvailability: updatedUserAvailability,
            }),
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
          onChangeText={(text) => setDate(text)}
          setValue={setDate}
        />
        <Text style={styles.label}>From Time:</Text>
        <TextInput
          style={styles.input}
          value={fromTime}
          onChangeText={(text) => setFromTime(text)}
          setValue={setFromTime}
        />
        <Text style={styles.label}>To Time:</Text>
        <TextInput
          style={styles.input}
          value={toTime}
          onChangeText={(text) => setToTime(text)}
          setValue={setToTime}
        />
      </View>
      <CustomButton text="Update" onPress={handleUpdateAvailability} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 5,
  },
  infoContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "black",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EditAvailabilityScreen;
