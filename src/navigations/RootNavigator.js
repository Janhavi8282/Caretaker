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
import NewsScreen from "../screens/NewsScreen";
import NewsDetailScreen from "../screens/NewsDetailScreen";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Root">
        <RootStack.Screen name="SignIn" component={SignInScreen} />
        <RootStack.Screen name="MainTabs" component={TabsNavigator} />
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="ClockScreen"
          component={ClockScreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="ShiftScreen"
          component={ShiftScreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="YourShiftsScreen"
          component={YourShiftsScreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="OpenShiftsScreen"
          component={OpenShiftsScreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="RequestedShiftsscreen"
          component={RequestedShiftsscreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="OpenShiftDetailsScreen"
          component={OpenShiftDetailsScreen}
          options={{ headerShown: true }}
        />
        <RootStack.Screen
          name="NewsScreen"
          component={NewsScreen}
          options={{ title: "News Screen" }}
        />
        <RootStack.Screen
          name="NewsDetailScreen"
          component={NewsDetailScreen}
          options={{ title: "News Details Screen" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
