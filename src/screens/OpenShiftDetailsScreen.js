import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const OpenShiftDetailsScreen = ({ navigation, route }) => {
  const route1 = useRoute();
  //use state will show the loading state of api. It si set true so it will show the activity indicator for the first
  let [isLoading, setIsLoading] = useState(true);
  //state for error if we get any error while api calling
  let [error, setError] = useState();
  //state for response that we get from api
  let [response, setResponse] = useState();
  const userData = useSelector((state) => state.userData);

  let [shift, setShift] = useState(null);
  //getting the shift id
  const { shiftId } = route.params;
  const userInfo = route.params?.userInfo;
  const { userId } = userInfo;

  //getting the details of available shifts
  useEffect(() => {
    fetch(
      "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetAvailableShifts"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          //console.log(response);
          const shiftClicked = result.find(
            (shift) => shift.shiftId == parseInt(shiftId)
          );
          if (shiftClicked) {
            setShift(shiftClicked);
          } else {
            setError("Shift not found");
          }
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, [shiftId]);

  //posting the data to requested shifts when the button is clicked
  const handleRequestShift = () => {
    //If shift is not available or data is not loaded, do nothing
    try {
      fetch(
        "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/RequestShift",
        {
          method: "POST",
          headers: {
            Accept: "application/json", //accept json
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shiftId: shiftId,
            userId: userId,
          }),
        }
      ).then((response) => {
        if (response.status === 200) {
          showSuccessBox(); //show success message
        }
      });
      //console.log("User", userId);
    } catch (e) {
      console.log(e);
    }
  };

  //success box when shift is requested successfully
  const showSuccessBox = () => {
    Alert.alert("Your Shift is Requested", "Go back to shifts screen", [
      {
        text: "OK",
        onPress: () => navigation.navigate("ShiftScreen"),
      },
    ]);
  };

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    if (!shift) {
      return <Text>Shift not found</Text>;
    }
    //Render shift details
    //for getting the month from date
    const shiftDate = new Date(shift.date);

    //for getting the shift date and if single digit then padded with 0
    const date1 = shiftDate.getDate().toString().padStart(2, "0");

    //Helper function to get the ordinal suffix  for the day number
    const getOrdinalSuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const dayOfWeek = shiftDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const date = `${shiftDate.getDate()}${getOrdinalSuffix(
      shiftDate.getDate()
    )} ${shiftDate.toLocaleString("default", { month: "long" })}`;

    //start time of shift
    const startTime = new Date(shift.startTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const endTime = new Date(shift.endTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    //start and end time
    const timeRange = `${startTime} - ${endTime}`;

    //address
    const address = shift.location.address;

    return (
      <GestureHandlerRootView>
        <View style={styles.infoContainer}>
          <View style={styles.rectangle}>
            <Text style={styles.text}>{shift.shiftName}</Text>
            <Text>{shift.description}</Text>
            <Text>{dayOfWeek} </Text>
            <Text>{timeRange} </Text>
            <Text>{address}</Text>
          </View>

          <Pressable style={styles.button} onPress={handleRequestShift}>
            <Text style={styles.buttonText}>REQUEST</Text>
          </Pressable>
        </View>
      </GestureHandlerRootView>
    );
  };

  return <View style={styles.container}>{getContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    margin: 5,
    width: "100%",
    height: "100%",
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

export default OpenShiftDetailsScreen;
