import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import * as user from "./data/user";
import * as workspace from "./modules/workspace";

export const reducer = combineReducers({
  // _modules: combineReducers({
  //   workspace: workspace.reducer
  // }),
  user: user.reducer
});

export const epic = combineEpics(user.epic, workspace.epic);
