import { compose, path } from "ramda";

export const scopeSelector = state => state.modules.workspace;

export const getCreateWorkspaceApi = compose(
  path(["api", "createWorkspace"]),
  scopeSelector
);

export const fetchWorkspacesApi = compose(
  path(["api", "fetchWorkspaces"]),
  scopeSelector
);
