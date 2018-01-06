import { length, values, compose, prop, path } from "ramda";
import { createSelector } from "reselect";

export const scopeSelector = state => state.modules.github.issues;

export const fetchIssuesApi = compose(
  path(["api", "fetchIssues"]),
  scopeSelector
);
export const fetchIssueByNumberApi = compose(
  path(["api", "fetchIssueByNumber"]),
  scopeSelector
);

export const issueByNumberLoading = compose(
  prop("isFetching"),
  fetchIssueByNumberApi
);
export const issuesLoading = compose(prop("isFetching"), fetchIssuesApi);
export const areIssuesLoaded = compose(
  Boolean,
  prop("lastUpdated"),
  fetchIssuesApi
);
export const getIssues = compose(prop("items"), scopeSelector);
export const getCursors = compose(prop("cursors"), scopeSelector);
export const hasUnfetchedIssues = compose(length, values, getCursors);
export const getIssuesList = createSelector([getIssues], values);
