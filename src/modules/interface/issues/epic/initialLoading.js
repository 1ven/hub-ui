import { Observable } from "rxjs/Observable";
import { combineEpics } from "redux-observable";
import * as workspaceModel from "modules/workspace/model";
import * as workspaceSelectors from "modules/workspace/selectors";
import * as issuesApi from "modules/github/issues/api";
import * as sprintApi from "modules/sprint/api";
import * as sprintUtils from "modules/sprint/utils";
import * as types from "../types";
import * as selectors from "../selectors";

export default combineEpics((action$, store) =>
  action$.ofType(types.LOAD_PAGE).mergeMap(({ payload }) =>
    Observable.merge(
      Observable.of(
        sprintApi.fetchSprints.request({
          params: { id: payload.workspaceId }
        })
      ),
      action$
        .ofType(sprintApi.fetchSprints.types.success)
        .map(({ payload }) =>
          issuesApi.fetchIssueByNumber.request(
            sprintUtils.getSprintsIssuesRequests(payload.body)
          )
        ),
      action$.ofType(issuesApi.fetchIssueByNumber.types.success).map(() => {
        const state = store.getState();
        const itemsPerPage = selectors.getItemsPerPage(state);
        const workspaces = workspaceSelectors.getWorkspaces(state);
        const repos = workspaceModel.getWorkspaceReposById(
          workspaces,
          payload.workspaceId
        );

        return issuesApi.fetchIssues.request(
          repos.map(repo => ({
            owner: repo.owner,
            name: repo.name,
            itemsPerPage
          }))
        );
        // TODO: check, if he have not enough issues to display, fetch again and again etc
      })
    )
  )
);
