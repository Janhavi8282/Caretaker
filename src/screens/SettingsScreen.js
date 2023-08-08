import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../components/store/actions";
import { COLORS } from "../theme/theme";
import TabContainer from "../components/TabContainer";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;

  const handleLogout = async () => {
    //Dispatch the logout action to clear user data
    dispatch(logoutUser());
    //Clear user data in AsyncStorage
    try {
      await AsyncStorage.removeItem("userInfo");
    } catch (e) {
      console.log("Error  clearing Asyncstorage");
    }
    //setIsLoggedIn(false);
    //Navigate to login screen
    navigation.navigate("SignInScreen", { screen: "SignInScreen" });
  };

  return (
    <TabContainer>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            style={styles.button}
          >
            <Text style={styles.text}>Profile</Text>
            <IconFontAwesome name="greater-than" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AvailabilityScreen")}
            style={styles.button}
          >
            <Text style={styles.text}>Availability</Text>
            <IconFontAwesome name="greater-than" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
            style={styles.button}
          >
            <Text style={styles.text}>Notification</Text>
            <IconFontAwesome name="greater-than" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.text}>Logout</Text>
            <IconFontAwesome name="greater-than" style={styles.icon} />
          </TouchableOpacity>
        </GestureHandlerRootView>
      </View>
    </TabContainer>
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

export default SettingsScreen;
