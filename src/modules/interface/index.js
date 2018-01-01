import { combineReducers } from "redux";
import issuesReducer from "./issues/reducer";
import overlayReducer from "./overlay/reducer";

export const reducer = combineReducers({
  overlay: overlayReducer,
  issues: issuesReducer
});
