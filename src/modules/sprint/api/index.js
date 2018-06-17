import { createApi } from "core/lib/redux-graphql";
import * as types from "../types";
import * as rest from "./rest";

export const fetchSprints = createApi({
  name: types.FETCH_SPRINTS,
  request: rest.fetchSprints
});
