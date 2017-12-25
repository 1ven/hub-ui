import React from "react";
import { Container } from "components/generic/grid";
import { Overlay } from "components/generic/layout";

export default () => (
  <Overlay>
    <Container>Oops! You have no workspaces.</Container>
  </Overlay>
);
