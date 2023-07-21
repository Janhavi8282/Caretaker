import React from 'react';
import {View,Text,StyleSheet,Pressable} from 'react-native';

const CustomButton = ({onPress,text,type}) =>{
    return(
        <Pressable onPress={onPress} style={[styles.container,styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
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