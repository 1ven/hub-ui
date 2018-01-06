import * as types from "./types";

export const loadPage = workspaceId => ({
  type: types.LOAD_PAGE,
  payload: {
    workspaceId
  }
});

export const loadNextPageStart = () => ({
  type: types.LOAD_NEXT_PAGE_START
});

export const loadNextPageFinish = () => ({
  type: types.LOAD_NEXT_PAGE_FINISH
});
