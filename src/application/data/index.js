import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { reducer as userReducer, epic as userEpic } from "./user";

export const reducer = combineReducers({
  user: userReducer
});

export const epic = combineEpics(userEpic);
