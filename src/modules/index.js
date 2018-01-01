import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import { reducer as interfaceReducer } from "./interface";

import githubReducer from "./github/reducer";
import userReducer from "./user/reducer";
import workspaceReducer from "./workspace/reducer";

import userEpic from "./user/epic";
import workspaceEpic from "./workspace/epic";

export const reducer = combineReducers({
  interface: interfaceReducer,
  user: userReducer,
  workspace: workspaceReducer,
  github: githubReducer
});

export const epic = combineEpics(userEpic, workspaceEpic);
