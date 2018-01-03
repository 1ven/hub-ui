import { combineReducers } from "redux";
import issuesReducer from "./issues/reducer";
import orgsReducer from "./orgs/reducer";
import reposReducer from "./repos/reducer";

export const reducer = combineReducers({
  issues: issuesReducer,
  orgs: orgsReducer,
  repos: reposReducer
});
