import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

export interface AddImage {
  type: "addImage";
  payload: string | null;
}

const ImageSelector = () => {
  const dispatch = useDispatch();
  const { image } = useSelector((state: Redux) => state.places);
  const takeImageHandler = async () => {
    const res = await ImagePicker.requestCameraPermissionsAsync();
    if (res.granted) {
      const res = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5
      });
      if (!res.cancelled) {
        dispatch<AddImage>({ type: "addImage", payload: res.uri });
      }
    } else {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app"
      );
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.imageSelector}>
        <View style={styles.imagePreview}>
          {!image ? (
            <Text>No image picked yet</Text>
          ) : (
            <Image source={{ uri: image }} containerStyle={styles.image} />
          )}
        </View>
        <Button
          title="Take Image"
          buttonStyle={{ backgroundColor: Colors.primary, marginBottom: 10 }}
          containerStyle={{ width: "100%", paddingHorizontal: 10 }}
          onPress={() => takeImageHandler()}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imageSelector: {
    alignItems: "center"
  },
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
