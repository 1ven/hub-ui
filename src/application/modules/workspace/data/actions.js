import * as types from "./types";

export const switchWorkspace = workspace => ({
  type: types.SWITCH_WORKSPACE,
  payload: {
    workspace
  }
});
