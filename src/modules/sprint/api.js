import { createApi } from "redux-server-middleware";
import * as types from "./types";
import * as selectors from "./selectors";
import * as userSelectors from "modules/user/selectors";

export const fetchSprints = createApi({
  name: types.FETCH_SPRINTS,
  url: process.env.REACT_APP_API + "/workspaces/:id/sprints",
  method: "GET",
  selector: selectors.getFetchSprintsApi,
  map: {
    response: JSON.parse
  },
  headers: state => ({
    authorization: `Bearer ${userSelectors.getToken(state)}`
  })
});
