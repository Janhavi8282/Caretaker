import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const RequestedShiftsscreen = ({navigation}) => {
  return (
    <View style={styles.container}> 
    <View style={styles.rectangle}>
      <Text style={styles.text}>12th May, 2023</Text>
      <Text style={styles.text}>Monday</Text>
      <Text style={styles.text}>9AM - 5PM</Text>
      <Text style={styles.text}>41 Red Crescent</Text>
      <Text style={styles.text}>Notes: Please wear mask</Text>   
    </View>

      <Pressable style = {styles.button} onPress={() => navigation.navigate('ShiftScreen')}>
          <Text style={styles.buttonText}>Cancel</Text>
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
      padding: 10,
      width: '100%',
      height: '100%',
  },
  rectangle:{
      backgroundColor: '#ffffff',
      padding: 20,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopEndRadius: 10,
      borderBottomEndRadius: 10,
      margin: 10,
    },
    text:{
      fontSize: 15,
      color: 'black',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderRadius: 4,
      elevation: 3,
      margin: 10,
      backgroundColor: '#DE7E5D',
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#ffffff',
    },
  })

export default RequestedShiftsscreen