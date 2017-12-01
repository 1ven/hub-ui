import { compose, prop } from "ramda";

export const scopeSelector = state => state.app.data.user;

export const getToken = compose(prop("githubToken"), scopeSelector);

export const isAuthenticated = compose(Boolean, getToken);
