import { compose, prop } from "ramda";

export const scopeSelector = state => state.modules.interface.overlay;

export const isCreateWorkspaceVisible = compose(
  prop("createWorkspaceModal"),
  scopeSelector
);
