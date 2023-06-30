// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from "react-native";

const ClockScreen = ({ navigation }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  // function to handle the start button press
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };
  // function to handle the pause button press
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };
  // function to handle the continue button press
  const handleContinue = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };
  // function to handle the reset button press
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
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
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.Timebutton}
            // onPress={() => this.props.navigation.navigate("TimeSheetScreen")}
            // onPress={() => navigation.navigate("TimeSheet")}
          >
            <Text
              style={{
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Time Sheet
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            You are on Clock Screen
          </Text>

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
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                  <Text style={styles.buttonText}>Reset</Text>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    borderWidth: 4,
    borderColor: "black",
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    fontSize: 50,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  Timebutton: {
    alignItems: "center",
    padding: 10,
    width: 500,
    marginTop: 16,
    fontSize: 50,
  },
});
export default ClockScreen;
