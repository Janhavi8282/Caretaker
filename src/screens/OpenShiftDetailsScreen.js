import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView} from 'react-native-gesture-handler';

const OpenShiftDetailsScreen = ({navigation}) => {
  return (
    <View style={styles.container}> 
    <GestureHandlerRootView>
    <View style={styles.rectangle}>
      <Text style={styles.text}>Date: 12th May, 2023</Text>
      <Text style={styles.text}>Day: Monday</Text>
      <Text style={styles.text}>Time: 9AM - 5PM</Text>
      <Text style={styles.text}>Address: 41 Red Crescent</Text>
      <Text style={styles.text}>Notes: Please wear mask</Text> 
      
    </View>
    <View style={styles.buttonRequest}>
    <TouchableOpacity onPress={()=>navigation.navigate('RequestedShiftsscreen')} >
    <Button title='Request'/>
    </TouchableOpacity>
    </View>
    </GestureHandlerRootView>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        margin: 10,
    },
    rectangle:{
        backgroundColor: '#87CEEB',
        padding: 20,
        margin: 20,
        height: '50%',
        width: '90%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10
      },
      text:{
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'white',
      },
      buttonRequest:{
        width: '100%',
        height: '30%',
      }
    })

export default OpenShiftDetailsScreen