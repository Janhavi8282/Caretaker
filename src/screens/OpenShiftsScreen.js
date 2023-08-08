import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RequestAlert from "../components/RequestAlert";
import ShiftAlert from "../components/ShiftAlert";
import { COLORS } from "../theme/theme";

const OpenShiftsScreen = ({ navigation, route }) => {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState([]);
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

  const [showShiftAlert, setShowShiftAlert] = useState(false);
  const [showRequestAlert, setShowRequestAlert] = useState(false);
  const [shiftIdAlert, setShiftIdAlert] = useState("");
  const [shiftNameAlert, setShiftNameAlert] = useState("");
  const [shiftDateAlert, setShiftDateAlert] = useState("");
  const [shiftDescriptionAlert, setShiftDescriptionAlert] = useState("");
  const [shiftstartTimeAlert, setShiftstartTimeAlert] = useState("");
  const [shiftendTimeAlert, setShiftendTimeAlert] = useState("");

  const handleShiftShowAlert = (
    shiftId,
    shiftName,
    description,
    date,
    startTime,
    endTime
  ) => {
    setShiftIdAlert(shiftId);
    setShiftNameAlert(shiftName);
    setShiftDateAlert(date);
    setShiftDescriptionAlert(description);
    setShiftstartTimeAlert(startTime);
    setShiftendTimeAlert(endTime);
    setShowShiftAlert(true);
    setShowRequestAlert(false);
  };

  const handleShiftCloseAlert = () => {
    setShowShiftAlert(false);
    setShowRequestAlert(false);
  };

  const handleRequestShowAlert = (
    shiftId,
    shiftName,
    description,
    date,
    startTime,
    endTime
  ) => {
    setShiftIdAlert(shiftId);
    setShiftNameAlert(shiftName);
    setShiftDateAlert(date);
    setShiftDescriptionAlert(description);
    setShiftstartTimeAlert(startTime);
    setShiftendTimeAlert(endTime);
    setShowRequestAlert(true);
    setShowShiftAlert(false);
  };

  const handleRequestCloseAlert = () => {
    setShowRequestAlert(false);
    setShowShiftAlert(false);
  };

  const handleRequestOkAlert = () => {
    console.log(shiftIdAlert);
    setShowShiftAlert(false);
    try {
      fetch(
        "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/RequestShift",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shiftId: shiftIdAlert,
            userId: userId,
          }),
        }
      ).then(async (response) => {
        if (response.status === 200) {
          setRequestedShift(shiftIdAlert);
        }
      });
    } catch (e) {
      console.log(e);
    }
    setShowRequestAlert(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lifeshaderapi.azurewebsites.net/api/ShiftServices/GetAvailableShifts"
        );
        const result = await response.json();
        setIsLoading(false);
        setResponse(result);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={response}
        renderItem={({ item }) => {
          const isUserShift = item.shiftRequest.some(
            (shiftRequest) => shiftRequest.userId === userId
          );
          return (
            <TouchableOpacity
              onPress={() => {
                setShiftIdAlert(item.shiftId);
                setShiftNameAlert(item.shiftName);
                setShiftDescriptionAlert(item.description);
                setShiftDateAlert(item.date);
                setShiftstartTimeAlert(item.startTime);
                setShiftendTimeAlert(item.endTime);
                if (isUserShift) {
                  handleShiftShowAlert(
                    item.shiftId,
                    item.shiftName,
                    item.description,
                    item.date,
                    item.startTime,
                    item.endTime
                  );
                } else {
                  handleRequestShowAlert(
                    item.shiftId,
                    item.shiftName,
                    item.description,
                    item.date,
                    item.startTime,
                    item.endTime
                  );
                }
              }}
            >
              <View style={{ padding: 10 }}>
                <View
                  style={
                    isUserShift ? styles.itemContainer1 : styles.itemContainer
                  }
                >
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.dateText}>
                      {moment(item.date).format("ddd/D MM YYYY")}
                    </Text>
                    <Text style={styles.nameText}>{item.shiftName}</Text>
                    <Text style={styles.timeText}>
                      Clock In : {moment(item.startTime).format("hh:mm A")}
                    </Text>
                    <Text style={styles.timeText}>
                      Clock Out : {moment(item.endTime).format("hh:mm A")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.shiftId.toString()}
      />
      {showShiftAlert && (
        <ShiftAlert
          visible={showShiftAlert}
          title="Already Requested"
          message={`shift: ${shiftNameAlert}`}
          description={shiftDescriptionAlert}
          date={`Date: ${moment(shiftDateAlert).format("ddd/D MM YYYY")}`}
          startTime={`Start Time: ${moment(shiftstartTimeAlert).format(
            "hh:mm A"
          )}`}
          endTime={`End Time: ${moment(shiftendTimeAlert).format("hh:mm A")}`}
          onClose={handleShiftCloseAlert}
        />
      )}
      {showRequestAlert && !showShiftAlert && (
        <RequestAlert
          visible={showRequestAlert}
          title="Shift Details"
          message={`shift: ${shiftNameAlert}`}
          description={shiftDescriptionAlert}
          date={`Date: ${moment(shiftDateAlert).format("ddd/D MM YYYY")}`}
          startTime={`Start Time: ${moment(shiftstartTimeAlert).format(
            "hh:mm A"
          )}`}
          endTime={`End Time: ${moment(shiftendTimeAlert).format("hh:mm A")}`}
          onClose={handleRequestCloseAlert}
          onOk={handleRequestOkAlert}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    // marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
    color: "#333",
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default OpenShiftsScreen;
