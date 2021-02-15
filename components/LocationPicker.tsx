import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as Location from "expo-location";
import Colors from "../constants/Colors";
import { LocationObject } from "expo-location";
import MapView, { Circle, Marker } from "react-native-maps";
import {
  NavigationEvents,
  NavigationInjectedProps,
  withNavigation
} from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

export interface SetLocation {
  type: "setLocation";
  payload: { latitude: number; longitude: number } | null;
}

const LocationPicker: React.FC<
  NavigationInjectedProps<{ latitude?: number; longitude?: number }>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { location } = useSelector((state: Redux) => state.places);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      dispatch<SetLocation>({ type: "setLocation", payload: null });
    };
  }, []);
  const getLocationHandler = async () => {
    try {
      const res = await Location.requestPermissionsAsync();
      if (res.granted) {
        setIsFetching(true);
        const locationObj = await Location.getCurrentPositionAsync();
        setIsFetching(false);
        dispatch<SetLocation>({
          type: "setLocation",
          payload: {
            latitude: locationObj.coords.latitude,
            longitude: locationObj.coords.longitude
          }
        });
      } else {
        setIsFetching(false);
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant camera permissions to use this app"
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Could not fetch location",
        "Please try again later or pick location on the map"
      );
    }
  };
  const renderMap = () => {
    if (isFetching) {
      return <ActivityIndicator size="large" color={Colors.primary} />;
    }
    if (!location) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Text>No Location Chosen Yet</Text>
        </TouchableOpacity>
      );
    }
    if (location) {
      return (
        <MapView
          style={{ height: "100%", width: "100%" }}
          region={{
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            ...location
          }}
        >
          <Marker coordinate={location} />
        </MapView>
      );
    }
  };
  return (
    <View>
      <NavigationEvents
        onWillFocus={() => {
          const latitude = navigation.getParam("latitude");
          const longitude = navigation.getParam("longitude");
          if (latitude && longitude) {
            dispatch<SetLocation>({
              type: "setLocation",
              payload: {
                latitude,
                longitude
              }
            });
          }
        }}
      />
      <View style={styles.location}>{renderMap()}</View>
      <View>
        <Button
          title="Get User Location"
          buttonStyle={styles.btn}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick On Map"
          buttonStyle={styles.btn}
          onPress={() => {
            navigation.navigate("Map", {
              ...(location && {
                latitude: location.latitude,
                longitude: location.longitude
              }),
              isEditable: true
            });
          }}
        />
      </View>
    </View>
  );
};

export default withNavigation(LocationPicker);

const styles = StyleSheet.create({
  location: {
    height: 200,
    width: "95%",
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "center",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: Colors.primary,
    marginHorizontal: 10,
    marginBottom: 20
  }
});
