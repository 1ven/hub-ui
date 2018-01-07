import * as sprintModel from "modules/sprint/utils";

export const getBacklogIssues = (issues, sprintsIssues) =>
  issues.filter(issue =>
    sprintsIssues.reduce(
      (acc, sprintIssue) =>
        !sprintModel.areIssuesEqual(sprintIssue, issue) ? acc : false,
      true
    )
  );
