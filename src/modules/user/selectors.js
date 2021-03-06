import { compose, prop, path } from "ramda";

export const scopeSelector = state => state.modules.user;

export const getToken = compose(prop("githubToken"), scopeSelector);
export const isAuthenticated = compose(Boolean, getToken);
export const fetchUserApi = compose(path(["api", "fetchUser"]), scopeSelector);
