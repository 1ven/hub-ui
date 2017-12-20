import { compose, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withApi } from "core/api";
import { data } from "modules/user";
import View from "./View";

export default compose(
  withApi(data.api.fetchUser, api => ({
    workspaces: api.data.workspaces,
    isLoading: !api.lastUpdated
  }))
)(View);
