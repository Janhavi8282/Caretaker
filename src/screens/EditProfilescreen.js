import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton/CustomButton";
import { useSelector, useDispatch } from "react-redux";

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

  const handleSaveChanges = () => {
    //Create the updated user object
    // const updatedUserDetails = {
    //   userId: userId,
    //   firstName,
    //   lastName,
    //   email,
    //   mobileNumber,
    // };

    //Send the updated user data to API
    fetch(
      "https://lifeshaderapi.azurewebsites.net/api/UserService/UpdateUser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserDetails),
      }
    )
      .then((response) => {
        //console.log("Response", response.data);
        setUpdateUser(response.data);
      })

      // .then((response) => {
      //   console.log(response);
      // })
      // .then((response) => {
      //   console.log("Response", response.json());
      //   dispatch(setUserData(response));
      //   navigation.navigate("ProfileScreen");
      // })
      // .then((data) => {
      //   //Handle the response from API
      //   console.log("User Updated Successfully", data);
      //   //Dispatch the action to update the Redux store with the new user data
      //   dispatch(setUserData(data));

      //   //Perform any necessary actions after successfull update
      //   navigation.navigate("ProfileScreen");
      // })
      .catch((error) => {
        //console.log("Error updating user", error);
        setErrorMessage("Values not updated");
        //Handle the error condition
      });
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
        //setIsEditing(false);
        console.log("Data updated");
      }
      // } else {
      //   // const errorResponse = await response.json();
      //   // console.error("Failed to update data", errorResponse);
      // }
    } catch (error) {
      console.error("Error updating availability data:", error);
    }
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
    backgroundColor: "#f2f6f7",
  },
  infoContainer: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#f2f6f7",
    width: "90%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
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
