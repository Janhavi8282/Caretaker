import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector } from "react-redux";

const EditAvailabilityScreen = ({ date, fromTime, toTime, onSave }) => {
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [editedDate, setEditedDate] = useState(new Date(date).toISOString());
  const [editedFromTime, setEditedFromTime] = useState(
    new Date(fromTime).toISOString()
  );
  const [editedToTime, setEditedToTime] = useState(
    new Date(toTime).toISOString()
  );
  //set initial values for editedAvailability when availability is not available
  //console.log("edited", editedAvailability);

  const handleSave = () => {
    const editedAvailability = {
      date: editedDate,
      fromTime: editedFromTime,
      toTime: editedToTime,
      userId: userId,
    };
    console.log(date, fromTime, toTime, userId);
    //perform any validation before saving data
    onSave(editedAvailability);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          value={editedDate}
          onChangeText={setEditedDate}
        />
        <Text style={styles.label}>From Time:</Text>
        <TextInput
          style={styles.input}
          value={editedFromTime}
          onChangeText={setEditedFromTime}
        />
        <Text style={styles.label}>To Time:</Text>
        <TextInput
          style={styles.input}
          value={editedToTime}
          onChangeText={setEditedToTime}
        />
      </View>
      <CustomButton text="Submit" onPress={handleSave} />
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
