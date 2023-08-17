import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { COLORS } from "../theme/theme";

const CardItem = ({ imageSource, heading, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.overlay} />
        <Text style={styles.heading}>{heading}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(216, 220, 227, 0.5)",
  },
  heading: {
    position: "absolute",
    top: 10,
    left: 10,
    color: COLORS.blue,
    fontSize: 21,
    fontWeight: "bold",
  },
});

export default CardItem;
