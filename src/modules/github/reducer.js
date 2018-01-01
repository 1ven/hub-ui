import { combineReducers } from "redux";
import * as api from "./api";

export default combineReducers({
  api: combineReducers({
    fetchIssues: api.fetchIssues.reducer,
    fetchReposByOrg: api.fetchReposByOrg.reducer,
    fetchOrgs: api.fetchOrgs.reducer
  })
});
