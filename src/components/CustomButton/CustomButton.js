import React from 'react';
import {View,Text,StyleSheet,Pressable} from 'react-native';

const CustomButton = ({onPress,text,type ="PRIMARY"}) =>{
    return(
        <Pressable onPress={onPress} style={[styles.container,styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        margin: 15,
        alignItems: 'center',
        borderRadius: 5,
    },

    //styles for primary buttons which have a solid background
    container_PRIMARY:{
        backgroundColor: '#3B71F3',
    },

    //styles for tertiary button which have no background
    container_TERTIARY:{

    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    //styles for text of tertiary button
    text_TERTIARY: {
        color: 'gray',
    }
});

export default CustomButton;