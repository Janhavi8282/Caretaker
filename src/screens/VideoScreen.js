import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
// import vi from "../screens/NewsDetailScreen";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../theme/theme";

const VideoScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = React.useState(true);
  const [data, setdata] = useState([]);
  const [currentIndex, setcurrentIndex] = useState();
  const [refFlatList, setrefFlatList] = useState();
  const [id, setId] = useState("");

  useEffect(() => {
    getListPhotoes();
    return () => {};
  }, []);

  getListPhotoes = async () => {
    const apiURL =
      "https://lifeshaderapi.azurewebsites.net/api/Traning/GetAllVideos";
    await fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setdata(resJson);
        console.log(resJson);
      })
      .catch((error) => {
        console.log("Error: ".error);
      })
      .finally(() => setisLoading(false));
  };

  onClickItem = (item, index) => {
    setcurrentIndex(index);
    const newArrData = data.map((e, index) => {
      if (item.id == e.id) {
        return {
          ...e,
          selected: true,
        };
      }
      return {
        ...e,
        selected: false,
      };
    });
    setdata(newArrData);
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        // onPress={() => onClickItem(item, index)}
        onPress={() =>
          navigation.navigate("VideoPlayer", {
            videoHeading: `${item.videoLink}`,
          })
        }
        style={[
          styles.item,
          {
            marginTop: 11,
            height: 150,
            backgroundColor: item.selected ? "#f0fff0" : "white",
          },
        ]}
      >
        <View style={{ height: 100, flexDirection: "row" }}>
          <Image style={styles.image} source={{ uri: item.photoLink }}></Image>
          <Text style={[styles.title]}>{item.heading}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  onScrollToItemSelected = () => {
    // refFlatList.scroll({animated: true, index:currentIndex});
  };

  getItemLayout = (data, index) => {
    return { length: 161, offset: 161 * index, index };
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `key- ${item.id}`}
          getItemLayout={getItemLayout}
          ref={(ref) => setrefFlatList(ref)}
        />
      )}
      <TouchableOpacity onPress={onScrollToItemSelected}></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: COLORS.background,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    padding: 10,
  },
});
export default VideoScreen;
