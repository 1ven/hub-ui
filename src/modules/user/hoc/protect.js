import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, lifecycle } from "recompose";
import { isAuthenticated } from "../data/selectors";
import { protectRedirect } from "../data/actions";

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
        if (!test(this.props)) {
          dispatch(protectRedirect());
        }
      }
    })
  )(props => (test(props) ? <Component {...props} /> : null));
