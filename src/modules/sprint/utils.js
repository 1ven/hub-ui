import { chain, prop } from "ramda";

export const areIssuesEqual = (
  { issue_number, issue_repo },
  { repository, number }
) => issue_number === number && repository.nameWithOwner === issue_repo;

export const getSprintsIssuesRequests = sprints =>
  chain(prop("issues"), sprints).map(({ issue_repo, issue_number }) => {
    const [owner, name] = issue_repo.split("/");
    return {
      number: issue_number,
      owner,
      name
    };
  });
