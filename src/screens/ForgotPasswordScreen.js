import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';

const ForgotPassword = () => {
  const [username, setUserName] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      {/* circle view */}
      <View style={styles.circle}>
      <Image source={require('../../assets/keyImage1.png')}
      style={styles.image} />
      </View>

      {/*text */}
      <Text style={styles.text}>Provide the email below</Text>

      <View style={styles.root}>
      {/* inserting custominput for the textbox in the screen */}
      <CustomInput
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        setValue={setUserName}
      />

      <CustomButton text="Forgot Password" />
      </View>

      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 30,
  },
  circle:{
      width: 100,
      height: 100,
      borderRadius: 100/2,
      backgroundColor: '#dcdcdc',
      shadowRadius: 5,
      padding: 1,
      elevation: 8,
      marginTop: 30,
      alignSelf: 'center',
  },
  row:{
    flexDirection: 'row',
    gap: 120,
    alignContent: 'space-between',
   },
  image:{
    width: 100,
    height: 100,
    borderRadius: 100/2,
 },
 text:{
  alignSelf: 'center',
  margin: 20,
  fontSize: 18,
 }

})

export default ForgotPassword