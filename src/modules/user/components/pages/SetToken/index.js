import { compose, lifecycle } from "recompose";
import { F, prop, not } from "ramda";
import { connect } from "react-redux";
import { actions } from "../../../data";
import { protect } from "../../../hoc";

export default compose(
  protect(compose(not, prop("isAuthenticated"))),
  connect(),
  lifecycle({
    componentDidMount() {
      const { dispatch, match } = this.props;
      dispatch(actions.authenticate(match.params.token));
    }
  })
)(F);
