import React from "react";
import { Container } from "core/components/grid";
import { Overlay } from "application/components/layout";

export default () => (
  <Overlay>
    <Container>Oops! You have no workspaces.</Container>
  </Overlay>
);
