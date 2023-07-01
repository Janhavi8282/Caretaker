import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import TabsNavigator from "./TabNavigator";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
       
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Root"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="SignIn" component={SignInScreen} />
          <RootStack.Screen name="MainTabs"   component={TabsNavigator}  />
        </RootStack.Navigator>
      </NavigationContainer>
  
    );


}

export default RootNavigator