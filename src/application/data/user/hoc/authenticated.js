import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, lifecycle } from "recompose";
import { push } from "react-router-redux";
import { routes } from "application/routes";
import { isAuthenticated } from "../selectors";

export default Component =>
  compose(
    connect(
      createStructuredSelector({
        isAuthenticated
      })
    ),
    lifecycle({
      componentDidMount() {
        const { isAuthenticated, dispatch } = this.props;
        if (!isAuthenticated) {
          dispatch(push(routes.main));
        }
      }
    })
  )(props => (props.isAuthenticated ? <Component {...props} /> : null));
