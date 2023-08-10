import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import ShiftAlert from "../components/ShiftAlert";
import { COLORS } from "../theme/theme";

const RequestedShiftsscreen = ({ navigation }) => {
  const [requestedShifts, setRequestedShifts] = useState([]);
  const [shiftNames, setShiftNames] = useState({});
  const [shiftDescription, setShiftDescriptionNames] = useState({});
  const [date, setDate] = useState({});
  const [startTime, setStartTime] = useState({});
  const [endTime, setEndTime] = useState({});
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;

  useEffect(() => {
    fetch(
      `https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetMyRequestShifts?id=${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRequestedShifts(data);
        fetchShiftDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const fetchShiftDetails = (shifts) => {
    const shiftIds = shifts.map((shift) => shift.shiftId);

    const queryParams = shiftIds
      .map((shiftId) => `shiftId=${shiftId}`)
      .join("&");

    fetch(
      `https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetAvailableShifts?${queryParams}`
    )
      .then((response) => response.json())
      .then((data) => {
        const shiftNamesObject = {};
        const shiftDescriptionObject = {};
        const dateObject = {};
        const startTimeObject = {};
        const endTimeObject = {};
        data.forEach((shift) => {
          shiftNamesObject[shift.shiftId] = shift.shiftName;
          shiftDescriptionObject[shift.shiftId] = shift.description;
          dateObject[shift.shiftId] = shift.date;
          startTimeObject[shift.shiftId] = shift.startTime;
          endTimeObject[shift.shiftId] = shift.endTime;
        });
        setShiftNames(shiftNamesObject);
        setShiftDescriptionNames(shiftDescriptionObject);
        setDate(dateObject);
        setEndTime(startTimeObject);
        setStartTime(endTimeObject);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("shift Name", shiftNames);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [shiftIdAlert, setShiftIdAlert] = useState("");

  const handleShowAlert = (shiftId) => {
    setShiftIdAlert(shiftId);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {requestedShifts.map((shift) => (
        <View>
          <TouchableOpacity onPress={() => handleShowAlert(shift.shiftId)}>
            <View style={styles.rectangle} key={shift.shiftRequest}>
              <Text style={styles.text}>{shiftNames[shift.shiftId]}</Text>
              <Text style={styles.dateText}>
                {moment(shift.date).format("ddd/D MM YYYY")}
              </Text>
            </View>
            <ShiftAlert
              visible={showAlert}
              title="Shift Details"
              message={shiftNames[shiftIdAlert]}
              description={shiftDescription[shiftIdAlert]}
              date={`Date: ${moment(date[shiftIdAlert]).format(
                "ddd/D MM YYYY"
              )}`}
              startTime={`Start Time: ${moment(startTime[shiftIdAlert]).format(
                "hh:mm A"
              )}`}
              endTime={`End Time: ${moment(endTime[shiftIdAlert]).format(
                "hh:mm A"
              )}`}
              onClose={handleCloseAlert}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: 5,
    backgroundColor: COLORS.background,
  },
  infoContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  rectangle: {
    padding: 15,
    margin: 10,
    backgroundColor: COLORS.white,
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
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default RequestedShiftsscreen;
