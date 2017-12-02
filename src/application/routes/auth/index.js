import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import SetToken from "./set-token";

export default () => (
  <Switch>
    <Route exact path={routes.login} component={Login} />
    <Route exact path={routes.setToken} component={SetToken} />
  </Switch>
);

export const routes = {
  login: "/auth/login",
  setToken: "/auth/set-token/:token"
};
