import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';

const NotificationScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [notications, setNotication] = useState([]);


    //fetch the API values
    useEffect(() =>{
    fetch('https://lifeshaderapi.azurewebsites.net/api/NotificationService/GetAllNotifications')
    .then((res)=>res.json())
    .then(
        (result)=>{
            setIsLoading(false);
            setNotication(result);  // set the fetched data to a state
        },
        (error) =>{
            setIsLoading(false);
            setError(error);
        }
    );
    }, [])

    const getContent = () =>{
        if(isLoading){
          return <ActivityIndicator size="large"/>;
        }
        if(error){
          return <Text>{error}</Text>
        }
        
        if(notications.length === 0){
          return <Text>No notications available</Text>;
        }

    return (
        <View>
            {notications.map((notification)=>(
             <GestureHandlerRootView key = {notification.id}>
                <TouchableOpacity onPress={()=>navigation.navigate('NotificationDetailsScreen',{
                    header: notification.header,
                    message: notification.message,
                })}>
                  <View style = {styles.button}>
                    <Text style = {styles.header}>{notification.header}: {notification.message}</Text>
                  </View>
                </TouchableOpacity>
             </GestureHandlerRootView>
            ))}   
        </View>
  );
};
return <View style ={styles.container}>{getContent()}</View>;
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding: 2,
      backgroundColor: '#f2f6f7',
    },
    button:{
        padding: 20,
        margin: 10,
        backgroundColor: '#ffffff',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
      },
      header:{
        fontSize: 16,
        color: 'black',
      }
});

export default NotificationScreen