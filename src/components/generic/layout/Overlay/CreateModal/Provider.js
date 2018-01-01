import yup from "yup";
import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchApi } from "core/data/api";
import { hideCreateWorkspace } from "modules/interface/overlay/actions";
import { createWorkspace } from "modules/workspace/api";
import { fetchOrgs } from "modules/github/api";
import * as selectors from "modules/github/selectors/api/fetchOrgs";
import View from "./View";

export default compose(
  connect(
    createStructuredSelector({
      isCreating: createWorkspace.selectors.isFetching,
      isLoading: selectors.getLoadingStatus,
      adminOrgs: selectors.getAdminOrgs,
      orgs: selectors.getOrgs
    }),
    {
      onClose: hideCreateWorkspace,
      onSubmit: values => createWorkspace.request({ body: values })
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
