import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { Redux } from "../interfaces/Redux";

const PlaceDetailScreen: NavigationStackScreenComponent<{
  placeTitle?: string;
  placeId?: string;
}> = ({ navigation }) => {
  const place = useSelector((state: Redux) =>
    state.places.places.find(pl => pl.id === navigation.getParam("placeId"))
  );
  const { image, location, title, address } = place!;
  return (
    <ScrollView>
      <Image source={{ uri: image }} style={{ height: 200, width: "100%" }} />
      <View style={styles.map}>
        <Text style={{ color: Colors.primary, textAlign: "center" }}>
          {address}
        </Text>
        <MapView
          region={{ latitudeDelta: 0.01, longitudeDelta: 0.01, ...location }}
          style={{ height: 200, width: "100%" }}
        >
          <Marker coordinate={location} />
        </MapView>
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("placeTitle")
});
export default PlaceDetailScreen;

const styles = StyleSheet.create({
  map: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "white"
  }
});
