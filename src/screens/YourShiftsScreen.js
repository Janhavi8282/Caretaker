import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler';

const YourShiftsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <View>
            <Text>June</Text>
              <View style={styles.columns}>
                <Text>10</Text>
                <Text>SAT</Text>
                <View style={styles.button}>
                  <Text style={styles.text}>9 AM - 5PM</Text>
                  <Text style={styles.text}>Sterling</Text>
                </View>

                <Text>11</Text>
                <Text>SUN</Text>
                <View style={styles.button}>
                <Text style={styles.text}>9 AM - 5PM</Text>
                  <Text style={styles.text}>Sterling</Text>
                </View>

                <Text>12</Text>
                <Text>MON</Text>
                <View style={styles.button}>
                <Text style={styles.text}>9 AM - 5PM</Text>
                  <Text style={styles.text}>Sterling</Text>
                </View>

                <Text>15</Text>
                <Text>WED</Text>
                <View style={styles.button}>
                <Text style={styles.text}>9 AM - 5PM</Text>
                  <Text style={styles.text}>Sterling</Text>
                </View>
            </View>
        </View>
      </GestureHandlerRootView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 20,
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
    margin:10,
  },
  button:{
    padding: 15,
    margin: 10,
    backgroundColor: '#87CEEB',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: 'space-between',
  },
});
export default YourShiftsScreen