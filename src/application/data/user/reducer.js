import { over, lensPath, append } from "ramda";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { utils } from "core/data/redux";
import * as workspaceApi from "../workspace/api";
import * as types from "./types";
import * as api from "./api";

const githubTokenReducer = (state = null, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      return action.payload.token;
    case types.UNAUHTENTICATE:
      return null;
    default:
      return state;
  }
};

const fetchUserReducer = utils.mergeReducers(
  api.fetchUser.reducer,
  (state = {}, action) => {
    switch (action.type) {
      case workspaceApi.createWorkspace.types.success:
        return over(
          lensPath(["data", "workspaces"]),
          append(action.payload.body),
          state
        );
      default:
        return state;
    }
  }
);

export default persistReducer(
  { storage, key: "githubToken", whitelist: ["githubToken"] },
  combineReducers({
    api: combineReducers({
      fetchUser: fetchUserReducer
    }),
    githubToken: githubTokenReducer
  })
);
