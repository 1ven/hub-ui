import { compose, lifecycle } from "recompose";
import { F } from "ramda";
import { connect } from "react-redux";
import * as user from "modules/user";

export default compose(
  user.hoc.unauthenticated,
  connect(),
  lifecycle({
    componentDidMount() {
      const { dispatch, match } = this.props;
      dispatch(user.data.actions.authenticate(match.params.token));
    }
  })
)(F);
