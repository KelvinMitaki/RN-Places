import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const MapScreen: NavigationStackScreenComponent<{
  latitude?: number;
  longitude?: number;
  isEditable?: boolean;
}> = ({ navigation }) => {
  const [selected, setSelected] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  useEffect(() => {
    if (selected) {
      navigation.setParams(selected);
    }
  }, [selected]);
  const lat = navigation.getParam("latitude");
  const lng = navigation.getParam("longitude");
  const isEditable = navigation.getParam("isEditable");
  const renderMarker = () => {
    if (selected) {
      return <Marker coordinate={selected} />;
    }
    if (lng && lat) {
      return <Marker coordinate={{ latitude: lat, longitude: lng }} />;
    }
  };
  return (
    <MapView
      style={{ flex: 1 }}
      region={{
        latitudeDelta: lat ? 0.01 : 10,
        longitudeDelta: lng ? 0.01 : 10,
        latitude: lat || 0.0236,
        longitude: lng || 37.9062
      }}
      onPress={e => isEditable && setSelected(e.nativeEvent.coordinate)}
    >
      {renderMarker()}
    </MapView>
  );
};

MapScreen.navigationOptions = ({ navigation }) => ({
  headerRight: props => (
    <TouchableOpacity
      onPress={() => {
        const latitude = navigation.getParam("latitude");
        const longitude = navigation.getParam("longitude");
        if (latitude && longitude) {
          navigation.navigate("NewPlace", { latitude, longitude });
        }
      }}
      style={{ marginHorizontal: 20 }}
    >
      <Text style={{ color: props.tintColor, fontSize: 16 }}>Save</Text>
    </TouchableOpacity>
  )
});

export default MapScreen;

const styles = StyleSheet.create({});
