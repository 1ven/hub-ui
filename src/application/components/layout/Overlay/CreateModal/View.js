import React from "react";
import { Input, Label, Row, Select } from "core/components/form";
import * as modal from "../../../modal";

export default ({ onClose }) => (
  <modal.Wrap onClose={onClose}>
    <modal.Box title="Create workspace" onClose={onClose}>
      <Row>
        <Label title="Name">
          <Input placeholder="Workspace name" />
        </Label>
        <Label title="Organization">
          <Select>
            <option>Select workspace organization</option>
          </Select>
        </Label>
      </Row>
    </modal.Box>
  </modal.Wrap>
);
