import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { find, prop } from "ramda";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { fetchApi } from "core/data/api";
import { showCreateWorkspace } from "modules/interface/overlay/actions";
import { isCreateWorkspaceVisible } from "modules/interface/overlay/selectors";
import { switchWorkspace } from "modules/workspace/actions";
import { fetchWorkspacesApi } from "modules/workspace/selectors";
import { fetchWorkspaces } from "modules/workspace/api";
import View from "./View";

export default compose(
  withRouter,
  // fetchApi(fetchWorkspaces),
  connect(
    createStructuredSelector({
      isModalVisible: isCreateWorkspaceVisible,
      workspaces: fetchWorkspacesApi
    }),
    {
      onWorkspaceChange: switchWorkspace,
      onCreateWorkspace: showCreateWorkspace
    }
  ),
  withProps(({ match, workspaces }) => ({
    selected: compose(
      prop("id"),
      // TODO: do not work with data in providers
      find(
        ({ assigned_to, slug }) =>
          assigned_to === match.params.org && slug === match.params.slug
      )
    )(workspaces.data)
  }))
)(View);
