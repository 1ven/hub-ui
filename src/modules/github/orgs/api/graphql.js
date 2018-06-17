import { graphql } from "core/data/api/fetch";

export const fetchOrgs = () =>
  graphql({
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
  });
