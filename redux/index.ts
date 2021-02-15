import { combineReducers } from "redux";
import placesReducer from "./reducers/placesReducer";

const reducers = combineReducers({
  places: placesReducer
});

export default reducers;
