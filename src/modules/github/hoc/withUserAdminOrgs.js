import { compose, mapProps } from "recompose";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

// TODO: move to provider?
export default compose(
  graphql(gql`
    query {
      viewer {
        organizations(first: 50) {
          nodes {
            login
            viewerCanAdminister
            repositories(first: 5) {
              nodes {
                name
                nameWithOwner
                viewerCanAdminister
              }
            }
          }
        }
      }
    }
  `),
  // TODO: remove
  mapProps(({ data, ...rest }) => ({
    ...rest,
    orgs: {
      isFetching: data.loading,
      byAdminOrgs:
        data.viewer &&
        data.viewer.organizations.nodes
          .filter(node => node.viewerCanAdminister)
          .map(node => node.login),
      withAdminRepos:
        data.viewer &&
        data.viewer.organizations.nodes
          .filter(node => node.repositories.nodes.length)
          .map(node => ({
            title: node.login,
            items: node.repositories.nodes
              .filter(node => node.viewerCanAdminister)
              .map(node => ({
                name: node.nameWithOwner,
                title: node.name
              }))
          }))
    }
  }))
);
