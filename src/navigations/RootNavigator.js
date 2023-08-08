import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import TabNavigator from "./TabNavigator";
import YourShiftsScreen from "../screens/YourShiftsScreen";
import OpenShiftsScreen from "../screens/OpenShiftsScreen";
import OpenShiftDetailsScreen from "../screens/OpenShiftDetailsScreen";
import RequestedShiftsscreen from "../screens/RequestedShiftsscreen";
import ClockScreen from "../screens/ClockScreen";
import ShiftScreen from "../screens/ShiftScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AvailabilityScreen from "../screens/AvailabilityScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewsScreen from "../screens/NewsScreen";
import NewsDetailScreen from "../screens/NewsDetailScreen";
import { TabContextProvider } from "../context/TabContext";
import TimeSheetScreen from "../screens/TimeSheetScreen";
import VideoScreen from "../screens/VideoScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import AboutScreen from "../screens/AboutScreen";
import MyShiftScreen from "../screens/MyShiftsScreen";
import VideoPlayer from "../components/VideoPlayer";
import NotificationScreen from "../screens/NotificationScreen";
import NotificationDetailsScreen from "../screens/NotificationDetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditProfilescreen from "../screens/EditProfilescreen";
import EditAvailabilityScreen from "../screens/EditAvailabilityScreen";
import { COLORS } from "../theme/theme";
import { useDispatch } from "react-redux";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  //state to track the user's authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo != null) {
          setIsLoggedIn(true);
          console.log(isLoggedIn);
        }
      } catch (error) {
        console.log("Error retrieving user info from Async Storage", error);
      }
    };
    checkUserLoggedIn();
  }, []);

  return (
    <TabContextProvider>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={isLoggedIn ? "MainTabs" : "SignIn"}
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="SignInScreen" component={SignInScreen} />
          <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: true }}
          />
          <RootStack.Screen name="MainTabs" component={TabNavigator} />
          <RootStack.Screen
            name="ClockScreen"
            component={ClockScreen}
            options={{
              title: "Clock",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="EditProfilescreen"
            component={EditProfilescreen}
            options={{
              headerShown: true,
              title: "Edit Profile",
              headerTitleAlign: "center",
            }}
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
            options={{
              title: "Open Shifts",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="RequestedShiftsscreen"
            component={RequestedShiftsscreen}
            options={{
              title: "Requested Shifts",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="OpenShiftDetailsScreen"
            component={OpenShiftDetailsScreen}
            options={{
              title: "Shift Details",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="ForgotPasswordScreen"
            title="Forgot Password"
            component={ForgotPasswordScreen}
            options={{ headerShown: true }}
          />
          <RootStack.Screen
            name="AvailabilityScreen"
            title="Availability"
            component={AvailabilityScreen}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="EditAvailabilityScreen"
            title="Edit Availability"
            component={EditAvailabilityScreen}
            options={{ headerShown: true }}
          />
          <RootStack.Screen
            name="NewsScreen"
            component={NewsScreen}
            options={{
              title: "News Screen",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="NewsDetailScreen"
            component={NewsDetailScreen}
            options={{
              title: "News Details Screen",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{
              title: "Settings",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.teal,
              },
              headerTintColor: COLORS.white,
            }}
          />
          <RootStack.Screen
            name="VideoScreen"
            component={VideoScreen}
            options={{
              title: "Video Screen",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              title: "Notifications",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="NotificationDetailsScreen"
            component={NotificationDetailsScreen}
            options={{
              title: "Notification Details",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="TimeSheetScreen"
            component={TimeSheetScreen}
            options={{
              title: "Completed Shift",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="InvoiceScreen"
            component={InvoiceScreen}
            options={{
              title: "Invoice",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={{
              title: "About Us",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="MyShiftScreen"
            component={MyShiftScreen}
            options={{
              title: "My Shift",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
          <RootStack.Screen
            name="VideoPlayer"
            component={VideoPlayer}
            options={{
              title: "Video Player",
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.background,
              },
              headerTintColor: COLORS.blue,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </TabContextProvider>
  );
};
export default RootNavigator;
