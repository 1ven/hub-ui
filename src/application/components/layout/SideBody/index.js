import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";

const Sidebar = styled.div`
  background-color: ${colors.gray};
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export default ({ children }) => (
  <div className="container h-100">
    <div className="row h-100">
      <Sidebar className="col-2">test</Sidebar>
      <div className="col">{children}</div>
    </div>
  </div>
);
