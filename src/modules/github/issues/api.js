import { createApi } from "core/lib/redux-graphql";
import * as types from "./types";

export const fetchIssues = createApi({
  name: types.FETCH_ISSUES,
  request: (payload, state) =>
    payload.map(({ owner, name, itemsPerPage, cursor }) => ({
      // batching
      // queries: ({ repos }) => [``, ``],
      query: `
      query IssuesByRepo(
        $owner: String!
        $name: String!
        $itemsPerPage: Int!
        $cursor: String
      ) {
        repository(owner: $owner, name: $name) {
          nameWithOwner
          issues(
            first: $itemsPerPage
            after: $cursor
            orderBy: { field: CREATED_AT, direction: DESC }
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              title
              createdAt
              repository {
                nameWithOwner,
              }
            }
          }
        }
      }
    `,
      variables: {
        owner,
        name,
        itemsPerPage,
        cursor
      }
    }))
});
