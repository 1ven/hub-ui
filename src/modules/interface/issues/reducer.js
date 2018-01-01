import { combineReducers } from "redux";
import { fetchIssues } from "modules/github/api";

const currentPageReducer = (state = null, action) => {
  switch (action.type) {
    case fetchIssues.types.success:
      return !state ? 1 : state + 1;
    default:
      return state;
  }
};

export default combineReducers({
  currentPage: currentPageReducer
});
