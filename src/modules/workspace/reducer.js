import { combineReducers } from "redux";
import { over, lensProp, append } from "ramda";
import { utils } from "core/data/redux";
import * as api from "./api";

const fetchWorkspacesReducer = utils.mergeReducers(
  api.fetchWorkspaces.reducer,
  (state = {}, action) => {
    switch (action.type) {
      case api.createWorkspace.types.success:
        return over(lensProp("data"), append(action.payload.body), state);
      default:
        return state;
    }
  }
);

export default combineReducers({
  api: combineReducers({
    createWorkspace: api.createWorkspace.reducer,
    fetchWorkspaces: fetchWorkspacesReducer
  })
});
