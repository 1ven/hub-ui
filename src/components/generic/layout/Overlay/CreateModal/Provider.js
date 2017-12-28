import yup from "yup";
import { prop } from "ramda";
import { compose, withProps } from "recompose";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { hideCreateWorkspace } from "modules/interface/actions";
import { createWorkspace } from "modules/workspace/api";
import { ORGS_QUERY } from "modules/github/graphql";
import View from "./View";

export default compose(
  graphql(ORGS_QUERY, {
    props: ({ data: { loading, viewer } }) => ({
      isLoading: loading,
      adminOrgs:
        viewer &&
        viewer.organizations.nodes
          .filter(prop("viewerCanAdminister"))
          .map(prop("login")),
      orgs: viewer && viewer.organizations.nodes.map(prop("login"))
    })
  }),
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
      assigned_to: yup.string().required("Organization is required"),
      repositories: yup
        .array()
        .min(1, "You should pick at least one repository")
    })
    // onSubmit: values => console.log(values)
  })
)(View);
