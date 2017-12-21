import { combineEpics } from "redux-observable";
import { push } from "react-router-redux";
import { replaceParams } from "core/utils";
import paths from "gateway/paths";
import * as types from "./types";

export default combineEpics(action$ =>
  action$.ofType(types.SWITCH_WORKSPACE).map(({ payload: { workspace } }) => {
    return push(
      replaceParams(paths.workspace, {
        org: workspace.assigned_to,
        slug: workspace.slug
      })
    );
  })
);
