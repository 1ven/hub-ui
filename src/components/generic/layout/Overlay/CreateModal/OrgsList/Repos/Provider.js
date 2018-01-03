import { compose } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withActions } from "core/data/redux/hoc";
import { fetchApi } from "core/data/api";
import { fetchReposByOrg } from "modules/github/repos/api";
import * as selectors from "modules/github/repos/selectors";
import View from "./View";

export default compose(
  connect(
    createStructuredSelector({
      hasMore: selectors.hasMoreRepos,
      repos: selectors.getAdminReposByOrg,
      cursor: selectors.getReposCursor,
      isLoading: selectors.reposLoadingStatus
    })
  ),
  fetchApi(fetchReposByOrg, ({ org, repos }) => ({
    payload: {
      org
    },
    shouldFetch: !repos
  })),
  withActions(({ org, cursor }) => ({
    loadMore: () => fetchReposByOrg.request({ org, cursor })
  }))
)(View);
