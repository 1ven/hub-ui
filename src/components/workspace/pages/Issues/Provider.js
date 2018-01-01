import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { withApi } from "core/data/api";
import { fetchApi } from "core/data/api";
import { fetchWorkspaces } from "modules/workspace/api";
import { fetchIssues } from "modules/github/api";
import * as selectors from "modules/github/selectors/api/fetchIssues";
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
      issues: selectors.getLastIssues
      // cursorsByRepo:
    })
  ),
  fetchApi(fetchIssues, ({ repos, itemsPerPage }) => ({
    payload: repos.map(repo => ({
      owner: repo.owner,
      name: repo.name,
      itemsPerPage
    }))
  }))
)(View);
