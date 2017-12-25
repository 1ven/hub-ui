import { compose, withProps } from "recompose";
import yup from "yup";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withUserAdminOrgs } from "modules/github/hoc";
import { hideCreateWorkspace } from "modules/interface/actions";
import { createWorkspace } from "modules/workspace/api";
import View from "./View";

export default compose(
  withUserAdminOrgs,
  connect(
    createStructuredSelector({
      isCreating: createWorkspace.selectors.isFetching
    }),
    {
      onClose: hideCreateWorkspace,
      onSubmit: values => createWorkspace.request({ body: values })
    }
  ),
  withProps({
    validation: yup.object().shape({
      slug: yup.string().required("Name is required"),
      assigned_to: yup.string().required("Organization is required")
    })
  })
)(View);
