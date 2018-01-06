import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { keys, either } from "ramda";
import { createStructuredSelector } from "reselect";
import { withApi, fetchApi } from "core/data/api";
import { withActions } from "core/data/redux/hoc";
import { fetchWorkspaces } from "modules/workspace/api";
import { fetchIssues } from "modules/github/issues/api";
import { setNextPage } from "modules/interface/issues/actions";
import { fetchSprints } from "modules/sprint/api";
import * as issuesUISelectors from "modules/interface/issues/selectors";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as workspaceSelectors from "modules/workspace/selectors";
import * as sprintSelectors from "modules/sprint/selectors";
import View from "./View";

export default compose(
  withRouter,
  // TODO: remove, use hasWorkspace temporarily instead
  withApi(fetchWorkspaces),
  //
  withProps({
    itemsPerPage: 2
  }),
  connect(
    createStructuredSelector({
      pageLoading: either(
        fetchSprints.selectors.isFetching,
        issuesSelectors.issueByNumberLoading
      ),
      issues: issuesUISelectors.getVisibleIssues,
      cursors: issuesSelectors.getCursors,
      hasNextPage: issuesUISelectors.hasNextPage,
      hasUnfetchedIssues: issuesSelectors.hasUnfetchedIssues,
      repos: workspaceSelectors.getCurrentWorkspaceRepos,
      currentWorkspace: workspaceSelectors.getCurrentWorkspace,
      sprints: fetchSprints.selectors.data,
      issuesLoading: issuesSelectors.issuesLoading,
      issuesBySprint: sprintSelectors.getCachedIssuesBySprint
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
  withActions(({ hasUnfetchedIssues, cursors, itemsPerPage }) => ({
    loadMore: () =>
      hasUnfetchedIssues
        ? fetchIssues.request(
            keys(cursors).map(repoWithOwner => {
              const [owner, name] = repoWithOwner.split("/");
              return {
                cursor: cursors[repoWithOwner],
                name,
                owner,
                itemsPerPage
              };
            })
          )
        : setNextPage()
  }))
)(View);
