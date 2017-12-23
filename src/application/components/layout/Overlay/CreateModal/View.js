import React from "react";
import * as modal from "../../../modal";

export default ({ onClose }) => (
  <modal.Wrap onClose={onClose}>
    <modal.Box title="Create workspace" onClose={onClose}>
      test
    </modal.Box>
  </modal.Wrap>
);
