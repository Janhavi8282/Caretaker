import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import React from 'react';
import { useEffect,useState } from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler';

const OpenShiftDetailsScreen = ({navigation,route}) => {
  //use state will show the loading state of api. It si set true so it will show the activity indicator for the first
  let [isLoading,setIsLoading] = useState(true);
  //state for error if we get any error while api calling
  let[error,setError] = useState();
  //state for response that we get from api
    let[response,setResponse] = useState();

  let[shift,setShift] = useState(null);
  //getting the shift id
  const { shiftId } = route.params;

  useEffect(()=>{
    fetch("https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetAvailableShifts")
    .then(res => res.json())
    .then(
      (result)=>{
      setIsLoading(false);
      console.log(response);
      const shiftClicked = result.find(shift=>shift.shiftId == parseInt(shiftId));
      if(shiftClicked){
      setShift(shiftClicked);
      }
      else{
        setError('Shift not found')
      }
      //setResponse(result);
     
    },
    (error)=>{
      setIsLoading(false);
      setError(error);
    }
    )
  },[shiftId]);

  
  const getContent = () =>{
    if(isLoading){
      return <ActivityIndicator size="large"/>;
    }
    if(error){
      return <Text>{error}</Text>
    }
    console.log(shift,shiftId);
    if(!shift){
      return <Text>Shift not found</Text>
    }
  //Render shift details 
         //for getting the month from date
         const shiftDate = new Date(shift.date);

         //for getting the shift date and if single digit then padded with 0
         const date1 = shiftDate.getDate().toString().padStart(2,'0');
 
          //Helper function to get the ordinal suffix  for the day number
          const getOrdinalSuffix = (day) =>{
            if(day >=11 && day<=13){
              return 'th';
            }
            switch(day % 10){
              case 1: 
                return 'st';
              case 2: 
                return 'nd';
              case 3:
                return 'rd';
              default:
                return 'th';
            }
           };
        const dayOfWeek = shiftDate.toLocaleDateString('en-US',{weekday: 'long'});
        const date = `${shiftDate.getDate()}${getOrdinalSuffix(shiftDate.getDate())} ${shiftDate.toLocaleString('default',{month: 'long'})}`

 
         //start time of shift
         const startTime = new Date(shift.startTime).toLocaleTimeString('en-US',{
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
         });

         const endTime = new Date(shift.endTime).toLocaleTimeString('en-US',{
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
         });

         //start and end time
         const timeRange = `${startTime} - ${endTime}`;

         //address
         const address = shift.location.address;


        return(
           <GestureHandlerRootView>
            <View style={styles.rectangle} >
              <Text style={styles.text}>{shift.shiftName}</Text>
              <Text>{shift.description}</Text>
              <Text>{date}</Text>
              <Text>{dayOfWeek} </Text>
              <Text>{timeRange} </Text>
              <Text>{address}</Text>
            </View>
    
              <Pressable style = {styles.button} onPress={() => navigation.navigate('RequestedShiftsscreen')}>
                <Text style={styles.buttonText}>Request</Text>
              </Pressable>
          </GestureHandlerRootView>
        )  
      }
      
  return (
    <View style={styles.container}>
      {getContent()}
    </View>
  )
}



const styles = StyleSheet.create({
    container:{
        padding: 5,
        margin: 5,
        width: '100%',
        height: '100%',
    },
    rectangle:{
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10
      },
      text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 3,
        margin: 10,
        backgroundColor: '#DE7E5D',
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#ffffff',
      },
    })

export default OpenShiftDetailsScreen