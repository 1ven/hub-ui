import React from "react";
import { Route, Switch } from "react-router-dom";
import GitHub from "./github";
import { routes as parentRoutes } from "../";

export default ({ match }) => (
  <Switch>
    <Route exact path={match.url + "/github"} component={GitHub} />
  </Switch>
);
