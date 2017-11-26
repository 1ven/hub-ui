import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./main";

export default () => (
  <Switch>
    <Route path="/" component={Main} />
  </Switch>
);
