import { compose, path } from "ramda";
import { createSelector } from "reselect";

export const scopeSelector = state => state.modules.workspace;

export const getCreateWorkspaceApi = compose(
  path(["api", "createWorkspace"]),
  scopeSelector
);

export const fetchWorkspacesApi = compose(
  path(["api", "fetchWorkspaces"]),
  scopeSelector
);

export const getCurrentWorkspace = createSelector(
  [fetchWorkspacesApi, (_, { match }) => match],
  ({ data }, { params }) =>
    data &&
    // TODO: use function to match router params with workspace data
    data.find(w => w.assigned_to === params.org && w.slug === params.slug)
);

export const getCurrentWorkspaceRepos = createSelector(
  [getCurrentWorkspace],
  workspace =>
    workspace &&
    workspace.repos.map(repo => {
      const [owner, name] = repo.split("/");
      return {
        owner,
        name
      };
    })
);
