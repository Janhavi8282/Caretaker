import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../theme/theme";

const CustomButton = ({ onPress, text, type }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 200,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },

  //styles for primary buttons which have a solid background
  container_PRIMARY: {
    backgroundColor: COLORS.white,
  },

  //styles for tertiary button which have no background
  container_TERTIARY: {},
  text: {
    fontWeight: "bold",
    color: COLORS.blue,
    fontSize: 16,
  },
  //styles for text of tertiary button
  text_TERTIARY: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default CustomButton;
