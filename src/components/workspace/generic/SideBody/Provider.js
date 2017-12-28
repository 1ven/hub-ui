import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import View from "./View";

export default compose(
  withRouter,
  withProps(({ match }) => ({
    path: `/w/${match.params.org}/${match.params.slug}`
  }))
)(View);
