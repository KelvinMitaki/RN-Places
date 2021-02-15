import { PlacesState } from "../redux/reducers/placesReducer";

export interface Redux {
  places: PlacesState;
}

export interface Place {
  title: string;
  id: string;
  image: string;
  address?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
