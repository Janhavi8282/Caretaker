import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import OpenShiftsScreen from "./OpenShiftsScreen";

const ShiftScreen = ({ navigation }) => {
  const route = useRoute();
  const userInfo = route.params?.userInfo;
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  const [requestedShifts, setRequestedShifts] = useState([]);
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <TouchableOpacity
          onPress={() => navigation.navigate("YourShiftsScreen")}
          style={styles.button}
        >
          <Text style={styles.text}>Your shifts</Text>
          <IconFontAwesome name="greater-than" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OpenShiftsScreen", {
              userData: userData,
              requestedShifts: requestedShifts,
            })
          }
          style={styles.button}
        >
          <Text style={styles.text}>Open shifts</Text>
          <IconFontAwesome name="greater-than" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RequestedShiftsscreen", { userData })
          }
          style={styles.button}
        >
          <Text style={styles.text}>Requested shifts</Text>
          <IconFontAwesome name="greater-than" style={styles.icon} />
        </TouchableOpacity>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f6f7",
  },
  button: {
    padding: 25,
    margin: 10,
    backgroundColor: "#ffffff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
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
  icon: {
    fontSize: 20,
    color: "#fcdb67",
  },
});

export default ShiftScreen;
