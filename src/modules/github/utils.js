import { prop, path } from "ramda";

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
