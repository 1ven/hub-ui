import { rest } from "core/data/api/fetch";

export const createWorkspace = workspace =>
  rest({
    path: `/workspaces`,
    method: "POST",
    body: workspace
  });

export const fetchWorkspaces = () =>
  rest({
    path: "/workspaces",
    method: "GET"
  });
