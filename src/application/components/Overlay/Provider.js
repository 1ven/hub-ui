import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { find, prop } from "ramda";
import { hoc } from "core/redux";
import { withApi } from "core/api";
import * as workspaceData from "application/modules/workspace/data";
import { user as userData } from "../../data";
import View from "./View";

export default compose(
  withRouter,
  hoc.withActions({
    onWorkspaceChange: workspaceData.actions.switchWorkspace
  }),
  withApi(userData.api.fetchUser, api => ({
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
