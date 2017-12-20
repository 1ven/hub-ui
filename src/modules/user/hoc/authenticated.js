import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, lifecycle } from "recompose";
import { isAuthenticated } from "../data/selectors";
import { authenticationRedirect } from "../data/actions";

export default test => Component =>
  compose(
    connect(
      createStructuredSelector({
        isAuthenticated
      })
    ),
    lifecycle({
      componentDidMount() {
        const { dispatch } = this.props;
        if (!test(this.props.isAuthenticated)) {
          dispatch(authenticationRedirect());
        }
      }
    })
  )(props => (test(props.isAuthenticated) ? <Component {...props} /> : null));
