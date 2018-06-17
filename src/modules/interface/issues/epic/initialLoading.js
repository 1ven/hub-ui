import { Observable } from "rxjs/Observable";
import { combineEpics } from "redux-observable";
import { keys } from "ramda";
import * as workspaceModel from "modules/workspace/model";
import * as workspaceSelectors from "modules/workspace/selectors";
import * as issuesApi from "modules/github/issues/api";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as sprintApi from "modules/sprint/api";
import * as sprintUtils from "modules/sprint/utils";
import * as actions from "../actions";
import * as types from "../types";
import * as selectors from "../selectors";

// solve the problem via providing ids to the generic requests
// use takeUntil?
export default combineEpics((action$, store) =>
  action$.ofType(types.LOAD_PAGE).mergeMap(({ payload }) =>
    Observable.merge(
      Observable.of(
        sprintApi.fetchSprints.request({
          workspaceId: payload.workspaceId
        })
      ),
      action$
        .ofType(sprintApi.fetchSprints.types.success)
        .map(({ payload }) =>
          issuesApi.fetchIssueByNumber.request(
            sprintUtils.getSprintsIssuesRequests(payload.body)
          )
        ),
      action$
        .ofType(issuesApi.fetchIssueByNumber.types.success)
        .mergeMap(() => {
          const state = store.getState();
          const itemsPerPage = selectors.getItemsPerPage(state);
          const workspaces = workspaceSelectors.getWorkspaces(state);
          const repos = workspaceModel.getWorkspaceReposById(
            workspaces,
            payload.workspaceId
          );

          return Observable.merge(
            Observable.of(
              issuesApi.fetchIssues.request(
                repos.map(repo => ({
                  owner: repo.owner,
                  name: repo.name,
                  itemsPerPage
                }))
              )
            ),
            action$
              .ofType(issuesApi.fetchIssues.types.success)
              .map(() => actions.loadNextPageFinish())
          );
        }),
      // TODO: check, if he have not enough issues to display, fetch again and again etc
      // it should be recursive fetch
      action$
        .ofType(issuesApi.fetchIssues.types.success)
        .filter(() => {
          const state = store.getState();
          const visibleBacklogIssues = selectors.getVisibleIssues(state);
          const itemsPerPage = selectors.getItemsPerPage(state);
          // TODO: should check on undisplayed issues? chances are no
          const hasUnfetchedIssues = issuesSelectors.hasUnfetchedIssues(state);
          return (
            hasUnfetchedIssues && itemsPerPage > visibleBacklogIssues.length
          );
        })
        .map(() => {
          const state = store.getState();
          const cursors = issuesSelectors.getCursors(state);
          const itemsPerPage = selectors.getItemsPerPage(state);

          return issuesApi.fetchIssues.request(
            keys(cursors).map(repoWithOwner => {
              const [owner, name] = repoWithOwner.split("/");
              return {
                cursor: cursors[repoWithOwner],
                name,
                owner,
                itemsPerPage
              };
            })
          );
          // FIX: will return `undefined` otherwise. use filter with the condition above in previous method. use map here without condition
        })
    )
  )
);
