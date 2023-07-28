import React, { useContext } from "react";
import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Text,
} from "react-native";
import Logo from "../../../assets/loginImage.jpg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  //to check whether the user is valid and if is valid can be logged in then redirect to home screen
  const navigation = useNavigation();

  const { height } = useWindowDimensions(); //use the window dimensions for height so it will not affect when screen size changes

  //sign in button pressed
  const onSignInPressed = () => {
    if (!email || !password) {
      setError(true);
      return;
    }
    //Call Login API
    axios
      .post(
        "https://lifeshaderapi.azurewebsites.net/api/Authentication/Login",
        { email, password }
      )
      .then((response) => {
        //console.log("Success",response);
        if (Array.isArray(response.data) && response.data.length > 0) {
          let userInfo = response.data[0];
          setUserInfo(userInfo);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)).then(
            () => {
              //console.log(userInfo);
              navigation.navigate("MainTabs", {
                userInfo,
              }); //save user info to Async Storage
            }
          );
        } else {
          console.log("error");
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
        console.log("Error", error);
      });
  };

  //forgot password pressed
  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
    navigation.navigate("ForgotPasswordScreen");
  };

  return (
    <View style={styles.root}>
      {/* inserting image in the screen */}
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }, { marginTop: 80 }]} //30% of the height of the window
        resizeMode="contain"
      />

      {/* inserting custominput for the textbox in the screen */}
      <CustomInput
        placeholder="Username"
        value={email}
        onChangeText={(text) => setEmail(text)}
        setValue={setEmail}
      />

      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        setValue={setPassword}
        secureTextEntry={true}
      />

      {error && (
        <Text style={styles.errorText}>
          Invalid credentials.Please try again.
        </Text>
      )}
      <CustomButton text="Sign In" onPress={onSignInPressed} />

      <CustomButton
        text="Forgot Password?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: "50%",
    maxWidth: 300,
    maxHeight: 200,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignInScreen;
