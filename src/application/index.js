import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import * as user from "./data/user";
import * as modals from "./data/modals";
import * as workspace from "./data/workspace";

export const reducer = combineReducers({
  // _modules: combineReducers({
  //   workspace: workspace.reducer
  // }),
  user: user.reducer,
  modals: modals.reducer,
  workspace: workspace.reducer
});

export const epic = combineEpics(user.epic, workspace.epic);
