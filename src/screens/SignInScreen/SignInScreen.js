import React, { useEffect } from "react";
import { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions } from "react-native";
import Logo from "../../../assets/loginImage.jpg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/core";
import HomeScreen from "../HomeScreen";
import axios from "axios";

const SignInScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //to check whether the user is valid and if is valid can be logged in then redirect to home screen
  const navigation = useNavigation();

  const { height } = useWindowDimensions(); //use the window dimensions for height so it will not affect when screen size changes

  const onSignInPressed = () => {
    console.log("SignIn Pressed");
    navigation.navigate("MainTabs",{
      screen: "HomeScreen",params:{user: {firstName: "AAA"}}
    })
    //Call Login API
    // axios.post('https://localhost:7041/api/Authentication/Login',{email: "nil@gmail.com", password: "1123"})
    // .then(response => {
    //   console.log("Success",response);
    //   if(Array.isArray(response.data) && response.data.length > 0){
    //     const user = response.data[0];
    //     navigation.navigate("Home",{user});
    //   }
    //   else{
    //     setError(true);
    //   }
    // })
    // .catch(error => {
    //   setError(true);
    //   console.log("Error",error)
    // })
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        setValue={setUserName}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        setValue={setPassword}
        secureTextEntry={true}
      />
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
});

export default SignInScreen;
