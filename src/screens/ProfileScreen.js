import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text,Image} from 'react-native';
import {Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = (props) => {
  const[apiData,setApiData] = useState(null);

  useEffect(()=>{
    fetchApiData()
    .then((data)=>setApiData(data))
    .catch((error)=>console.log(error));
  },[]);

  const fetchApiData = async () =>{
    try{
      const response = await fetch('');
      const data = await response.json();
      return data;
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* curved box*/}
      <View style={styles.box}/>
      
      <View style={styles.photo}>
      <View style ={styles.circle}>
      <Image source={require('../../assets/profile.jpg')}
      style={styles.image} />
      </View>
      <View>
          <Text style={styles.name}>Janhavi Patel</Text>
      </View>
      </View>

      <View style={styles.info}>

      <Text style={styles.heading}>Email:</Text>
      <View style={styles.row}>
      <Text style ={styles.text}>janhavi@gmail.com</Text>
      <Icon name='edit' size={20}  color='black' style={styles.icon}/>
      </View>
      <Divider style={styles.divider}/>
      
      
      <Text style={styles.heading}>Phone: </Text>
      <Text style ={styles.text}>4372638282</Text>
      <Divider style={styles.divider}/>
     
      <Text style={styles.heading}>Address:</Text>
      <Text style ={styles.text}>140 Windale Crescent</Text>
      <Divider style={styles.divider}/>
      
      <Text style={styles.heading}>Certificates:</Text>
      <GestureHandlerRootView>
      <TouchableOpacity style={styles.button}>
        <Text>Upload</Text>
      </TouchableOpacity>
      </GestureHandlerRootView>
    
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
 },
 box:{
  flex: 0.4,
  backgroundColor: "#DE7E5D",
  borderBottomRightRadius: 95,
  justifyContent: 'flex-end',     //Align the content to the bottom of box
  alignItems: 'center',   // Center the content horizontally
  left: 0,
  right: 0,
  bottom: 0,
 },
 photo:{
  flexDirection: 'column',     //Arrage the circle in column
  alignItems: 'center',
  marginTop: -50,
 },
 circle:{
  width: 150,
  height: 150,
  borderRadius: 150/2,
  backgroundColor: '#DE7E5D',
  shadowRadius: 5,
  padding: 1,
  elevation: 8,
 },
 name:{
  textAlign: 'center',
  marginTop: 10,
  fontSize: 20,
  color: '#333',
  fontWeight: 'bold',
 },
 text:{
  marginTop: 5,
  fontSize: 18,
 },
 info:{
  margin: 15,
  padding: 20,
 },
 heading:{
  fontSize: 20,
  fontWeight: 'bold',
 },
 row:{
  flexDirection: 'row',
  gap: 120,
  alignContent: 'space-between',
 },
 icon:{
  marginTop: 5,
 },
 divider:{
  borderBottomWidth: 0.5,
 },
 button:{
  backgroundColor: "#DE7E5D",
  height: 40,
  width: 150,
  marginTop: 10,
  justifyContent: 'center',
  alignItems: 'center',

 },
 image:{
    width: 150,
    height: 150,
    borderRadius: 150/2,
 }
 
})

export default ProfileScreen;