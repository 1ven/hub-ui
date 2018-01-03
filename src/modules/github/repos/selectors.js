import { compose, path, prop } from "ramda";
import { createSelector } from "reselect";

export const scopeSelector = state => state.modules.github.repos;

export const getFetchReposByOrgApi = createSelector(
  [
    compose(path(["api", "fetchReposByOrg"]), scopeSelector),
    (_, { org }) => org
  ],
  (apis, org) => apis[org]
);

export const reposLoadingStatus = createSelector(
  [getFetchReposByOrgApi],
  api => api && api.isFetching
);

export const getAdminReposByOrg = createSelector(
  [getFetchReposByOrgApi],
  api =>
    api &&
    api.data &&
    api.data.organization.repositories.nodes.filter(prop("viewerCanAdminister"))
);

export const hasMoreRepos = createSelector(
  [getFetchReposByOrgApi],
  api =>
    api && api.data && api.data.organization.repositories.pageInfo.hasNextPage
);

export const getReposCursor = createSelector(
  [getFetchReposByOrgApi],
  api =>
    api && api.data && api.data.organization.repositories.pageInfo.endCursor
);
