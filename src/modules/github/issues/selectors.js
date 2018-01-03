import { length, values, compose, prop, path } from "ramda";

export const scopeSelector = state => state.modules.github.issues;

export const fetchIssuesApi = compose(
  path(["api", "fetchIssues"]),
  scopeSelector
);

export const isLoading = compose(prop("isFetching"), fetchIssuesApi);
export const getIssues = compose(prop("items"), scopeSelector);
export const getCursors = compose(prop("cursors"), scopeSelector);
export const hasUnfetchedIssues = compose(length, values, getCursors);
