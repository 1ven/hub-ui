import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { withApi } from "core/data/api";
import { withActions } from "core/data/redux/hoc";
import { callOnMount } from "core/react/hoc";
import * as issuesUISelectors from "modules/interface/issues/selectors";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as issuesUIActions from "modules/interface/issues/actions";
import * as sprintApi from "modules/sprint/api";
import * as sprintSelectors from "modules/sprint/selectors";
import * as workspaceApi from "modules/workspace/api";
import * as workspaceSelectors from "modules/workspace/selectors";
import View from "./View";

export default compose(
  withRouter,
  // TODO: remove, use hasWorkspace temporarily instead
  withApi(workspaceApi.fetchWorkspaces),
  //
  connect(
    createStructuredSelector({
      pageLoading: issuesUISelectors.isPageLoading,
      issues: issuesUISelectors.getVisibleIssues,
      hasNextPage: issuesUISelectors.hasNextPage,
      issuesLoading: issuesSelectors.issuesLoading,
      workspaceId: workspaceSelectors.getCurrentWorkspaceId,
      sprints: sprintApi.fetchSprints.selectors.data,
      issuesBySprint: sprintSelectors.getCachedIssuesBySprint
    })
  ),
  withActions({
    loadMore: () => () => issuesUIActions.loadNextPageStart(),
    loadPage: ({ workspaceId }) => () => issuesUIActions.loadPage(workspaceId)
  }),
  callOnMount("loadPage")
)(View);
