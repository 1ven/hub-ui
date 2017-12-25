import { compose, prop } from "ramda";

export const scopeSelector = state => state.modules.interface;

export const isCreateWorkspaceVisible = compose(
  prop("createWorkspace"),
  scopeSelector
);
