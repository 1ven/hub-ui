import { compose, prop, sort, take } from "ramda";
import { createSelector } from "reselect";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as issuesModel from "modules/github/issues/model";
import * as sprintSelectors from "modules/sprint/selectors";
import * as model from "./model";

export const scopeSelector = state => state.modules.interface.issues;
export const getCurrentPage = compose(prop("currentPage"), scopeSelector);
export const getItemsPerPage = compose(prop("itemsPerPage"), scopeSelector);

export const getBacklogIssues = createSelector(
  [issuesSelectors.getIssuesList, sprintSelectors.getSprintsIssues],
  (issues, sprintsIssues) =>
    sprintsIssues && model.getBacklogIssues(issues, sprintsIssues)
);

export const getVisibleIssues = createSelector(
  [getBacklogIssues, getCurrentPage, getItemsPerPage],
  (backlogIssues, currentPage, itemsPerPage) =>
    backlogIssues &&
    compose(take(itemsPerPage * currentPage), sort(issuesModel.compareByDate))(
      backlogIssues
    )
);

export const hasUndisplayedIssues = createSelector(
  [getBacklogIssues, getVisibleIssues],
  (backlogIssues, visibleIssues) =>
    visibleIssues &&
    backlogIssues &&
    backlogIssues.length > visibleIssues.length
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
