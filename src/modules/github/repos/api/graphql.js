import { graphql } from "core/data/api/fetch";

export const fetchReposByOrg = ({ org, cursor }) =>
  graphql({
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
  });
