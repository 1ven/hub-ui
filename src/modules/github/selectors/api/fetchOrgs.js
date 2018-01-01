import { compose, path } from "ramda";
import { scopeSelector } from "../";

export const getApi = compose(path(["api", "fetchReposByOrg"]), scopeSelector);
