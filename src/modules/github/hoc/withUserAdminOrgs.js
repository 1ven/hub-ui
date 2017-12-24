import { compose, mapProps } from "recompose";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export default compose(
  graphql(gql`
    query {
      viewer {
        organizations(first: 50) {
          edges {
            node {
              login
              viewerCanAdminister
            }
          }
        }
      }
    }
  `),
  mapProps(({ data, ...rest }) => ({
    ...rest,
    orgs: {
      isFetching: data.loading,
      data:
        data.viewer &&
        data.viewer.organizations.edges
          .filter(edge => edge.node.viewerCanAdminister)
          .map(edge => edge.node.login)
    }
  }))
);
