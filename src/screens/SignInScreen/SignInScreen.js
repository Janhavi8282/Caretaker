import React, { useContext } from "react";
import { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Logo from "../../../assets/loginImage.jpg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../theme/theme";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  //to check whether the user is valid and if is valid can be logged in then redirect to home screen
  const navigation = useNavigation();

  const { height } = useWindowDimensions();

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
          //setUserInfo(userInfo);
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
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>WELCOME</Text>
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
            Invalid credentials! Please try again...
          </Text>
        )}
        <CustomButton text="LOGIN" onPress={onSignInPressed} />
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={onForgotPasswordPressed}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* <CustomButton
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.white,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    margin: 10,
    marginTop: 20,
  },
  forgotPasswordText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default SignInScreen;
