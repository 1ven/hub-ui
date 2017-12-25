import { over, lensProp, T, F } from "ramda";
import * as types from "./types";

export default (
  state = {
    createWorkspace: false
  },
  action
) => {
  switch (action.type) {
    case types.SHOW_CREATE_WORKSPACE:
      return over(lensProp("createWorkspace"), T, state);
    case types.HIDE_CREATE_WORKSPACE:
      return over(lensProp("createWorkspace"), F, state);
    default:
      return state;
  }
};
