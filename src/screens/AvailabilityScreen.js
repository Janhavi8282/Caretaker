import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector } from "react-redux";
import EditAvailabilityScreen from "./EditAvailabilityScreen";

const AvailabilityScreen = ({ navigation }) => {
  const [availability, setAvailability] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [refresh, setRefresh] = useState(false);

  const handleEditAvailability = (item) => {
    console.log("Item", item);
    setSelectedItem(item);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    fetchAvailability();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  //fetch availability from API
  const fetchAvailability = async () => {
    try {
      const response = await fetch(
        `https://lifeshaderapi.azurewebsites.net/api/UserService/GetUserAvailabilityByID?id=${userId}`
      );
      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  const handleSaveAvailability = async (editedAvailability) => {
    console.log("Availability", editedAvailability);
    // const editedAvailabilityUTC = {
    //   date: new Date(editedAvailability.date).toISOString(),
    //   fromTime: new Date(editedAvailability.fromTime).toISOString(),
    //   toTime: new Date(editedAvailability.toTime).toISOString(),
    // };
    try {
      const { date, fromTime, toTime } = editedAvailability;
      console.log("Values", userId, date, fromTime, toTime);
      const response = await fetch(
        `https://lifeshaderapi.azurewebsites.net/api/UserService/UpdateAvailibility?id=${userId}&date=${date}&fromTime=${fromTime}&toTime=${toTime}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedAvailability),
        }
      );
      if (response.ok) {
        setAvailability([editedAvailability]);
        // const data = await response.json();
        // setAvailability(data);
        //Data updated successfully
        setIsEditing(false);
        console.log("Data updated");
      } else {
        const textResponse = await response.text();
        console.error(
          "Failed to update data- Validation error ",
          response.status,
          textResponse
        );
      }
    } catch (error) {
      console.error("Error updating availability data:", error);
    }
  };

  if (isEditing && selectedItem) {
    console.log("Inside editing");
    return (
      <EditAvailabilityScreen
        date={selectedItem.date}
        fromTime={selectedItem.fromTime}
        toTime={selectedItem.toTime}
        onSave={handleSaveAvailability}
      />
    );
  }
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
    >
      {availability.map((item) => {
        //split date and day seperately
        const date = new Date(item.date);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        return (
          <View style={styles.infoContainer} key={item.availabilityId}>
            <Text style={styles.text}>{formattedDate}</Text>
            <Text style={styles.text}>{dayOfWeek}</Text>
            <Text style={styles.text}>
              From: {new Date(item.fromTime).toLocaleTimeString()}
            </Text>
            <Text style={styles.text}>
              To: {new Date(item.toTime).toLocaleTimeString()}
            </Text>
            <CustomButton
              text="Edit Availability"
              onPress={() => handleEditAvailability(item)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
  },
  columns: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    padding: 15,
    margin: 5,
    backgroundColor: "#87CEEB",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: "space-between",
  },
});

export default AvailabilityScreen;
