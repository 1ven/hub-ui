import { createApi } from "core/lib/redux-graphql";
import * as types from "../types";
import * as graphql from "./graphql";

export const fetchIssues = createApi({
  name: types.FETCH_ISSUES,
  request: graphql.fetchIssues
});

export const fetchIssueByNumber = createApi({
  name: types.FETCH_ISSUE_BY_NUMBER,
  request: graphql.fetchIssueByNumber
});
