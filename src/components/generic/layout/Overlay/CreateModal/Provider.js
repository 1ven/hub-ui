import yup from "yup";
import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchApi } from "core/data/api";
import { hideCreateWorkspace } from "modules/interface/overlay/actions";
import { createWorkspace } from "modules/workspace/api";
import * as workspaceSelectors from "modules/workspace/selectors";
import { fetchOrgs } from "modules/github/orgs/api";
import * as selectors from "modules/github/orgs/selectors";
import View from "./View";

export default compose(
  connect(
    createStructuredSelector({
      isCreating: workspaceSelectors.isCreating,
      isLoading: selectors.getLoadingStatus,
      adminOrgs: selectors.getAdminOrgs,
      orgs: selectors.getOrgs
    }),
    {
      onClose: hideCreateWorkspace,
      onSubmit: createWorkspace.request
    }
  ),
  fetchApi(fetchOrgs, ({ orgs }) => ({
    shouldFetch: !orgs
  })),
  withProps({
    validation: yup.object().shape({
      slug: yup.string().required("Name is required"),
      assigned_to: yup.string().required("Organization is required"),
      repos: yup.array().min(1, "You should pick at least one repository")
    })
  })
)(View);
