import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import OpenShiftsScreen from "./OpenShiftsScreen";
import CardItem from "../components/CardItem";
import TimeSheetScreen from "../screens/TimeSheetScreen";
import MyShiftScreen from "../screens/MyShiftsScreen";
import TabContainer from "../components/TabContainer";
import { COLORS } from "../theme/theme";

const ShiftScreen = ({ navigation }) => {
  const route = useRoute();
  const userInfo = route.params?.userInfo;
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [requestedShifts, setRequestedShifts] = useState([]);

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
            Alert.alert("SHIFT", "No shift details!!!", [
              {
                text: "Ok",
                style: "Ok",
              },
            ]);
            console.error("Error fetching shift details: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching shift IDs: ", error);
      });
  };

  const handleMyShift = async () => {
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
            const InProgressShifts = shiftDetails.filter(
              (shift) => shift.status === "INPROGRESS"
            );
            console.log(shiftDetails);
            console.log(shiftIds);
            navigation.navigate("MyShiftScreen", { InProgressShifts });
          })
          .catch((error) => {
            Alert.alert("SHIFT", "No shift details!!!", [
              {
                text: "Ok",
                style: "Ok",
              },
            ]);
            console.error("Error fetching shift details: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching shift IDs: ", error);
      });
  };

  return (
    <TabContainer>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <View style={styles.container1}>
            <CardItem
              imageSource={require("../../assets/open_shift.png")}
              heading="Open Shift"
              onPress={() => navigation.navigate("OpenShiftsScreen")}
            />
            <CardItem
              imageSource={require("../../assets/request_shift.png")}
              heading="Request Shift"
              onPress={() =>
                navigation.navigate("RequestedShiftsscreen", { userData })
              }
            />
          </View>
          <View style={styles.container1}>
            <CardItem
              imageSource={require("../../assets/completed_shift.png")}
              heading="Completed Shift"
              onPress={handleTimeSheet}
            />
            <CardItem
              imageSource={require("../../assets/ongoing_shift.png")}
              heading="My Shift"
              // onPress={() => navigation.navigate("YourShiftsScreen")}
              onPress={handleMyShift}
            />
          </View>
        </GestureHandlerRootView>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  container1: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default ShiftScreen;
