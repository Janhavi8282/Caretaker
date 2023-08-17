import React, { useState } from "react";
import { View, Text, Button, Slider } from "react-native";
import axios from "axios";
// import { Slider } from "@react-native-community/slider";
import { useSelector } from "react-redux";

const WeeklyAvailability = () => {
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [availability, setAvailability] = useState({
    Monday: { start: 9, end: 17 },
    Tuesday: { start: 0, end: 0 },
    Wednesday: { start: 0, end: 0 },
    Thursday: { start: 0, end: 0 },
    Friday: { start: 0, end: 0 },
    Saturday: { start: 0, end: 0 },
    Sunday: { start: 0, end: 0 },
  });

  const handleSliderChange = (day, field, value) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [field]: value,
      },
    }));
  };

  const handleSaveAvailability = async () => {
    try {
      const dataToSend = {
        userId: userId,
        availibilities: availability,
      };
      // Send availability data to the API
      await axios.post(
        "https://lifeshaderapi.azurewebsites.net/api/UserService/AddAvailibility",
        dataToSend
      );
      console.log("Availability saved successfully.");
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  return (
    <View>
      {Object.keys(availability).map((day) => (
        <View key={day}>
          <Text>{day}</Text>
          <Text>Start Time: {availability[day].start}</Text>
          <Slider
            value={availability[day].start}
            minimumValue={0}
            maximumValue={24}
            step={1}
            onValueChange={(value) => handleSliderChange(day, "start", value)}
          />
          <Text>End Time: {availability[day].end}</Text>
          <Slider
            value={availability[day].end}
            minimumValue={0}
            maximumValue={24}
            step={1}
            onValueChange={(value) => handleSliderChange(day, "end", value)}
          />
        </View>
      ))}
      <Button title="Save Availability" onPress={handleSaveAvailability} />
    </View>
  );
};

export default WeeklyAvailability;
