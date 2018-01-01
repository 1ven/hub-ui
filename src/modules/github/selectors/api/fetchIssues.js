import { compose, path, prop } from "ramda";
import { createSelector } from "reselect";
import * as uiSelectors from "modules/interface/issues/selectors";
import { scopeSelector } from "../";

export const fetchIssuesApi = compose(
  path(["api", "fetchIssues"]),
  scopeSelector
);

export const isLoading = compose(prop("isFetching"), fetchIssuesApi);

export const getIssues = createSelector(
  [fetchIssuesApi],
  api =>
    api.data &&
    api.data.reduce(
      (acc, item) => [...acc, ...item.repository.issues.nodes],
      []
    )
);

export const getVisibleIssues = createSelector(
  [getIssues, uiSelectors.getCurrentPage, (_, props) => props.itemsPerPage],
  (issues, currentPage, itemsPerPage) =>
    issues &&
    issues
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .filter((_, i) => i < itemsPerPage * currentPage)
);

export const getNextPageCursors = createSelector(
  [fetchIssuesApi],
  api =>
    api.data &&
    api.data.reduce((acc, item) => {
      const { hasNextPage, endCursor } = item.repository.issues.pageInfo;
      const [owner, name] = item.repository.nameWithOwner.split("/");

      if (!hasNextPage) {
        return acc;
      }

      return [
        ...acc,
        {
          owner,
          name,
          cursor: endCursor
        }
      ];
    }, [])
);

export const hasUnfetchedIssues = createSelector(
  [fetchIssuesApi],
  api =>
    api.data &&
    api.data.reduce(
      (acc, item) =>
        !item.repository.issues.pageInfo.hasNextPage ? acc : true,
      false
    )
);

export const hasUndisplayedIssues = createSelector(
  [getIssues, getVisibleIssues],
  (issues, visibleIssues) =>
    issues && visibleIssues && issues.length > visibleIssues.length
);

export const hasNextPage = createSelector(
  [hasUnfetchedIssues, hasUndisplayedIssues],
  (unfetched, undisplayed) => unfetched || undisplayed
);
