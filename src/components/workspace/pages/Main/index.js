import { connect } from "react-redux";
import { F } from "ramda";
import { push } from "react-router-redux";
import { withRouter } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import { replaceParams } from "core/utils";
import paths from "routes/paths";

export default compose(
  withRouter,
  connect(),
  lifecycle({
    componentDidMount() {
      this.props.dispatch(
        push(replaceParams(paths.backlog, this.props.match.params))
      );
    }
  })
)(F);
