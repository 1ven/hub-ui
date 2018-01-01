import { combineReducers } from "redux";
import * as types from "./types";

const createWorkspaceModalReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_CREATE_WORKSPACE:
      return true;
    case types.HIDE_CREATE_WORKSPACE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  createWorkspaceModal: createWorkspaceModalReducer
});
