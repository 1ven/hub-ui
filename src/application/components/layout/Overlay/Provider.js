import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { find, prop } from "ramda";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { withApi } from "core/data/api";
import { actions, selectors } from "../../../data/modals";
import * as workspaceData from "../../../data/workspace";
import { api } from "../../../data/user";
import View from "./View";

export default compose(
  withRouter,
  connect(
    createStructuredSelector({
      isModalVisible: selectors.isCreateWorkspaceVisible
    }),
    {
      onWorkspaceChange: workspaceData.actions.switchWorkspace,
      onCreateWorkspace: actions.showCreateWorkspace
    }
  ),
  withApi(api.fetchUser, api => ({
    workspaces: api.data.workspaces,
    isLoading: !api.lastUpdated
  })),
  withProps(({ match, workspaces }) => ({
    selected: compose(
      prop("id"),
      find(
        ({ assigned_to, slug }) =>
          assigned_to === match.params.org && slug === match.params.slug
      )
    )(workspaces)
  }))
)(View);
