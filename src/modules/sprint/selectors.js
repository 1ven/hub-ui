import { createSelector } from "reselect";
import { innerJoin, flip, compose, path } from "ramda";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as utils from "./utils";

export const scopeSelector = state => state.modules.sprint;

export const getFetchSprintsApi = compose(
  path(["api", "fetchSprints"]),
  scopeSelector
);

export const getCachedIssuesBySprint = createSelector(
  [issuesSelectors.getIssuesList, getFetchSprintsApi],
  (issues, sprintsApi) =>
    sprintsApi.data &&
    sprintsApi.data.reduce(
      (acc, sprint) => ({
        ...acc,
        [sprint.id]: innerJoin(
          flip(utils.areIssuesEqual),
          issues,
          sprint.issues
        )
      }),
      {}
    )
);
