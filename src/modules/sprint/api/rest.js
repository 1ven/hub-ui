import { rest } from "core/data/api/fetch";

export const fetchSprints = ({ workspaceId }) =>
  rest({
    path: `/workspaces/${workspaceId}/sprints`,
    method: "GET"
  });
