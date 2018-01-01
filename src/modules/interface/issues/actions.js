import * as types from "./types";

export const showCreateWorkspace = page => ({
  type: types.SET_CURRENT_PAGE,
  payload: {
    page
  }
});
