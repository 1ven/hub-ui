import React from "react";
import styled from "styled-components";
import { Field, Formik } from "formik";
import { Input, Label, Row, Select } from "core/components/form";
import { Button, Spinner } from "core/components/kit";
import * as modal from "core/components/modal";
import * as modalForm from "core/components/modal/form";
import OrgsList from "./OrgsList";

const Cancel = styled(Button)`
  margin-right: 0.75rem;
`;

export default ({
  adminOrgs,
  orgs,
  isLoading,
  validation,
  isCreating,
  onClose,
  onSubmit
}) => (
  <modal.Wrap onClose={onClose}>
    {isLoading ? (
      <Spinner color="light" />
    ) : (
      <modal.Box title="Create workspace" onClose={onClose}>
        <Formik
          initialValues={{
            slug: "",
            assigned_to: "",
            repos: []
          }}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <modalForm.Body>
                <Row>
                  <Label title="Name">
                    <Field
                      name="slug"
                      placeholder="Workspace name"
                      component={Input}
                    />
                  </Label>
                  <Label title="Organization">
                    <Field name="assigned_to" component={Select}>
                      <option value="">Select workspace organization</option>
                      {adminOrgs.map(org => (
                        <option key={org} value={org}>
                          {org}
                        </option>
                      ))}
                    </Field>
                  </Label>
                </Row>
                <Row>
                  <Label
                    description="Pick up repositories, which will be inside of your workspace. You can choose only repos, where you are having admin rights"
                    title="Repositories"
                  >
                    <Field name="repos" component={OrgsList} orgs={orgs} />
                  </Label>
                </Row>
              </modalForm.Body>
              <modalForm.Footer>
                <div className="ml-auto">
                  <Cancel theme="bordered" onClick={onClose}>
                    Cancel
                  </Cancel>
                  <Button isLoading={isCreating} type="submit">
                    {isCreating ? "Creating..." : "Create"}
                  </Button>
                </div>
              </modalForm.Footer>
            </form>
          )}
        </Formik>
      </modal.Box>
    )}
  </modal.Wrap>
);
