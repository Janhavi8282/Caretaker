import React from "react";
import { Video } from "expo-av";
import { useEffect, useState } from "react";

import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import { COLORS } from "../theme/theme";
import { useRoute } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import youtubeUrl from "youtube-url";

// Video screen

const VideoPlayer = ({ navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const route = useRoute();
  const videoLink = route.params?.videoLink;
  console.log(videoLink);
  const videoId = youtubeUrl.extractId(videoLink);
  console.log(videoId);

  // const [videoStyle, setVideoStyle] = useState({});

  // const updateVideoStyle = () => {
  //   const screenWidth = Dimensions.get("window").width;
  //   setVideoStyle({
  //     width: screenWidth,
  //     height: (screenWidth * 9) / 16,
  //   });
  // };

  useEffect(() => {
    // updateVideoStyle();
    // // Add listener for screen rotation
    // Dimensions.addEventListener("change", updateVideoStyle);
    // // Cleanup the listener when the component unmounts
    // return () => {
    //   Dimensions.removeEventListener("change", updateVideoStyle);
    // };
  }, []);

  // return (
  //   <SafeAreaView style={styles.container}>
  return (
    <View>
      <YoutubePlayer height={300} play={true} videoId={videoId} />
    </View>
  );
  {
    /* <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={[styles.videoMiddle, videoStyle]}
          source={{
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
      </View> */
  }
  //   </SafeAreaView>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  videoMiddle: {
    // width: 300,
    // height: 200,
    // width: Dimensions.get("window").width,
    // height: (Dimensions.get("window").width * 9) / 16,
  },
});
export default VideoPlayer;
