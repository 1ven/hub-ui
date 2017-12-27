import gql from "graphql-tag";

export default gql`
  query Orgs {
    viewer {
      organizations(first: 50) {
        nodes {
          login
          viewerCanAdminister
        }
      }
    }
  }
`;
