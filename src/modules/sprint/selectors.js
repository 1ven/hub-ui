import { createSelector } from "reselect";
import { prop, innerJoin, flip, compose, path } from "ramda";
import { createLoadingSelector } from "core/data/api/utils";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as utils from "./utils";

export const scopeSelector = state => state.modules.sprint;

export const getFetchSprintsApi = compose(
  path(["api", "fetchSprints"]),
  scopeSelector
);

export const getSprints = compose(prop("data"), getFetchSprintsApi);

// TODO: think, where it should be
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

export const getSprintsIssues = createSelector(
  [getFetchSprintsApi],
  api => api.data && utils.getAllSprintsIssues(api.data)
);

export const sprintsLoading = createLoadingSelector(getFetchSprintsApi);
