import React from "react";
import { compose, lifecycle } from "recompose";
import { T } from "ramda";
import { hoc } from "core/redux";
import { authorizationRedirect } from "../data/actions";
import { withApi } from "core/api";
import { fetchUser } from "../data/api";
import authenticated from "./authenticated";

export default (test = T) => Component =>
  compose(
    authenticated,
    withApi(fetchUser, api => ({
      user: api.data
    })),
    hoc.withActions({
      authorizationRedirect
    }),
    lifecycle({
      componentDidMount() {
        if (!test(this.props.user)) {
          this.props.authorizationRedirect();
        }
      }
    })
  )(props => (test(props.user) ? <Component {...props} /> : null));
