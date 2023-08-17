import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector } from "react-redux";
import EditAvailabilityScreen from "./EditAvailabilityScreen";
import { COLORS } from "../theme/theme";
import AddAvailibilityScreen from "../screens/AddAvailability";

const AvailabilityScreen = ({ navigation, route }) => {
  const [availability, setAvailability] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchAvailability();
  }, []);

  //update the data with new availability
  // useEffect(() => {
  //   if (route.params?.updatedAvailability) {
  //     setAvailability((prevAvailability) => [
  //       ...prevAvailability,
  //       route.params.updatedAvailability,
  //     ]);
  //   }
  // }, [route.params?.updatedAvailability]);

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
      //console.log("Reponse", JSON.stringify(response));
      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  const handleEditAvailability = (availability) => {
    navigation.navigate("EditAvailabilityScreen", { availability });
  };
  const handleAddAvailibity = () => {
    navigation.navigate("AddAvailibilityScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {availability.map((item) => {
          //split date and day seperately
          const date = new Date(item.date);
          const dayOfWeek = date.toLocaleDateString("en-US", {
            weekday: "long",
          });
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
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Add Availability"
          onPress={() => handleAddAvailibity()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.background,
  },
  buttonContainer: {
    margin: 10,
  },
  ScrollViewcontainer: {
    flex: 1,
    margin: 5,
    backgroundColor: COLORS.background,
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
    paddingLeft: 20,
    paddingTop: 20,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    padding: 15,
    margin: 5,
    fontWeight: "bold",
    backgroundColor: COLORS.blue,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: "space-between",
  },
});

export default AvailabilityScreen;
