import gql from "graphql-tag";

export default gql`
  query ReposByOrg($org: String!, $cursor: String) {
    organization(login: $org) {
      repositories(first: 5, after: $cursor) {
        nodes {
          name
          nameWithOwner
          viewerCanAdminister
        }
      }
    }
  }
`;
