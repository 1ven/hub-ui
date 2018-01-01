import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { withApi } from "core/data/api";
import { withQueries } from "core/data/apollo/hoc";
import { fetchWorkspaces } from "modules/workspace/api";
import { ISSUES_BY_REPO_QUERY } from "modules/github/graphql";
import { fetchIssues } from "modules/github/api";
import { getCurrentWorkspaceRepos } from "modules/workspace/selectors";
import View from "./View";

export default compose(
  withRouter,
  // TODO: remove, use hasWorkspace temporarily instead
  withApi(fetchWorkspaces),
  connect(
    createStructuredSelector({
      repos: getCurrentWorkspaceRepos
    })
  ),
  withProps({
    itemsPerPage: 10
  }),
  // TODO: replace `issues` by mapping fn
  withQueries(
    (res, { itemsPerPage }) => ({
      // TODO: move to model?
      issues: res
        .reduce((acc, item) => [...acc, ...item.repository.issues.nodes], [])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((_, i) => i < itemsPerPage)
    }),
    ({ repos, itemsPerPage }) =>
      repos.map(repo => ({
        query: ISSUES_BY_REPO_QUERY,
        variables: {
          ...repo,
          itemsPerPage
        }
      }))
  )
  // withApi(fetchIssues, api => ({ issues2: api.data }), {
  //   request: ({ itemsPerPage }) => ({
  //     owner: "1ven-org",
  //     name: "ui",
  //     itemsPerPage: 2
  //   })
  // })
)(View);
