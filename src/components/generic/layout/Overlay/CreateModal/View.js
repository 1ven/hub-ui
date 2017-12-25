import React from "react";
import styled from "styled-components";
import { Field, Formik } from "formik";
import { Input, Label, Row, Select } from "components/generic/form";
import { Button, Spinner } from "components/generic/kit";
import * as modal from "components/generic/modal";
import * as modalForm from "components/generic/modal/form";

const Cancel = styled(Button)`
  margin-right: 0.75rem;
`;

export default ({ orgs, validation, isCreating, onClose, onSubmit }) => (
  <modal.Wrap onClose={onClose}>
    {orgs.isFetching ? (
      <Spinner color="light" />
    ) : (
      <modal.Box title="Create workspace" onClose={onClose}>
        <Formik validationSchema={validation} onSubmit={onSubmit}>
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
                      {orgs.data.map(org => (
                        <option key={org} value={org}>
                          {org}
                        </option>
                      ))}
                    </Field>
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
