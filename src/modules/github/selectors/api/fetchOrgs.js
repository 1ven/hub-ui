import { compose, path, prop } from "ramda";
import { createSelector } from "reselect";
import { scopeSelector } from "../";

export const getApi = compose(path(["api", "fetchOrgs"]), scopeSelector);

export const getLoadingStatus = createSelector(
  [getApi],
  api => !api.lastUpdated || api.isFetching
);

export const getOrgs = createSelector(
  [getApi],
  api => api.data && api.data.viewer.organizations.nodes
);

export const getAdminOrgs = createSelector(
  [getOrgs],
  orgs => orgs && orgs.filter(prop("viewerCanAdminister"))
);
