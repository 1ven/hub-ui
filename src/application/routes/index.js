import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./main";
import Auth from "./auth";
import Workspaces from "./workspaces";

export default () => (
  <Switch>
    <Route exact path={routes.main} component={Main} />
    <Route path={routes.auth} component={Auth} />
    <Route path={routes.workspaces} component={Workspaces} />
  </Switch>
);

export const routes = {
  main: "/",
  auth: "/auth",
  workspaces: "/workspaces"
};
