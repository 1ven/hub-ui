import { over, lensPath } from "ramda";
import { createApi } from "core/lib/redux-graphql";
import * as types from "./types";

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
  request: ({ org, cursor }) => ({
    query: `
      query ReposByOrg($org: String!, $cursor: String) {
        organization(login: $org) {
          repositories(first: 5, after: $cursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              name
              nameWithOwner
              viewerCanAdminister
            }
          }
        }
      }
    `,
    variables: {
      org,
      cursor
    }
  })
});
