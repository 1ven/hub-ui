import { compose, lifecycle } from "recompose";
import { F } from "ramda";
import { connect } from "react-redux";
import { actions } from "../../../data";
import { authenticated } from "../../../hoc";

export default compose(
  authenticated(isAuthenticated => !isAuthenticated),
  connect(),
  lifecycle({
    componentDidMount() {
      const { dispatch, match } = this.props;
      dispatch(actions.authenticate(match.params.token));
    }
  })
)(F);
