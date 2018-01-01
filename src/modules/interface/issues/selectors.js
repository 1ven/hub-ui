import { compose, prop } from "ramda";

export const scopeSelector = state => state.modules.interface.issues;

export const getCurrentPage = compose(prop("currentPage"), scopeSelector);
