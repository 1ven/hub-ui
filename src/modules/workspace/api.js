import { createApi } from "redux-server-middleware";
import * as types from "./types";
import * as userSelectors from "../user/selectors";
import * as selectors from "./selectors";

export const createWorkspace = createApi({
  name: types.CREATE_WORKSPACE,
  url: process.env.REACT_APP_API + "/workspaces",
  method: "POST",
  selector: selectors.getCreateWorkspaceApi,
  map: {
    request: JSON.stringify,
    response: JSON.parse
  },
  headers: state => ({
    authorization: `Bearer ${userSelectors.getToken(state)}`,
    "content-type": "application/json"
  })
});

export const fetchWorkspaces = createApi({
  name: types.FETCH_WORKSPACES,
  url: process.env.REACT_APP_API + "/workspaces",
  method: "GET",
  selector: selectors.fetchWorkspacesApi,
  map: {
    request: JSON.stringify,
    response: JSON.parse
  },
  headers: state => ({
    authorization: `Bearer ${userSelectors.getToken(state)}`,
    "content-type": "application/json"
  })
});
