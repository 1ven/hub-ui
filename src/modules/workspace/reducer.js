import { combineReducers } from "redux";
import * as api from "./api";

export default combineReducers({
  api: combineReducers({
    createWorkspace: api.createWorkspace.reducer
  })
});
