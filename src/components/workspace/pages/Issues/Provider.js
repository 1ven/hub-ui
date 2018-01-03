import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { either } from "ramda";
import { withApi, fetchApi } from "core/data/api";
import { withActions } from "core/data/redux/hoc";
import { fetchWorkspaces } from "modules/workspace/api";
import { fetchIssues } from "modules/github/api";
import { setNextPage } from "modules/interface/issues/actions";
import { fetchSprints } from "modules/sprint/api";
import * as issuesSelectors from "modules/github/selectors/api/fetchIssues";
import * as workspaceSelectors from "modules/workspace/selectors";
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
      issues: issuesSelectors.getVisibleIssues,
      nextPageCursors: issuesSelectors.getNextPageCursors,
      hasNextPage: issuesSelectors.hasNextPage,
      hasUnfetchedIssues: issuesSelectors.hasUnfetchedIssues,
      repos: workspaceSelectors.getCurrentWorkspaceRepos,
      currentWorkspace: workspaceSelectors.getCurrentWorkspace,
      sprints: fetchSprints.selectors.data,
      issuesLoading: issuesSelectors.isLoading,
      sprintsLoading: fetchSprints.selectors.isFetching
    })
  ),
  fetchApi(fetchIssues, ({ repos, itemsPerPage }) => ({
    payload: repos.map(repo => ({
      owner: repo.owner,
      name: repo.name,
      itemsPerPage
    }))
  })),
  fetchApi(fetchSprints, ({ currentWorkspace }) => ({
    payload: {
      params: {
        id: currentWorkspace.id
      }
    }
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
