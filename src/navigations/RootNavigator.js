import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import TabsNavigator from "./TabNavigator";
import YourShiftsScreen from "../screens/YourShiftsScreen";
import OpenShiftsScreen from "../screens/OpenShiftsScreen";
import OpenShiftDetailsScreen from "../screens/OpenShiftDetailsScreen";
import RequestedShiftsscreen from "../screens/RequestedShiftsscreen";
import ClockScreen from "../screens/ClockScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShiftScreen from "../screens/ShiftScreen";
import VideoScreen from "../screens/VideoScreen";
import { TabContextProvider } from "../context/TabContext";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <TabContextProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Root">
          <RootStack.Screen name="SignIn" component={SignInScreen} />
          <RootStack.Screen name="MainTabs" component={TabsNavigator} />
          <RootStack.Screen name="ClockScreen" component={ClockScreen} />
          <RootStack.Screen name="ProfileScreen" component={ProfileScreen} />
          <RootStack.Screen name="ShiftScreen" component={ShiftScreen} />
          <RootStack.Screen name="VideoScreen" component={VideoScreen} />
          <RootStack.Screen
            name="YourShiftsScreen"
            component={YourShiftsScreen}
          />
          <RootStack.Screen
            name="OpenShiftsScreen"
            component={OpenShiftsScreen}
          />
          <RootStack.Screen
            name="RequestedShiftsscreen"
            component={RequestedShiftsscreen}
          />
          <RootStack.Screen
            name="OpenShiftDetailsScreen"
            component={OpenShiftDetailsScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </TabContextProvider>
  );
};

export default RootNavigator;
