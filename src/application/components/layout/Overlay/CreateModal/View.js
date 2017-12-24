import React from "react";
import { Input, Label, Row, Select } from "core/components/form";
import { Spinner } from "core/components/kit";
import * as modal from "../../../modal";

export default ({ orgs, onClose }) => (
  <modal.Wrap onClose={onClose}>
    {orgs.isFetching ? (
      <Spinner color="light" />
    ) : (
      <modal.Box title="Create workspace" onClose={onClose}>
        <Row>
          <Label title="Name">
            <Input placeholder="Workspace name" />
          </Label>
          <Label title="Organization">
            <Select>
              <option>Select workspace organization</option>
              {orgs.data.map(org => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </Select>
          </Label>
        </Row>
      </modal.Box>
    )}
  </modal.Wrap>
);
