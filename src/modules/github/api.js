import { over, lensPath } from "ramda";
import { createApi } from "core/lib/redux-graphql";
import * as types from "./types";

export const fetchIssues = createApi({
  name: types.FETCH_ISSUES,
  request: ({ owner, name, itemsPerPage, cursor }, state) => ({
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
  })
});

export const fetchOrgs = createApi({
  name: types.FETCH_ORGS,
  request: {
    query: `
      query {
        viewer {
          organizations(first: 50) {
            nodes {
              login
              viewerCanAdminister
            }
          }
        }
      }
    `
  }
});

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
