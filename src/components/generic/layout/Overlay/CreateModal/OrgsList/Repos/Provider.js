import { compose } from "recompose";
import { map, filter, applySpec } from "ramda";
import { graphql } from "react-apollo";
import { REPOS_BY_ORG_QUERY } from "modules/github/graphql";
import * as utils from "modules/github/utils";
import View from "./View";

export default compose(
  graphql(REPOS_BY_ORG_QUERY, {
    options: ({ org }) => ({
      variables: { org }
    }),
    props: ({ data: { loading, organization } }) => ({
      isLoading: loading,
      repos:
        organization &&
        compose(
          map(
            applySpec({
              title: utils.getRepoName,
              id: utils.getRepoFullName
            })
          ),
          filter(utils.isRepoAdmin),
          utils.getOrgRepos
        )(organization)
    })
  })
)(View);
