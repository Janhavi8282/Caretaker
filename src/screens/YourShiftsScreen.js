import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const YourShiftsScreen = ({ navigation }) => {
  //use state will show the loading state of api. It si set true so it will show the activity indicator for the first
  let [isLoading, setIsLoading] = useState(true);
  //state for error if we get any error while api calling
  let [error, setError] = useState();
  //state for response that we get from api
  let [response, setResponse] = useState();
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;

  useEffect(() => {
    const fetchShiftsData = async () => {
      try {
        const [yourShiftsResponse, availableShiftsResponse] = await Promise.all(
          [
            fetch(
              `https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetMyShifts?id=${userId}`
            ),
            fetch(
              "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetAvailableShifts"
            ),
          ]
        );
        const yourShiftsData = await yourShiftsResponse.json();
        const availableShiftsData = await availableShiftsResponse.json();
        const mergedData = yourShiftsData.map((userShift) => {
          const matchingShift = availableShiftsData.find(
            (availableShift) => availableShift.shiftId == userShift.shiftId
          );
          return {
            ...userShift,
            shiftName: matchingShift
              ? matchingShift.shiftName
              : "Unknown Shift",
          };
        });
        setIsLoading(false);
        setResponse(mergedData);
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "Error fetching data");
      }
    };
    fetchShiftsData();
  }, [userId]);

  //Helper function to format the time in HH:mm format
  const formatTime = (dateTime) => {
    const dateObj = new Date(dateTime);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //Helper function to format the date in YYYY-MM-DD format
  const formatDate = (dateTime) => {
    const dateObj = new Date(dateTime);
    return dateObj.toISOString().split("T")[0];
  };

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    //console.log(response);
    if (!response) {
      return <Text>No shifts available</Text>;
    }

    return (
      <View>
        {response.map((shift) => (
          <View key={shift.shiftId} style={styles.columns}>
            <Text style={styles.text}>Shift Name: {shift.shiftName}</Text>
            <Text style={styles.text}>
              Shift Date: {formatDate(shift.clockInTime)}
            </Text>
            <Text style={styles.text}>
              Clock-in Time:
              {formatTime(shift.clockInTime)}
            </Text>
            <Text>Clock-out Time: {formatTime(shift.clockOutTime)}</Text>
          </View>
        ))}

        {/*<Divider style={styles.divider}/>*/}
      </View>
    );
  };
  return <View style={styles.container}>{getContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f6f7",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
  },
  columns: {
    flexDirection: "column",
    padding: 15,
    margin: 10,
    backgroundColor: "#ffffff",
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
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },

  divider: {
    borderBottomWidth: 0.5,
  },
});

export default YourShiftsScreen;
