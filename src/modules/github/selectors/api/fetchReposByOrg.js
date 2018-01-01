import { compose, path, prop } from "ramda";
import { createSelector } from "reselect";
import { scopeSelector } from "../";

export const getApi = createSelector(
  [
    compose(path(["api", "fetchReposByOrg"]), scopeSelector),
    (_, { org }) => org
  ],
  (apis, org) => apis[org]
);

export const reposLoadingStatus = createSelector(
  [getApi],
  api => api && api.isFetching
);

export const getAdminReposByOrg = createSelector(
  [getApi],
  api =>
    api &&
    api.data &&
    api.data.organization.repositories.nodes.filter(prop("viewerCanAdminister"))
);

export const hasMoreRepos = createSelector(
  [getApi],
  api =>
    api && api.data && api.data.organization.repositories.pageInfo.hasNextPage
);

export const getReposCursor = createSelector(
  [getApi],
  api =>
    api && api.data && api.data.organization.repositories.pageInfo.endCursor
);
