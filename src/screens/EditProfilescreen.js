import { View, Text, StyleSheet,Button} from 'react-native';
import React,{useState} from 'react';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const EditProfilescreen = ({route,navigation}) => {
  const {userInfo} = route.params;


  const [firstName,setFirstName] = useState(userInfo?.firstName);
  const [lastName,setLastName] = useState(userInfo?.lastName);
  const [email,setEmail] = useState(userInfo?.email);
  const [mobileNumber,setMobileNumber] = useState(userInfo?.mobileNumber);

  const handleSaveChanges = () =>{
    //Create the updated user object
    const updatedUserDetails = {
        userId: 4,
        firstName,
        lastName,
        email,
        mobileNumber,
    };

    //Send the updated user data to API
    fetch('https://lifeshaderapi.azurewebsites.net/api/UserService/UpdateUser',{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify(updatedUserDetails),
    })
    .then(response =>response.json())
    .then(data =>{
        //Handle the response from API
        console.log('User Updated Successfully',data);
        //Perform any necessary actions after successfull update
        navigation.navigate('ProfileScreen')
    })
    .catch(error=>{
        console.log('Error updating user',error);
        //Handle the error condition
    })
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.infoContainer}>
       <TextInput style = {styles.textInput}
        value = {firstName}
        onChangeText = {text=> setFirstName(text)}
        setValue={setFirstName}
      />
      
      <TextInput style = {styles.textInput}
        value = {lastName}
        onChangeText = {text => setLastName(text)}
        setValue={setLastName}
      />

      <TextInput style = {styles.textInput}
        value = {email}
        onChangeText = {text => setEmail(text)}
        setValue={setEmail}
      />

      <TextInput style = {styles.textInput}
        value = {mobileNumber}
        onChangeText = {text => setMobileNumber(text)}
        setValue={setMobileNumber}
      />

      <CustomButton text="SAVE" onPress={handleSaveChanges} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        margin: 5,
        backgroundColor: '#f2f6f7',
        
    },
    infoContainer: {
      padding: 10,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      justifyContent: 'center',
    },
    textInput:{
      backgroundColor: '#f2f6f7',
      width: '90%',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 10,
      alignSelf: 'center',
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
    }

})

export default EditProfilescreen