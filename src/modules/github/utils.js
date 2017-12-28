import { prop, path } from "ramda";

// TODO: consider not using it, in favor of having that logic in data providers

// Viewer
export const getViewerOrgs = viewer => viewer.organizations.nodes;

// Organization
// TODO: change to isOrgAdmin
export const onlyAdminOrgs = orgs => orgs.filter(prop("viewerCanAdminister"));
export const getOrgLogin = prop("login");
export const getOrgRepos = path(["repositories", "nodes"]);

// Repository
export const getRepoName = prop("name");
export const getRepoFullName = prop("nameWithOwner");
export const isRepoAdmin = prop("viewerCanAdminister");
