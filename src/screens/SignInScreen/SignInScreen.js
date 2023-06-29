import React, { useEffect } from 'react';
import { useState } from 'react';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/loginImage.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/core';

const SignInScreen = () =>{
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');


    //to check whether the user is valid and if is valid can be logged in then redirect to home screen
    const navigation = useNavigation();
    useEffect(()=>{
        auth.onAuthStateChanged(user =>{
            if(user){
                navigation.navigate("Home")
            }
        })
        //when we leave this screen it's gonna unsubscribe from this listener and does not keep pinging it when it shouldn't
        
    },[])

    const {height} = useWindowDimensions();   //use the window dimensions for height so it will not affect when screen size changes

    const onSignInPressed = () =>{
        navigation.navigate("Home")
    }


    const onForgotPasswordPressed = () =>{
        console.warn("Forgot Password");
    }

    return(
        <View style= {styles.root}>
            {/* inserting image in the screen */}
            <Image 
               source ={Logo} 
               style ={[styles.logo, {height: height * 0.3}, {marginTop:80}]}     //30% of the height of the window
               resizeMode="contain" 
            />

            {/* inserting custominput for the textbox in the screen */}
            <CustomInput 
                placeholder="Username" 
                value={username} 
                onChange={(e)=> setUsername(e.target.value)}
                setValue={setUserName} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomButton 
                text="Sign In"
                onPress={onSignInPressed}/>
               

            <CustomButton 
                text="Forgot Password?"
                onPress={onForgotPasswordPressed}
                type="TERTIARY"/>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        padding: 30,
    },
    logo:{
        width: '50%',
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default SignInScreen;