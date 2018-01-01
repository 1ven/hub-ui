import { combineReducers } from "redux";
import overlayReducer from "./overlay/reducer";

export const reducer = combineReducers({
  overlay: overlayReducer
});
