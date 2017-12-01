import { compose, path } from "ramda";
import { createApi } from "redux-server-middleware";
import { SCOPE } from "./types";
import { scopeSelector } from "./selectors";

export const authenticateGitHub = createApi({
  name: SCOPE + "/AUTHENTICATE_GITHUB",
  url: process.env.REACT_APP_API + "/auth/github",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  map: {
    request: JSON.stringify
  },
  selector: compose(path(["api", "authenticateGithub"]), scopeSelector)
});
