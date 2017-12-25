import { createApi } from "redux-server-middleware";
import * as types from "./types";
import * as selectors from "./selectors";

export const fetchUser = createApi({
  name: types.FETCH_USER,
  url: process.env.REACT_APP_API + "/user",
  method: "GET",
  selector: selectors.getFetchUserApi,
  map: {
    response: JSON.parse
  },
  headers: state => ({
    authorization: `Bearer ${selectors.getToken(state)}`
  })
});
