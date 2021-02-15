import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  HeaderButton,
  HeaderButtons,
  Item
} from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Place, Redux } from "../interfaces/Redux";
import PlaceItem from "../components/PlaceItem";
import { fetchPlaces } from "../helpers/db";
import Colors from "../constants/Colors";

interface FetchedPlace {
  address: string;
  id: number;
  image: string;
  lat: number;
  lng: number;
  title: string;
}

export interface FetchPlaces {
  type: "fetchPlaces";
  payload: FetchedPlace[];
}

const PlacesListScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { places } = useSelector((state: Redux) => state.places);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = (await fetchPlaces()) as any;
        dispatch<FetchPlaces>({
          type: "fetchPlaces",
          payload: res.rows._array
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetch();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <PlaceItem
            place={item}
            onSelect={() =>
              navigation.navigate("PlaceDetail", {
                placeTitle: item.title,
                placeId: item.id
              })
            }
          />
        )}
      />
    </View>
  );
};

PlacesListScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "All Places",
  headerRight: ({ tintColor }) => (
    <HeaderButtons HeaderButtonComponent={props => <HeaderButton {...props} />}>
      <Item
        title="Add"
        IconComponent={Ionicons}
        iconName="add"
        iconSize={23}
        color={tintColor}
        onPress={() => navigation.navigate("NewPlace")}
      />
    </HeaderButtons>
  )
});

export default PlacesListScreen;

const styles = StyleSheet.create({});
