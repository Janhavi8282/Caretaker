// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import { COLORS } from "../theme/theme";
import Modal from "react-native-modal";
import TimeSheetScreen from "../screens/TimeSheetScreen";
import { useSelector } from "react-redux";

const ClockScreen = ({ navigation }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  const [displayMessage, setDisplayMessage] = useState("You are off Clock");

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const timerRef = useRef(null);
  const [realTimeData, setRealTimeData] = useState([]);
  const userData = useSelector((state) => state.userData);

  const [isClockIn, setIsClockIn] = useState(false);
  const [clockInData, setClockInData] = useState(null);

  // function to handle the start button press
  const handleStart = () => {
    Alert.alert("Confirmation", "Are you want to start your shift?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: handleClcokInConfirmation,
      },
    ]);
  };
  // function to handle the pause button press
  const handlePause = () => {
    setDisplayMessage("You are on Clock!");
    clearInterval(countRef.current);
    setIsPaused(true);
  };
  // function to handle the continue button press
  const handleContinue = () => {
    setDisplayMessage("You are on Clock!");
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };
  // function to handle the reset button press
  const handleStop = () => {
    Alert.alert("Confirmation", "Are you sure you want to stop the clcok?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: handleClcokOutConfirmation,
      },
    ]);
  };

  const getTimeDifference = () => {
    if (startTime && endTime) {
      const difference = endTime.getTime() - startTime.getTime();
      const seconds = Math.floor(difference / 1000);
      return `Time elapsed: await ${seconds} seconds`;
    }
    return "";
  };

  const handleClcokInConfirmation = async () => {
    setDisplayMessage("You are on Clock!");
    setIsActive(true);
    setIsPaused(false);

    setStartTime(new Date());
    setRealTimeData([]);

    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    timerRef.current = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setRealTimeData((prevData) => [...prevData, currentTime]);
    }, 1000);
    console.log(startTime);
    console.log(endTime);
    console.log(realTimeData[0]);
    console.log(realTimeData[realTimeData.length - 1]);
    console.log(getTimeDifference());
    fetch(
      "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/UpdateClockInTime",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentId: 2,
          clockInTime: new Date().toISOString(),
        }),
      }
    )
      .then((response) => response.json())
      .then((responseClockInData) => {
        console.log(JSON.stringify(responseClockInData));
      })
      .done();
  };
  const handleClcokOutConfirmation = async () => {
    setDisplayMessage("You are off Clock");

    setEndTime(new Date());
    clearInterval(timerRef.current);

    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);

    const payload = {
      assignmentId: 2,
      clockOutTime: new Date().toISOString(),
    };

    console.log(payload);
    fetch(
      "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/UpdateClockOutTime",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignmentId: 2,
          clockInTime: new Date().toISOString(),
        }),
      }
    )
      .then((response) => response.json())
      .then((responseClockOutData) => {
        console.log("===========");
        console.log(JSON.stringify(responseClockOutData));
      })
      .done();

    // try {
    //   const userId = userData.userID;
    //   const payload = {
    //     assignmentId: 3,
    //     clockOutTime: new Date().toISOString(),
    //   };
    //   const response = await fetch(
    //     "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/UpdateClockOutTime",
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(payload),
    //     }
    //   );

    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error("Error updating clock-out time: ", error);
    // }
  };

  const handleTimeSheet = async () => {
    const id = userData?.userId;
    console.log(userData?.userId);

    fetch(
      `https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetMyShifts?id=${id}`
    )
      .then((response) => response.json())
      .then((shiftIds) => {
        Promise.all(
          shiftIds.map((shiftId) => {
            console.log("==========");
            console.log(shiftId.shiftId);
            return fetch(
              `https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetShiftByID?id=${shiftId.shiftId}`
            ).then((response) => response.json());
          })
        )
          .then((shiftDetails) => {
            const completedShifts = shiftDetails.filter(
              (shift) => shift.status === "COMPLETE"
            );
            console.log(shiftDetails);
            console.log(shiftIds);
            navigation.navigate("TimeSheetScreen", { completedShifts });
          })
          .catch((error) => {
            console.error("Error fetching shift details: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching shift IDs: ", error);
      });
  };

  // calculate the time values for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.TimeSheetbutton}
          onPress={handleTimeSheet}
        >
          <Text style={styles.buttonText}>Time Sheet</Text>
        </TouchableOpacity>
        <Text style={styles.clockText}>{displayMessage}</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {!isActive && !isPaused ? (
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={handlePause}>
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleStop}>
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
              {isPaused && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleContinue}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    borderWidth: 4,
    borderColor: COLORS.teal,
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.teal,
  },
  timer: {
    fontSize: 50,
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    width: 90,
    height: 45,
    padding: 5,
    // borderRadius: 80 / 2,
    backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  TimeSheetbutton: {
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "center",
    padding: 10,
    fontSize: 50,
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
  },
  clockText: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 16,
    marginTop: 75,
  },
});
export default ClockScreen;
