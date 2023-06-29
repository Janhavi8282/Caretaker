import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShiftScreen from './src/screens/ShiftScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import YourShiftsScreen from './src/screens/YourShiftsScreen';
import OpenShiftsScreen from './src/screens/OpenShiftsScreen';
import RequestedShiftsscreen from './src/screens/RequestedShiftsscreen';
import OpenShiftDetailsScreen from './src/screens/OpenShiftDetailsScreen';

const Stack = createNativeStackNavigator();

const App = ()=> {
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen}  />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}  />
        <Stack.Screen name="ShiftScreen" component={ShiftScreen}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
        <Stack.Screen name="YourShiftsScreen" component={YourShiftsScreen}/>
        <Stack.Screen name="OpenShiftsScreen" component={OpenShiftsScreen}/>
        <Stack.Screen name="RequestedShiftsscreen" component={RequestedShiftsscreen}/>
        <Stack.Screen name="OpenShiftDetailsScreen" component={OpenShiftDetailsScreen}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
};
 
export default App;


