import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { find, prop } from "ramda";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { withApi } from "core/data/api";
import { showCreateWorkspace } from "modules/interface/actions";
import { isCreateWorkspaceVisible } from "modules/interface/selectors";
import { switchWorkspace } from "modules/workspace/actions";
import { fetchUser } from "modules/user/api";
import View from "./View";

export default compose(
  withRouter,
  connect(
    createStructuredSelector({
      isModalVisible: isCreateWorkspaceVisible
    }),
    {
      onWorkspaceChange: switchWorkspace,
      onCreateWorkspace: showCreateWorkspace
    }
  ),
  withApi(fetchUser, api => ({
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
