import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { replaceParams } from "core/utils";
import paths from "routes/paths";
import View from "./View";

export default compose(
  withRouter,
  withProps(({ match }) => ({
    links: {
      issues: replaceParams(paths.issues, match.params)
    }
  }))
)(View);
