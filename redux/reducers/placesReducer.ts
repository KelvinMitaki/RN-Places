import { AddImage } from "../../components/ImageSelector";
import { SetLocation } from "../../components/LocationPicker";
import { Place } from "../../interfaces/Redux";
import { AddPlace } from "../../screens/NewPlaceScreen";
import { FetchPlaces } from "../../screens/PlacesListScreen";

export interface PlacesState {
  places: Place[];
  image: string | null;
  location: { latitude: number; longitude: number } | null;
}

type Action = AddPlace | AddImage | FetchPlaces | SetLocation;

const INITIAL_STATE: PlacesState = {
  places: [],
  image: null,
  location: null
};

const placesReducer = (state = INITIAL_STATE, action: Action): PlacesState => {
  switch (action.type) {
    case "fetchPlaces":
      const places = action.payload.map(pl => ({
        location: { latitude: pl.lat, longitude: pl.lng },
        title: pl.title,
        id: pl.id.toString(),
        image: pl.image,
        address: pl.address
      }));
      return { ...state, places };
    case "addPlace":
      return { ...state, places: [...state.places, action.payload] };
    case "addImage":
      return { ...state, image: action.payload };
    case "setLocation":
      return { ...state, location: action.payload };
    default:
      return state;
  }
};

export default placesReducer;
