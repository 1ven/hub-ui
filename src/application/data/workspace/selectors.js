import { compose, path } from "ramda";

export const scopeSelector = state => state.app.workspace;

export const getCreateWorkspaceApi = compose(
  path(["api", "createWorkspace"]),
  scopeSelector
);
