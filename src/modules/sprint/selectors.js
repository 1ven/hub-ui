import { compose, path } from "ramda";

export const scopeSelector = state => state.modules.sprint;

export const getFetchSprintsApi = compose(
  path(["api", "fetchSprints"]),
  scopeSelector
);
