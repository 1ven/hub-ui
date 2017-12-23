import { compose, prop } from "ramda";

export const scopeSelector = state => state.app.modals;

export const isCreateWorkspaceVisible = compose(
  prop("createWorkspace"),
  scopeSelector
);
