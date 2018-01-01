import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import { push } from "react-router-redux";
import { replaceParams } from "core/utils";
import paths from "routes/paths";
import * as modalsActions from "modules/interface/overlay/actions";
import * as actions from "./actions";
import * as types from "./types";
import * as api from "./api";

export default combineEpics(
  action$ =>
    action$.ofType(types.SWITCH_WORKSPACE).map(({ payload: { workspace } }) => {
      return push(
        replaceParams(paths.workspace, {
          org: workspace.assigned_to,
          slug: workspace.slug
        })
      );
    }),
  action$ =>
    action$
      .ofType(api.createWorkspace.types.success)
      .concatMap(({ payload }) =>
        Observable.from([
          modalsActions.hideCreateWorkspace(),
          actions.switchWorkspace(payload.body)
        ])
      )
);
