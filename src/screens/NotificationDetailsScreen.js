import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NotificationDetailsScreen = ({route}) => {
    const {header, message}  = route.params;

    return (
     <View style = {styles.container}>
       <View style ={styles.infoContainer}>
         <Text style ={styles.header}>{header}</Text>
         <Text style ={styles.text}>{message}</Text>
       </View>
     </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#f2f6f7',
    },
    infoContainer: {
        padding: 20,
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
      },
    header:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    text:{
        fontSize: 16,
        color: 'black',
    }
});

export default NotificationDetailsScreen