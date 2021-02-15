import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const PlaceDetailScreen: NavigationStackScreenComponent<{
  placeTitle?: string;
  placeId?: string;
}> = () => {
  return (
    <View>
      <Text>PlaceDetailScreen PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("placeTitle")
});
export default PlaceDetailScreen;

const styles = StyleSheet.create({});
