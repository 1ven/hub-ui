import { compose, path } from "ramda";
import { scopeSelector } from "../";

export const fetchIssuesApi = compose(
  path(["api", "fetchIssues"]),
  scopeSelector
);
