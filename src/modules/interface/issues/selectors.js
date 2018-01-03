import { compose, prop, values } from "ramda";
import { createSelector } from "reselect";
import * as issuesSelectors from "modules/github/issues/selectors";

export const scopeSelector = state => state.modules.interface.issues;

export const getCurrentPage = compose(prop("currentPage"), scopeSelector);
export const getItemsPerPage = (_, props) => props.itemsPerPage;

export const getVisibleIssues = createSelector(
  [issuesSelectors.getIssues, getCurrentPage, getItemsPerPage],
  (issues, currentPage, itemsPerPage) =>
    values(issues)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((_, i) => i < itemsPerPage * currentPage)
);

export const hasUndisplayedIssues = createSelector(
  [issuesSelectors.getIssues, getVisibleIssues],
  (issues, visibleIssues) => values(issues).length > visibleIssues.length
);

export const hasNextPage = createSelector(
  [issuesSelectors.hasUnfetchedIssues, hasUndisplayedIssues],
  (unfetched, undisplayed) => unfetched || undisplayed
);
