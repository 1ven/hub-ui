import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { withApi, fetchApi } from "core/data/api";
import { withActions } from "core/data/redux/hoc";
import { fetchWorkspaces } from "modules/workspace/api";
import { fetchIssues } from "modules/github/api";
import { setNextPage } from "modules/interface/issues/actions";
import * as issuesSelectors from "modules/github/selectors/api/fetchIssues";
import { getCurrentWorkspaceRepos } from "modules/workspace/selectors";
import View from "./View";

export default compose(
  withRouter,
  // TODO: remove, use hasWorkspace temporarily instead
  withApi(fetchWorkspaces),
  //
  withProps({
    itemsPerPage: 10
  }),
  connect(
    createStructuredSelector({
      repos: getCurrentWorkspaceRepos,
      issues: issuesSelectors.getVisibleIssues,
      isLoading: issuesSelectors.isLoading,
      nextPageCursors: issuesSelectors.getNextPageCursors,
      hasNextPage: issuesSelectors.hasNextPage,
      hasUnfetchedIssues: issuesSelectors.hasUnfetchedIssues
    })
  ),
  fetchApi(fetchIssues, ({ repos, itemsPerPage }) => ({
    payload: repos.map(repo => ({
      owner: repo.owner,
      name: repo.name,
      itemsPerPage
    }))
  })),
  withActions(({ hasUnfetchedIssues, nextPageCursors, itemsPerPage }) => ({
    loadMore: () =>
      hasUnfetchedIssues
        ? fetchIssues.request(
            nextPageCursors.map(({ name, owner, cursor }) => ({
              name,
              owner,
              cursor,
              itemsPerPage
            }))
          )
        : setNextPage()
  }))
)(View);
