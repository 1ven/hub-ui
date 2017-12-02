import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./main";
import Auth from "./auth";
import Organizations from "./organizations";

export default () => (
  <Switch>
    <Route exact path={routes.main} component={Main} />
    <Route path={routes.auth} component={Auth} />
    <Route path={routes.orgs} component={Organizations} />
  </Switch>
);

export const routes = {
  main: "/",
  auth: "/auth",
  orgs: "/organizations"
};
