import { compose, prop } from "ramda";
import { createSelector } from "reselect";
import * as issuesSelectors from "modules/github/issues/selectors";

export const scopeSelector = state => state.modules.interface.issues;
export const getItemsPerPage = (_, props) => props.itemsPerPage;
export const getCurrentPage = compose(prop("currentPage"), scopeSelector);

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
