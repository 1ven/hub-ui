import { createApi } from "core/lib/redux-graphql";
import * as types from "../types";
import * as graphql from "./graphql";

export const fetchOrgs = createApi({
  name: types.FETCH_ORGS,
  request: graphql.fetchOrgs
});
