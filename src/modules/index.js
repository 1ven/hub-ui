import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import * as user from "./user";

export const reducer = combineReducers({
  user: user.data.reducer
});

export const epic = combineEpics(user.data.epic);
