import { compose, withProps } from "recompose";
import yup from "yup";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withUserAdminOrgs } from "modules/github/hoc";
import { actions } from "../../../../data/modals";
import { api } from "../../../../data/workspace";
import View from "./View";

export default compose(
  withUserAdminOrgs,
  connect(
    createStructuredSelector({
      isCreating: api.createWorkspace.selectors.isFetching
    }),
    {
      onClose: actions.hideCreateWorkspace,
      onSubmit: values => api.createWorkspace.request({ body: values })
    }
  ),
  withProps({
    validation: yup.object().shape({
      slug: yup.string().required("Name is required"),
      assigned_to: yup.string().required("Organization is required")
    })
  })
)(View);
