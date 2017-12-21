import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
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

export default persistReducer(
  { storage, key: "githubToken", whitelist: ["githubToken"] },
  combineReducers({
    api: combineReducers({
      fetchUser: api.fetchUser.reducer
    }),
    githubToken: githubTokenReducer
  })
);
