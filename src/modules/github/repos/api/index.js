import { over, lensPath } from "ramda";
import { createApi } from "core/lib/redux-graphql";
import * as types from "../types";
import * as graphql from "./graphql";

export const fetchReposByOrg = createApi({
  name: types.FETCH_REPOS_BY_ORG,
  dictionary: ({ org }) => org,
  merge: ({ cursor }, current, next) =>
    !cursor
      ? next
      : over(
          lensPath(["organization", "repositories", "nodes"]),
          nodes => [...current.organization.repositories.nodes, ...nodes],
          next
        ),
  request: graphql.fetchReposByOrg
});
