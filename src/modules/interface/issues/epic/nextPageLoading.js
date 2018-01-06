import { keys } from "ramda";
import { createStructuredSelector } from "reselect";
import { withSelector } from "core/data/redux-observable";
import * as issuesSelectors from "modules/github/issues/selectors";
import * as issuesApi from "modules/github/issues/api";
import * as actions from "../actions";
import * as selectors from "../selectors";
import * as types from "../types";

export default (action$, store) =>
  action$.ofType(types.LOAD_NEXT_PAGE_START).map(() =>
    withSelector(
      store,
      createStructuredSelector({
        cursors: issuesSelectors.getCursors,
        hasUnfetchedIssues: issuesSelectors.hasUnfetchedIssues,
        itemsPerPage: selectors.getItemsPerPage
      }),
      ({ cursors, hasUnfetchedIssues, itemsPerPage }) =>
        hasUnfetchedIssues
          ? // TODO: keep code in model
            issuesApi.fetchIssues.request(
              keys(cursors).map(repoWithOwner => {
                const [owner, name] = repoWithOwner.split("/");
                return {
                  cursor: cursors[repoWithOwner],
                  name,
                  owner,
                  itemsPerPage
                };
              })
            )
          : actions.loadNextPageFinish()
    )
  );
