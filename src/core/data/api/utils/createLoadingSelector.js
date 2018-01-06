import { createSelector } from "reselect";

export default getApi =>
  createSelector([getApi], api => !api.lastUpdated || api.isFetching);
