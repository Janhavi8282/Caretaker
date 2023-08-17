import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Divider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const OpenShiftsScreen = ({ navigation, route }) => {
  const userInfo = route.params?.userInfo;
  //use state will show the loading state of api. It si set true so it will show the activity indicator for the first
  let [isLoading, setIsLoading] = useState(true);
  //state for error if we get any error while api calling
  let [error, setError] = useState();
  //state for response that we get from api
  let [response, setResponse] = useState();
  const userData = useSelector((state) => state.userData);
  const userId = userData?.userId;
  //Get the requested shifts from the Requestedscreen component
  const { requestedShifts } = route.params;
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  });

  useEffect(() => {
    //Fetch available shifts
    fetch(
      "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetAvailableShifts"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
    if (error) {
      return <Text>{error}</Text>;
    }
    //console.log(response);
    if (!response) {
      return <Text>No shifts available</Text>;
    }

    //Filter out the shifts that are requested
    const availableShifts = response.filter(
      (shift) =>
        !requestedShifts.some(
          (requestedShift) => requestedShift.shiftId === shift.shiftId
        )
    );

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {availableShifts.map((shift, index) => {
          //for getting the month from date
          const shiftDate = new Date(shift.date);

          //start time of shift
          const startTime = new Date(shift.startTime).toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }
          );

          const endTime = new Date(shift.endTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          const timeRange = `${startTime} - ${endTime}`;

          //Helper function to get the ordinal suffix  for the day number
          const getOrdinalSuffix = (day) => {
            if (day >= 11 && day <= 13) {
              return "th";
            }
            switch (day % 10) {
              case 1:
                return "st";
              case 2:
                return "nd";
              case 3:
                return "rd";
              default:
                return "th";
            }
          };
          //for getting day of weekday
          //const dayOfWeek = shiftDate.toLocaleDateString('en-US',{weekday: 'short'}).toUpperCase();
          const dayOfWeek = `${shiftDate.getDate()}${getOrdinalSuffix(
            shiftDate.getDate()
          )} ${shiftDate.toLocaleString("default", { month: "long" })}
                           `;

          return (
            <View>
              <GestureHandlerRootView>
                <View key={shift.shiftId}>
                  <View style={styles.columns}>
                    {/* pass the shift object as parameter in touchable opacity so that we will get the details of specific list items */}
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate("OpenShiftDetailsScreen", {
                          shiftId: shift.shiftId,
                          userInfo: userData,
                        })
                      }
                    >
                      <Text style={styles.name}>{shift.shiftName}</Text>
                      <Text style={styles.text}>{timeRange} </Text>
                      <Text>{dayOfWeek}</Text>
                    </TouchableOpacity>
                  </View>
                  {/*<Divider style={styles.divider}/>*/}
                </View>
              </GestureHandlerRootView>
            </View>
          );
        })}
      </ScrollView>
    );
  };
  return <View style={styles.container}>{getContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f6f7",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
  },
  columns: {
    flexDirection: "column",
    padding: 15,
    margin: 10,
    backgroundColor: "#ffffff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },

  divider: {
    borderBottomWidth: 0.5,
  },
});

export default OpenShiftsScreen;
