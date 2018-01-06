import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import issuesReducer from "./issues/reducer";
import overlayReducer from "./overlay/reducer";
import issuesEpic from "./issues/epic";

export const reducer = combineReducers({
  overlay: overlayReducer,
  issues: issuesReducer
});

export const epic = combineEpics(issuesEpic);
