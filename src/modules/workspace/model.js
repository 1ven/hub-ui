// keep all business logic here
export const getWorkspaceReposById = (workspaces, id) =>
  workspaces.find(w => w.id === id).repos.map(repo => {
    const [owner, name] = repo.split("/");
    return {
      owner,
      name
    };
  });
