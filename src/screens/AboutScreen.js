import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import Logo from "../../assets/loginImage.jpg";
import { COLORS } from "../theme/theme";
// import * as Linking from "react-native-linking";

const AboutScreen = ({ navigation }) => {
  const handleEmailLink = () => {
    console.log("handleEmailLink function called");
    const email = "support@thekarmastaffing.com"; // Replace with the email address you want to use
    Linking.openURL(
      "mailto:support@thekarmastaffing.com?subject=Feedback&body=Hi%20there,"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karma Staffing Agency</Text>
      <Image
        source={Logo}
        style={styles.logo} //30% of the height of the window
        resizeMode="contain"
      />
      <Text style={styles.text}>
        Welcome to our Agency! We are dedicated to providing high-quality
        services to our customers. Our team is made up of experienced
        professionals who are passionate about what they do. If you have any
        questions or feedback, please do not hesitate to contact us.
      </Text>
      <TouchableOpacity onPress={handleEmailLink}>
        <Text style={styles.text}>Email: support@thekarmastaffing.com</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
});

export default AboutScreen;
