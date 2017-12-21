import { compose, lifecycle } from "recompose";
import { F } from "ramda";
import { connect } from "react-redux";
import { user as userData } from "application/data";
import { unauthenticated } from "application/hoc";

export default compose(
  unauthenticated,
  connect(),
  lifecycle({
    componentDidMount() {
      const { dispatch, match } = this.props;
      dispatch(userData.actions.authenticate(match.params.token));
    }
  })
)(F);
