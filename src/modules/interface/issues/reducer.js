import { combineReducers } from "redux";
import { fetchIssues } from "modules/github/api";
import * as types from "./types";

const currentPageReducer = (state = null, action) => {
  switch (action.type) {
    case fetchIssues.types.success:
      return !state ? 1 : state + 1;
    case types.SET_NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
};

export default combineReducers({
  currentPage: currentPageReducer
});
