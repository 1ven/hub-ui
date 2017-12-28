import { compose } from "recompose";
import { prop } from "ramda";
import { graphql } from "react-apollo";
import { REPOS_BY_ORG_QUERY } from "modules/github/graphql";
import View from "./View";

export default compose(
  graphql(REPOS_BY_ORG_QUERY, {
    options: ({ org }) => ({
      variables: { org },
      notifyOnNetworkStatusChange: true
    }),
    props: ({ data: { loading, organization: org, fetchMore, ...rest } }) => ({
      isLoading: loading,
      repos:
        org &&
        org.repositories.nodes
          .filter(prop("viewerCanAdminister"))
          .map(({ name, nameWithOwner }) => ({
            title: name,
            id: nameWithOwner
          })),
      hasMore: org && org.repositories.pageInfo.hasNextPage,
      loadMore: () =>
        fetchMore({
          variables: {
            cursor: org.repositories.pageInfo.endCursor
          },
          updateQuery: (prev, { fetchMoreResult }) =>
            !fetchMoreResult
              ? prev
              : {
                  organization: {
                    repositories: {
                      ...fetchMoreResult.organization.repositories,
                      nodes: [
                        ...prev.organization.repositories.nodes,
                        ...fetchMoreResult.organization.repositories.nodes
                      ]
                    }
                  }
                }
        })
    })
  })
)(View);
