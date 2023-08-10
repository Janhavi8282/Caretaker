import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import ClockScreen from "../screens/ClockScreen";
import { COLORS } from "../theme/theme";

const MyShiftScreen = ({ navigation }) => {
  const route = useRoute();
  const InProgressShifts = route.params?.InProgressShifts;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <FlatList
        data={InProgressShifts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ClockScreen", {
                shiftId: `${item.shiftId}`,
              })
            }
          >
            <View style={{ padding: 10 }}>
              <View style={styles.itemContainer}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.dateText}>
                    {moment(item.date).format("ddd/D MM YYYY")}
                  </Text>
                  <Text style={styles.nameText}>{item.shiftName}</Text>
                  <Text style={styles.timeText}>{item.description}</Text>
                  {/* <Text style={styles.timeText}>
                  Clock In Time : {moment(item.startTime).format("hh:mm A")}
                </Text>
                <Text style={styles.timeText}>
                  Clock Out Time : {moment(item.endTime).format("hh:mm A")}
                </Text> */}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.shiftId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    // marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
  timeText: {
    fontSize: 18,
    color: "#333",
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
  },
});

export default MyShiftScreen;
