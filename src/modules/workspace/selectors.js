import { compose, path } from "ramda";
import { createSelector } from "reselect";

export const scopeSelector = state => state.modules.workspace;

export const createWorkspaceApi = compose(
  path(["api", "createWorkspace"]),
  scopeSelector
);

export const fetchWorkspacesApi = compose(
  path(["api", "fetchWorkspaces"]),
  scopeSelector
);

export const getWorkspaces = createSelector(
  [fetchWorkspacesApi],
  api => api.data
);

export const isCreating = createSelector(
  [createWorkspaceApi],
  api => api.isFetching
);

// TODO: move somewhere with ui selectors
export const getCurrentWorkspaceId = createSelector(
  [getWorkspaces, (_, { match }) => match],
  (workspaces, { params }) =>
    workspaces &&
    // TODO: use function to match router params with workspace data
    workspaces.find(w => w.assigned_to === params.org && w.slug === params.slug)
      .id
);
