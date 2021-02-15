import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { enableScreens } from "react-native-screens";
import Colors from "./constants/Colors";
import MapScreen from "./screens/MapScreen";
import NewPlaceScreen from "./screens/NewPlaceScreen";
import PlaceDetailScreen from "./screens/PlaceDetailScreen";
import PlacesListScreen from "./screens/PlacesListScreen";
import { createStore } from "redux";
import reducers from "./redux";
import { Provider } from "react-redux";
import { init } from "./helpers/db";

enableScreens();

init()
  .then(() => {
    console.log("db initialized");
  })
  .catch(err => console.log(err));

const store = createStore(reducers);

const StackNavigator = createStackNavigator(
  {
    PlacesList: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
      },
      headerTintColor: Platform.OS === "ios" ? Colors.primary : "white"
    }
  }
);

const App = createAppContainer(StackNavigator);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
