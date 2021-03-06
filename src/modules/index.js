import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import {
  reducer as interfaceReducer,
  epic as interfaceEpic
} from "./interface";
import { reducer as githubReducer } from "./github";

import userReducer from "./user/reducer";
import workspaceReducer from "./workspace/reducer";
import sprintReducer from "./sprint/reducer";

import userEpic from "./user/epic";
import workspaceEpic from "./workspace/epic";

export const reducer = combineReducers({
  interface: interfaceReducer,
  user: userReducer,
  workspace: workspaceReducer,
  github: githubReducer,
  sprint: sprintReducer
});

export const epic = combineEpics(userEpic, workspaceEpic, interfaceEpic);
