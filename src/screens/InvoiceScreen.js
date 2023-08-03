import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

const InvoiceScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);
  const downloadFile = async (fileUrl) => {
    const fileInfo = await FileSystem.downloadAsync(
      fileUrl,
      FileSystem.documentDirectory + "invoice.pdf"
    );
    console.log(fileInfo);
    save(fileInfo.uri, "invoice.pdf", fileInfo.headers["content-type"]);
    Alert.alert("Success", "Invoice downloaded");
  };
  const save = async (uri, filename, minetype) => {
    const permission =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permission.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await FileSystem.StorageAccessFramework.createFileAsync(
        permission.directoryUri,
        filename,
        minetype
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => console.log(e));
    } else {
      shareAsync(uri);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity
        onPress={() =>
          downloadFile(
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          )
        }
      >
        <Text style={{ color: "blue" }}>Download</Text>
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default InvoiceScreen;
