import { graphql } from "core/data/api/fetch";

export const fetchIssues = payload =>
  Promise.all(
    payload.map(({ owner, name, itemsPerPage, cursor }) =>
      graphql({
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
              number
              repository {
                nameWithOwner
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
    )
  );

export const fetchIssueByNumber = payload =>
  Promise.all(
    payload.map(({ owner, name, number }) =>
      graphql({
        query: `
          query IssueByNumber(
            $owner: String!
            $name: String!
            $number: Int!
          ) {
            repository(owner: $owner, name: $name) {
              issue(number: $number) {
                id
                title
                createdAt
                number
                repository {
                  nameWithOwner
                }
              }
            }
          }
      `,
        variables: {
          owner,
          name,
          number
        }
      })
    )
  );
