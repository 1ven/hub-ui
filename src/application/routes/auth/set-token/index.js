import { compose, lifecycle } from "recompose";
import { F, prop, not } from "ramda";
import { connect } from "react-redux";
import { actions as userActions } from "application/data/user";
import { protect } from "application/data/user/hoc";

export default compose(
  protect(compose(not, prop("isAuthenticated"))),
  connect(),
  lifecycle({
    componentDidMount() {
      const { dispatch, match } = this.props;
      dispatch(userActions.authenticate(match.params.token));
    }
  })
)(F);
