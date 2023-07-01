import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import ShiftScreen from './ShiftScreen';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';



const Circle = () =>{
  return <SafeAreaView style={styles.circle}/>
};

const HomeScreen = ({navigation}) => {

  const route = useRoute();


    
    useEffect(() => {
      getShifts({ name: "" })
        .then((result) => {
        })
        .catch((error) => alert('Something went wrong'));
    }, []);

    const getShifts = async ()=>{
      const url = `https://api.covid19tracker.ca/summary`
      const result = await axios.get(url);
    return result;
  }
  const user = route.params?.user;


  return (
    //search bar 
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.row}>
      <View style={styles.searchView}>
        <Ionicons name="search" size={20} color="black" style={styles.searchBar}/>
        <TextInput placeholder='Search'/>
      </View>
      <Ionicons name ='notifications-outline' size={30} style={styles.notification}/>
      </GestureHandlerRootView>
      
      {/* circle with nameof user who logged in
       */}
       <Circle/>
      <Text style ={styles.text}>Hello,{user?.firstName ?? ""}</Text>
      
      {/*Quick tasks */}
      <View style={styles.row}>
        <View style={styles.columns}>
          <TouchableOpacity onPress={()=>navigation.navigate('ShiftScreen')} style={styles.columns}>
            <AntDesign name='calendar' size={30} color='#008080'/>
            <Text style={styles.rowIcon}>Shifts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.columns}>
          <AntDesign name='clockcircleo' size={30}  color='#008080'/>
          <Text style={styles.rowIcon}>Clock</Text>
        </View>
        
        <View style={styles.columns}>
          <Ionicons name='newspaper-outline' size={30}  color='#008080'/>
          <Text style={styles.rowIcon}>News</Text>
        </View>

        <View style={styles.columns}>
          <TouchableOpacity onPress={()=>navigation.navigate('ProfileScreen')} style={styles.columns}>
            <Ionicons name='person-outline' size={30}   color='#008080'/>
            <Text style={styles.rowIcon}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* other notifications of home screen */}
      <View>
        <Text>Updates</Text>
      </View>
      <TouchableOpacity
          style={styles.rectangle}>
            <View style={styles.rectangleView}>
            <Text style={styles.textContent}>Hi Team...</Text>
            <Text style={styles.textContent}>Just a quick notication that new shifts have been uploaded. Please check...</Text>
            <Text style={styles.textContent}>Thank you and have a good day</Text>
            </View>
      </TouchableOpacity>
    </SafeAreaView> 

   
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  notification:{
  },
  circle:{
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: '#87CEEB',
    shadowRadius: 5,
    padding: 15,
    marginTop: 40,
    elevation: 8,
  },
  text:{
    padding: 4,
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
  },
  row:{
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  columns:{
    backgroundColor:'transparent',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent:'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    margin:15,
  },
  searchView:{
    padding: 3,
    flexDirection: 'row',
    width: '90%',
    height: 40,
    backgroundColor:'#D3D3D3',
    borderRadius: 10,
    margin: 10,
  },
  searchBar:{
    marginLeft:2,
    marginRight: 4,
    alignSelf:'center',
  },
  rectangle:{
    backgroundColor: '#0096FF',
    padding: 10,
    height: '20%',
    width: '100%',
  },
  rectangleView:{
    alignItems: 'center',
    alignContent: 'center',
  },
  textContent:{
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
  }
})

export default HomeScreen

