import { createApi } from "core/lib/redux-graphql";
import * as types from "../types";
import * as rest from "./rest";

export const createWorkspace = createApi({
  name: types.CREATE_WORKSPACE,
  request: rest.createWorkspace
});

export const fetchWorkspaces = createApi({
  name: types.FETCH_WORKSPACES,
  request: rest.fetchWorkspaces
});
