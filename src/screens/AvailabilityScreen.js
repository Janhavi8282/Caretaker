import { View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton/CustomButton';

const AvailabilityScreen = () => {
  return (
    <View style={styles.container}>
        <View>
                <View style={styles.button}>
                  <Text style={styles.text}>Monday</Text>
                  <Text style={styles.text}>05:00AM - 10:00 PM</Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>Tuesday</Text>
                  <Text style={styles.text}>05:00AM - 10:00 PM</Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>Wednesday</Text>
                  <Text style={styles.text}>05:00AM - 10:00 PM</Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>Thursday</Text>
                  <Text style={styles.text}>05:00AM - 10:00 PM</Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>Friday</Text>
                  <Text style={styles.text}>05:00AM - 10:00 PM</Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>Saturday</Text>
                  <Text style={styles.text}>05:00AM - 10:00 PM</Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.text}>Sunday</Text>
                  <Text style={styles.text}>05:00AM - 10:00 PM</Text>
                </View>
            </View>

            <CustomButton text="Edit Availability" />
        </View>
        
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding: 10,
      margin: 5,
    },
    row:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingLeft: 5,
      paddingRight: 5,
    },
    columns:{
      backgroundColor:'transparent',
      flexDirection:'column',
      justifyContent:'space-between',
    },
    button:{
      padding: 15,
      margin: 5,
      backgroundColor: '#87CEEB',
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      justifyContent: 'space-between',
    },
  });

export default AvailabilityScreen