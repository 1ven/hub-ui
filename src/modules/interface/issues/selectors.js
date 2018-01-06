import { compose, prop } from "ramda";
import { createSelector } from "reselect";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as sprintSelectors from "modules/sprint/selectors";

export const scopeSelector = state => state.modules.interface.issues;
export const getCurrentPage = compose(prop("currentPage"), scopeSelector);
export const getItemsPerPage = compose(prop("itemsPerPage"), scopeSelector);

export const getVisibleIssues = createSelector(
  [issuesSelectors.getIssuesList, getCurrentPage, getItemsPerPage],
  (issues, currentPage, itemsPerPage) =>
    issues
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((_, i) => i < itemsPerPage * currentPage)
);

export const hasUndisplayedIssues = createSelector(
  [issuesSelectors.getIssuesList, getVisibleIssues],
  (issues, visibleIssues) => issues.length > visibleIssues.length
);

export const hasNextPage = createSelector(
  [issuesSelectors.hasUnfetchedIssues, hasUndisplayedIssues],
  (unfetched, undisplayed) => unfetched || undisplayed
);

export const isPageLoading = createSelector(
  [
    issuesSelectors.issuesLoading,
    issuesSelectors.issueByNumberLoading,
    sprintSelectors.sprintsLoading
  ],
  (issuesLoading, issueByNumberLoading, sprintsLoading) =>
    issuesLoading || issueByNumberLoading || sprintsLoading
);
