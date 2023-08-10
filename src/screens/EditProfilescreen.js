import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../theme/theme";

const EditProfilescreen = ({ route, navigation }) => {
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  // const firstName = userData?.firstName;
  // const lastName = userData?.lastName;
  // const email = userData?.email;
  // const mobileNumber = userData?.mobileNumber;

  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [email, setEmail] = useState(userData?.email);
  const [mobileNumber, setMobileNumber] = useState(userData?.mobileNumber);
  const [errorMessage, setErrorMessage] = useState("");
  //dispatch function is used to dispatch actions to update the state in the store.
  const dispatch = useDispatch();
  const [updateuser, setUpdateUser] = useState("");
  const updatedUserDetails = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobileNumber: mobileNumber,
  };

  const handleSaveAvailability = async (updatedUserDetails) => {
    //console.log("USer", updatedUserDetails);
    try {
      const response = await fetch(
        `https://lifeshaderapi.azurewebsites.net/api/UserService/UpdateUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: mobileNumber,
            type: "C",
          }),
        }
      );
      //console.log("Response", response);
      if (response.ok) {
        setUpdateUser([updatedUserDetails]);
        //Data updated successfully
        showSuccessBox();
        console.log("Data updated");
      }
    } catch (error) {
      console.error("Error updating availability data:", error);
    }
  };

  //success box when shift is requested successfully
  const showSuccessBox = () => {
    Alert.alert(
      "Your profile is updated successfully!!!",
      "Go back to profile screen",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("ProfileScreen"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.textInput}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          setValue={setFirstName}
        />

        <TextInput
          style={styles.textInput}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          setValue={setLastName}
        />

        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          setValue={setEmail}
        />

        <TextInput
          style={styles.textInput}
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
          setValue={setMobileNumber}
        />

        <CustomButton text="SAVE" onPress={handleSaveAvailability} />
      </View>
      <Text>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 5,
    backgroundColor: COLORS.background,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 15,
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: COLORS.white,
    width: "90%",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#fcdb67",
    height: 60,
    width: 200,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
});

export default EditProfilescreen;
