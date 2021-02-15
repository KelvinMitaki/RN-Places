import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Place } from "../interfaces/Redux";

interface Props {
  place: Place;
  onSelect: () => void;
}

const PlaceItem: React.FC<Props> = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.place.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.place.title}</Text>
        <Text style={styles.address}>{props.place.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: "#666",
    fontSize: 16
  }
});

export default PlaceItem;