import { createApi } from "core/lib/redux-graphql";
import * as types from "./types";

export const fetchOrgs = createApi({
  name: types.FETCH_ORGS,
  request: {
    query: `
      query {
        viewer {
          organizations(first: 50) {
            nodes {
              login
              viewerCanAdminister
            }
          }
        }
      }
    `
  }
});
