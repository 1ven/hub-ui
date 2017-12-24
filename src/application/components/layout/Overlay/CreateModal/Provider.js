import { compose } from "recompose";
import { withActions } from "core/data/redux/hoc";
import { withUserAdminOrgs } from "modules/github/hoc";
import { actions } from "../../../../data/modals";
import View from "./View";

export default compose(
  withUserAdminOrgs,
  withActions({
    onClose: actions.hideCreateWorkspace
  })
)(View);
