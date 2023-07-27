import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

const RequestedShiftsscreen = ({ navigation }) => {
  const route = useRoute();
  const [requestedShifts, setRequestedShifts] = useState([]);
  const [shiftNames, setShiftNames] = useState({});
  const userInfo = route.params?.userInfo;
  const { userId } = userInfo;

  useEffect(() => {
    //API call to fetch data
    fetch(
      `https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetMyRequestShifts?id=${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        //update the state with received data
        setRequestedShifts(data);

        //Fetch shift names
        fetchShiftDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]); //This effect will re-run when user id changes

  const fetchShiftDetails = (shifts) => {
    //Extract shift IDs from the received shifts data
    const shiftIds = shifts.map((shift) => shift.shiftId);

    const queryParams = shiftIds
      .map((shiftId) => `shiftId=${shiftId}`)
      .join("&");

    //Make API call to get shift names based on ID
    fetch(
      `https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetAvailableShifts?${queryParams}`
    )
      .then((response) => response.json())
      .then((data) => {
        //Transform the data to an object with shiftId as key and shiftName as value
        const shiftNamesObject = {};
        data.forEach((shift) => {
          shiftNamesObject[shift.shiftId] = shift.shiftName;
        });

        //Update the state for shift name
        setShiftNames(shiftNamesObject);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {requestedShifts.map((shift) => (
        <View style={styles.rectangle}>
          <Text key={shift.shiftRequest} style={styles.text}>
            {shiftNames[shift.shiftId]}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    backgroundColor: "#f2f6f7",
  },
  infoContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  rectangle: {
    padding: 15,
    margin: 10,
    backgroundColor: "#f2f6f7",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    backgroundColor: "#fcdb67",
    height: 60,
    width: 200,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#ffffff",
  },
});

export default RequestedShiftsscreen;
