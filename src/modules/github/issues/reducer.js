import { combineReducers } from "redux";
import { dissoc, assoc } from "ramda";
import { normalize } from "normalizr";
import { issue } from "./schemas";
import * as api from "./api";

const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case api.fetchIssues.types.success:
      return action.payload.body.reduce(
        (acc, item) => ({
          ...acc,
          ...normalize(item.repository.issues.nodes, [issue]).entities.issues
        }),
        state
      );
    default:
      return state;
  }
};

const cursorsReducer = (state = {}, action) => {
  switch (action.type) {
    case api.fetchIssues.types.success: {
      return action.payload.body.reduce((acc, item) => {
        const { nameWithOwner } = item.repository;
        const { hasNextPage, endCursor } = item.repository.issues.pageInfo;

        return !hasNextPage
          ? dissoc(nameWithOwner, acc)
          : assoc(nameWithOwner, endCursor, acc);
      }, state);
    }
    default:
      return state;
  }
};

export default combineReducers({
  api: combineReducers({
    fetchIssues: api.fetchIssues.reducer
  }),
  items: itemsReducer,
  cursors: cursorsReducer
});
