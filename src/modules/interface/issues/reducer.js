import { combineReducers } from "redux";
import { none, prop } from "ramda";
import { fetchIssues } from "modules/github/issues/api";
import * as types from "./types";

const currentPageReducer = (state = null, action) => {
  switch (action.type) {
    case fetchIssues.types.success:
      return none(prop("cursor"), action.payload.request) ? 1 : state + 1;
    case types.LOAD_NEXT_PAGE_FINISH:
      return state + 1;
    default:
      return state;
  }
};

const itemsPerPageReducer = (state = 10, action) => state;

export default combineReducers({
  currentPage: currentPageReducer,
  itemsPerPage: itemsPerPageReducer
});
