import { createApi } from "core/lib/redux-graphql";
import * as types from "../types";
import * as rest from "./rest";

export const fetchUser = createApi({
  name: types.FETCH_USER,
  request: rest.fetchUser
});
