import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login";

export default ({ match }) => (
  <Switch>
    <Route exact path={match.url + "/login"} component={Login} />
  </Switch>
);
