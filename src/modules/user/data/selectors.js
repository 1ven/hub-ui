import { compose, prop } from "ramda";

export const scopeSelector = state => state.modules.user;

export const getToken = compose(prop("githubToken"), scopeSelector);

export const isAuthenticated = compose(Boolean, getToken);
