import { View, StyleSheet, Text, Image} from 'react-native'
import React from 'react'

const ProfileScreen = (props) => {
  return (
    <View style={styles.rectangle}>
      <View style={styles.circle}>
      </View>
      <Text style={styles.name}>Janhavi Patel</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rectangle:{
    width: '90%',
    height: '90%',
    margin: 20,
    padding: 20,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: "#D3D3D3",
  },
  circle:{
    width: 200,
    height:200,
    borderRadius: 200/2,
    backgroundColor:"#5E716A",
    justifyContent: 'center',
    alignSelf: 'center',

  },
  name:{
    alignSelf: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'normal',
  },
  seperator:{
    height: 1,
    width: '90%',
    backgroundColor: 'black',
  },
})

export default ProfileScreen;