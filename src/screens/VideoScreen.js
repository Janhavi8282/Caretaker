// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Dimensions,
// } from "react-native";

// // const VideoScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, padding: 16 }}>
//       {/* <View style={styles.videoView}></View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     alignItems: "center",
//     backgroundColor: "#DDDDDD",
//     padding: 10,
//     width: 300,
//     marginTop: 16,
//   },
//   videoView: {
//     height: height / 3,
//     width: "100%",
//     backgroundColor: "gray",
//   },
// });
// export default VideoScreen;

import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from "react-native";

const VideoScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            You are on Time Sheet Screen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default VideoScreen;
