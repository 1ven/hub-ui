import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import queryString from "query-string";
import { api } from "application/data/user";

export default compose(
  connect(void 0, {
    authenticate: code => api.authenticateGitHub.request({ body: { code } })
  }),
  lifecycle({
    componentDidMount() {
      const { code } = queryString.parse(this.props.location.search);
      this.props.authenticate(code);
      console.log(code);
    }
  })
)(() => <div />);
