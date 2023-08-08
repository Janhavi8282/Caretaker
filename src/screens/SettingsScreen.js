import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IconFontAwesome from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../theme/theme";
import TabContainer from "../components/TabContainer";

const SettingsScreen = ({ navigation }) => {
  return (
    <TabContainer>
      <View style={styles.container}>
        <GestureHandlerRootView>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutScreen")}
            style={styles.button}
          >
            <IconFontAwesome name="user-circle" style={styles.icon} />
            <Text style={styles.text}>About</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate("AvailabilityScreen")}
            style={styles.button}
          >
            <IconFontAwesome name="greater-than" style={styles.icon} />
            <Text style={styles.text}>Availability</Text>
          </TouchableOpacity> */}
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
  button: {
    padding: 25,
    margin: 10,
    backgroundColor: "#ffffff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    // justifyContent: "space-between",
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
    marginLeft: 10,
  },
  icon: {
    fontSize: 20,
    color: COLORS.dark,
  },
});

export default SettingsScreen;
