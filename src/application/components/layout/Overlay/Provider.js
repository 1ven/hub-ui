import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { find, prop } from "ramda";
import { withActions } from "core/redux/hoc";
import { withApi } from "core/api";
import { actions } from "../../../data/modals";
import * as workspaceData from "application/modules/workspace/data";
import { api } from "../../../data/user";
import View from "./View";

export default compose(
  withRouter,
  withActions({
    onWorkspaceChange: workspaceData.actions.switchWorkspace,
    onCreateWorkspace: actions.showCreateWorkspace
  }),
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
