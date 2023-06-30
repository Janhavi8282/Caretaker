import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./TabNavigator";
import { TabContextProvider } from "../context/TabContext";
import TimeSheetScreen from "../screens/TimeSheetScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = ({ navigation }) => {
  return (
    <TabContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Root"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Root" component={TabsNavigator} />
          <Stack.Screen
            name="TimeSheet"
            component={TimeSheetScreen}
            options={{ title: "Time Screen" }}
          />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </TabContextProvider>
  );
};

export default MainNavigator;
