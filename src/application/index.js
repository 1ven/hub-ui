import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import * as data from "./data";
import * as workspace from "./modules/workspace";

export const reducer = combineReducers({
  // _modules: combineReducers({
  //   workspace: workspace.reducer
  // }),
  user: data.user.reducer
});

export const epic = combineEpics(data.user.epic, workspace.epic);
