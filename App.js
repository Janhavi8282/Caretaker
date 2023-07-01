import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ShiftScreen from "./src/screens/ShiftScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import YourShiftsScreen from "./src/screens/YourShiftsScreen";
import OpenShiftsScreen from "./src/screens/OpenShiftsScreen";
import RequestedShiftsscreen from "./src/screens/RequestedShiftsscreen";
import RootNavigator from "./src/navigations/RootNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <RootNavigator />

  );
};

export default App;
