import { compose, path, prop } from "ramda";
import { createSelector } from "reselect";

export const scopeSelector = state => state.modules.github.orgs;

export const getFetchOrgsApi = compose(
  path(["api", "fetchOrgs"]),
  scopeSelector
);

export const getLoadingStatus = createSelector(
  [getFetchOrgsApi],
  api => !api.lastUpdated || api.isFetching
);

export const getOrgs = createSelector(
  [getFetchOrgsApi],
  api => api.data && api.data.viewer.organizations.nodes
);

export const getAdminOrgs = createSelector(
  [getOrgs],
  orgs => orgs && orgs.filter(prop("viewerCanAdminister"))
);
