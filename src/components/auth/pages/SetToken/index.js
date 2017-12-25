import { compose, lifecycle } from "recompose";
import { F } from "ramda";
import { connect } from "react-redux";
import { authenticate } from "modules/user/actions";
import { unauthenticated } from "modules/user/hoc";

export default compose(
  unauthenticated,
  connect(),
  lifecycle({
    componentDidMount() {
      const { dispatch, match } = this.props;
      dispatch(authenticate(match.params.token));
    }
  })
)(F);
