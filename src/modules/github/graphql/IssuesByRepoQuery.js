import gql from "graphql-tag";

export default gql`
  query IssuesByRepo(
    $owner: String!
    $name: String!
    $itemsPerPage: Int!
    $cursor: String
  ) {
    repository(owner: $owner, name: $name) {
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
            nameWithOwner
          }
        }
      }
    }
  }
`;
