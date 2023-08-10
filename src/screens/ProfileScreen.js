import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { COLORS } from "../theme/theme";
import TabContainer from "../components/TabContainer";

const ProfileScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;

  return (
    <TabContainer>
      <View style={styles.container}>
        <View style={styles.photo}>
          <View style={styles.circle}>
            <Image
              source={require("../../assets/profile.jpg")}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.name}>
              {userData?.firstName} {userData?.lastName}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <View style={styles.row}>
              <Text style={styles.heading}>Email:</Text>
              <Text style={styles.text}>{userData?.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.heading}>Phone: </Text>

              <Text style={styles.text}>{userData?.mobileNumber}</Text>
            </View>

            <GestureHandlerRootView>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditProfilescreen", { userData })
                }
                style={styles.button}
              >
                <Text style={styles.btnText}>EDIT</Text>
              </TouchableOpacity>
            </GestureHandlerRootView>
          </View>
        </View>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  box: {
    flex: 0.3,
    backgroundColor: COLORS.blue,
    borderBottomRightRadius: 95,
    justifyContent: "flex-end",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
  },
  viewBox: {
    padding: 10,
  },
  view: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
  },
  photo: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -50,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    shadowRadius: 5,
    marginTop: 60,
    padding: 1,
    elevation: 8,
  },
  name: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  info: {
    marginBottom: 15,
  },
  infoContainer: {
    margin: 15,
    marginTop: 30,
    padding: 20,
    backgroundColor: COLORS.blue,
    borderRadius: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    // gap: 120,
    // alignContent: "space-between",
  },
  icon: {
    alignItems: "center",
  },
  divider: {
    borderBottomWidth: 0.5,
  },
  button: {
    backgroundColor: COLORS.white,
    // color: COLORS.blue,
    height: 50,
    width: 200,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  textView: {
    padding: 8,
    margin: 5,
    // backgroundColor: COLORS.white,
    color: COLORS.white,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnText: {
    color: COLORS.blue,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
