import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import TabNavigator from "./TabNavigator";
import YourShiftsScreen from "../screens/YourShiftsScreen";
import OpenShiftsScreen from "../screens/OpenShiftsScreen";
import OpenShiftDetailsScreen from "../screens/OpenShiftDetailsScreen";
import RequestedShiftsscreen from "../screens/RequestedShiftsscreen";
import ClockScreen from "../screens/ClockScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShiftScreen from "../screens/ShiftScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AvailabilityScreen from "../screens/AvailabilityScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfilescreen from "../screens/EditProfilescreen";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  //state to track the user's authentication status
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>{
  const checkUserLoggedIn = async () =>{
    try{
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if(storedUserInfo != null){
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      }
    }catch(error){
      console.log('Error retrieving user info from Async Storage',error);
    }
  };
  checkUserLoggedIn();
},[]);
  


    return (
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={isLoggedIn ? 'HomeScreen' : 'SignIn'} screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="SignIn" component={SignInScreen}  />
          <RootStack.Screen name="HomeScreen" component={HomeScreen}  />
          <RootStack.Screen name="MainTabs" component={TabNavigator}  />
          <RootStack.Screen name="ClockScreen" component={ClockScreen} options={{headerShown: true}}  />
          <RootStack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: true, title: 'Profile', headerTitleAlign: "center", headerStyle:{backgroundColor: '#1dc7c4'},headerTintColor: '#ffffff'}}  />
          <RootStack.Screen name="ShiftScreen" component={ShiftScreen} options={{headerShown: true,title: 'Shifts', headerTitleAlign: "center", headerStyle:{backgroundColor: '#1dc7c4'},headerTintColor: '#ffffff'}} />
          <RootStack.Screen name="YourShiftsScreen" component={YourShiftsScreen} options={{headerShown: true}}/>
          <RootStack.Screen name="OpenShiftsScreen" component={OpenShiftsScreen} options={{headerShown: true,title:'Open Shifts', headerTitleAlign: "center", headerStyle:{backgroundColor: '#1dc7c4'},headerTintColor: '#ffffff'}}/>
          <RootStack.Screen name="RequestedShiftsscreen" component={RequestedShiftsscreen} options={{headerShown: true}} />
          <RootStack.Screen name="OpenShiftDetailsScreen" component={OpenShiftDetailsScreen} options={{headerShown: true,title: 'Open Shift Details', headerTitleAlign: "center", headerStyle:{backgroundColor: '#1dc7c4'},headerTintColor: '#ffffff'}} />
          <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <RootStack.Screen name="AvailabilityScreen" component={AvailabilityScreen} options={{headerShown: true}} />
          <RootStack.Screen name="EditProfileScreen" component={EditProfilescreen} options={{headerShown: true,title: 'Edit Profile', headerTitleAlign: "center", headerStyle:{backgroundColor: '#1dc7c4'},headerTintColor: '#ffffff'}}/>
        </RootStack.Navigator>
        </NavigationContainer>
    );


}

export default RootNavigator