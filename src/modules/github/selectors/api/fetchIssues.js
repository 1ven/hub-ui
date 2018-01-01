import { compose, path } from "ramda";
import { createSelector } from "reselect";
import { scopeSelector } from "../";

export const fetchIssuesApi = compose(
  path(["api", "fetchIssues"]),
  scopeSelector
);

export const getLastIssues = createSelector(
  [fetchIssuesApi, (_, props) => props.itemsPerPage],
  (api, itemsPerPage) =>
    api.data &&
    api.data
      .reduce((acc, item) => [...acc, ...item.repository.issues.nodes], [])
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((_, i) => i < itemsPerPage)
);
