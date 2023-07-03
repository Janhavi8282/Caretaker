// import * as React from "react";
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
import NewsDetailScreen from "../screens/NewsDetailScreen";
import { useRoute } from "@react-navigation/native";

const NewsScreen = ({ navigation }) => {
  const [isLoading, setisLoading] = React.useState(true);
  const [data, setdata] = useState([]);
  const [currentIndex, setcurrentIndex] = useState();
  const [refFlatList, setrefFlatList] = useState();
  const [id, setId] = useState("");

  useEffect(() => {
    getListPhotoes();
    return () => {};
  }, []);

  getListPhotoes = () => {
    const apiURL =
      "https://jsonplaceholder.typicode.com/photos?_limit=20&_page=1";
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        setdata(resJson);
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
          navigation.navigate("NewsDetailScreen", {
            title: `${item.title}`,
            image: `${item.url}`,
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
          <Image style={styles.image} source={{ uri: item.url }}></Image>
          <Text style={[styles.title]}>{item.title}</Text>
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
    <SafeAreaView style={{ flex: 1, padding: 8 }}>
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
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 16,
    textAlign: "center",
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
export default NewsScreen;
