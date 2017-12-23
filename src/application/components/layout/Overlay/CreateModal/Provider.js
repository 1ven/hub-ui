import { compose, branch, renderComponent, renderNothing } from "recompose";
import { prop, F } from "ramda";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { actions, selectors } from "../../../../data/modals";
import View from "./View";

export default compose(
  connect(
    createStructuredSelector({
      isVisible: selectors.isCreateWorkspaceVisible
    }),
    {
      onClose: actions.hideCreateWorkspace
    }
  ),
  branch(prop("isVisible"), renderComponent(View), renderNothing)
)(F);
