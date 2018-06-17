import React from "react";
import { withProps, compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { T } from "ramda";
import { hoc } from "core/data/redux";
import { fetchApi } from "core/data/api";
import { fetchWorkspaces } from "modules/workspace/api";
import { fetchWorkspacesApi } from "modules/workspace/selectors";
import { fetchUser } from "../api";
import { fetchUserApi } from "../selectors";
import { authorizationRedirect } from "../actions";
import authenticated from "./authenticated";

export default (test = T) => Component =>
  compose(
    authenticated,
    // NOTE: we are using `fetchUser` just for example, as we are getting workspaces from api below
    // will need `fetchUser` api in future
    fetchApi(fetchUser, {
      selector: fetchUserApi,
      key: "user",
      sync: true
    }),
    fetchApi(fetchWorkspaces, {
      selector: fetchWorkspacesApi,
      key: "workspaces",
      sync: true
    }),
    withProps(({ workspaces, user }) => ({
      isAllowed: test({ workspaces: workspaces.data, user: user.data })
    })),
    hoc.withActions({
      authorizationRedirect: () => authorizationRedirect
    }),
    lifecycle({
      componentDidMount() {
        const {
          isAllowed,
          user,
          workspaces,
          authorizationRedirect
        } = this.props;

        console.log(this.props);

        if (!isAllowed) {
          authorizationRedirect({
            user: user.data,
            workspaces: workspaces.data
          });
        }
      }
    })
  )(({ isAllowed, ...props }) => (isAllowed ? <Component {...props} /> : null));
