import { combineReducers } from "redux";
import * as types from "./types";

const currentPageReducer = (state = null, action) => {
  switch (action.type) {
    case types.SET_CURRENT_PAGE:
      return action.payload.page;
    default:
      return state;
  }
};

export default combineReducers({
  currentPage: currentPageReducer
});
