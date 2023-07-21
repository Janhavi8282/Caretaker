import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text,Image} from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const route = useRoute();
  const userInfo = route.params?.userInfo;
  
  
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
          <Text style={styles.name}>{userInfo?.firstName} {userInfo?.lastName}</Text>
      </View>
      </View>

      <View style = {styles.infoContainer}>
      <View style={styles.info}>
      <Text style={styles.heading}>Email:</Text>
      <View style={styles.textView}>
        <Text style ={styles.text}>{userInfo?.email}</Text>
      </View>
      
      
      <Text style={styles.heading}>Phone: </Text>
      <View style={styles.textView}>
      <Text style ={styles.text}>{userInfo?.mobileNumber}</Text>
      </View>
     

      <GestureHandlerRootView>
      <TouchableOpacity onPress={()=>navigation.navigate('EditProfileScreen',{userInfo})} style={styles.button} >
        <Text style={styles.btnText}>EDIT</Text>
      </TouchableOpacity>
      </GestureHandlerRootView>
    
      </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#f2f6f7',
 },
 box:{
  flex: 0.3,
  backgroundColor: "#1dc7c4",
  borderBottomRightRadius: 95,
  justifyContent: 'flex-end',     //Align the content to the bottom of box
  alignItems: 'center',   // Center the content horizontally
  left: 0,
  right: 0,
  bottom: 0,
 },
 viewBox:{
  padding: 10,
 },
 view:{
  padding: 10,
  margin: 10,
  flexDirection: 'row',
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
  marginBottom: 15,
 },
 infoContainer:{
  margin: 15,
  marginTop: 30,
  padding: 20,
  backgroundColor: '#ffffff',
  borderRadius: 15,
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
  alignItems: 'center',
 },
 divider:{
  borderBottomWidth: 0.5,
 },
 button:{
  backgroundColor: "#fcdb67",
  height: 60,
  width: 200,
  marginTop: 20,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  borderTopStartRadius: 20,
  borderTopEndRadius: 20,
  borderBottomStartRadius: 20,
  borderBottomEndRadius: 20,
 },
 image:{
    width: 150,
    height: 150,
    borderRadius: 150/2,
 },
 textView:{
  padding: 8,
  margin: 5,
  backgroundColor: '#f2f6f7',
  borderTopEndRadius: 10,
  borderTopStartRadius: 10,
  borderBottomEndRadius: 10,
  borderBottomStartRadius: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
btnText:{
 color: '#ffffff',
 fontSize: 20,
 fontWeight: 'bold', 
}
 
})

export default ProfileScreen;