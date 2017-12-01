import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import * as api from "./api";

const githubTokenReducer = (state = null, action) => {
  switch (action.type) {
    case api.authenticateGitHub.types.success:
      return action.payload.body.access_token;
    default:
      return state;
  }
};

export default persistReducer(
  { storage, key: "githubToken", whitelist: ["githubToken"] },
  combineReducers({
    api: combineReducers({
      authenticateGithub: api.authenticateGitHub.reducer
    }),
    githubToken: githubTokenReducer
  })
);
