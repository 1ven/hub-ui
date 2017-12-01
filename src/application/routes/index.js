import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./main";
import Auth from "./auth";

export default () => (
  <Switch>
    <Route exact path={routes.main} component={Main} />
    <Route path={routes.auth} component={Auth} />
  </Switch>
);

export const routes = {
  main: "/",
  auth: "/auth",
  orgs: "/organizations"
};
