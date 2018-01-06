import { combineEpics } from "redux-observable";
import * as issuesApi from "modules/github/issues/api";
import * as api from "./api";
import * as utils from "./utils";

export default combineEpics(action$ =>
  action$
    .ofType(api.fetchSprints.types.success)
    .map(({ payload }) =>
      issuesApi.fetchIssueByNumber.request(
        utils.getSprintsIssuesRequests(payload.body)
      )
    )
);
