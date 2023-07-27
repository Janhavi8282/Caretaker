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

  // function to handle the start button press
  const handleStart = () => {
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
    setDisplayMessage("You are off Clock");

    setEndTime(new Date());
    clearInterval(timerRef.current);

    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);

    Alert.alert("Confirmation", "Are you sure you want to stop the clcok?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: handleConfirmation,
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
  // Function to handle the confirmation (when the user confirms)
  const handleConfirmation = async () => {
    // Perform the action you want after the user confirms (e.g., save data, delete data, etc.)
    // ...
    console.log(startTime);
    console.log(endTime);
    console.log("===========");
    console.log(realTimeData[0]);
    console.log(realTimeData[realTimeData.length - 1]);
    console.log(getTimeDifference());
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
          // onPress={() => this.props.navigation.navigate("TimeSheetScreen")}
          // onPress={() => navigation.navigate("TimeSheet")}
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
      <Text>{getTimeDifference()}</Text>
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
    alignItems: "center",
    padding: 10,
    marginTop: 16,
    fontSize: 50,
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
  },
  clockText: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 16,
  },
});
export default ClockScreen;
