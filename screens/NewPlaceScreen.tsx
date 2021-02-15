import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import ImageSelector, { AddImage } from "../components/ImageSelector";
import Colors from "../constants/Colors";
import { Place, Redux } from "../interfaces/Redux";
import { insertPlace } from "../helpers/db";
import { SQLResultSet } from "expo-sqlite";
import LocationPicker from "../components/LocationPicker";
import axios from "axios";

export interface AddPlace {
  type: "addPlace";
  payload: Place;
}
const NewPlaceScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { image, location } = useSelector((state: Redux) => state.places);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch<AddImage>({ type: "addImage", payload: null });
    };
  }, []);
  return (
    <ScrollView>
      <View style={{ paddingTop: "10%", paddingBottom: 10 }}>
        <Input
          placeholder="Title"
          onChangeText={t => setTitle(t)}
          value={title}
        />
        <ImageSelector />
        <LocationPicker />
        <Button
          title="Save Place"
          buttonStyle={{
            backgroundColor: Colors.primary,
            marginHorizontal: 10
          }}
          onPress={async () => {
            if (image && location) {
              const imageArrName = image.split("/");
              const imageName = imageArrName[imageArrName.length - 1];
              const newPath = FileSystem.documentDirectory + imageName;

              try {
                const { latitude, longitude } = location;
                setLoading(true);
                const res = await axios.get(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_GEOCODE}`
                );
                if (!res.data.results) {
                  return Alert.alert(
                    "Error",
                    "something went wrong while saving the image, please try again"
                  );
                }
                const address = res.data.results[0].formatted_address;
                await FileSystem.moveAsync({ from: image, to: newPath });
                const dbResult = (await insertPlace(
                  title,
                  newPath,
                  address,
                  latitude,
                  longitude
                )) as SQLResultSet;
                dispatch<AddPlace>({
                  type: "addPlace",
                  payload: {
                    title,
                    id: dbResult.insertId.toString(),
                    image: newPath,
                    location,
                    address
                  }
                });
                setLoading(false);
                navigation.popToTop();
              } catch (error) {
                console.log(error.response);
                setLoading(false);
                Alert.alert(
                  "Error",
                  "something went wrong while saving the image, please try again"
                );
              }
            }
          }}
          disabled={!title.trim().length || !image || !location}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place"
};

export default NewPlaceScreen;

const styles = StyleSheet.create({});
