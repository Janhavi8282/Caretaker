import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const NewsDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const title = route.params?.newsHeading;
  const description = route.params?.newsDescription;
  const image = route.params?.photoLink;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image style={styles.image} source={{ uri: image }}></Image>
        <Text style={styles.title}>{title}</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.content}>{description}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "justify",
  },
  scrollView: {},
});
export default NewsDetailScreen;
