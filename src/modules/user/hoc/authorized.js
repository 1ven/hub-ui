import React from "react";
import { withProps, compose, lifecycle } from "recompose";
import { T } from "ramda";
import { hoc } from "core/data/redux";
import { withApi } from "core/data/api";
import { fetchWorkspaces } from "modules/workspace/api";
import { fetchUser } from "../api";
import { authorizationRedirect } from "../actions";
import authenticated from "./authenticated";

export default (test = T) => Component =>
  compose(
    authenticated,
    // NOTE: we are using `fetchUser` just for example, as we are getting workspaces from api below
    // will need `fetchUser` api in future
    withApi(fetchUser, api => ({
      user: api.data
    })),
    withApi(fetchWorkspaces, api => ({
      workspaces: api.data
    })),
    withProps(({ workspaces, user }) => ({
      isAllowed: test({ workspaces, user })
    })),
    hoc.withActions({
      authorizationRedirect
    }),
    lifecycle({
      componentDidMount() {
        const {
          isAllowed,
          user,
          workspaces,
          authorizationRedirect
        } = this.props;

        if (!isAllowed) {
          authorizationRedirect({ user, workspaces });
        }
      }
    })
  )(({ isAllowed, ...props }) => (isAllowed ? <Component {...props} /> : null));
