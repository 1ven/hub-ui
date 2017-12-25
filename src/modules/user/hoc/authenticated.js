import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, lifecycle } from "recompose";
import { isAuthenticated } from "../selectors";
import { authenticationRedirect } from "../actions";

export default Component =>
  compose(
    connect(
      createStructuredSelector({
        isAuthenticated
      }),
      {
        redirect: authenticationRedirect
      }
    ),
    lifecycle({
      componentDidMount() {
        if (!this.props.isAuthenticated) {
          this.props.redirect();
        }
      }
    })
  )(props => (props.isAuthenticated ? <Component {...props} /> : null));
