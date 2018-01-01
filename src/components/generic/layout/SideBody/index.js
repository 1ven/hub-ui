import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";

const Sidebar = styled.div`
  border-right: 1px solid ${colors.darkGray};
  padding-top: 0.675rem;
  padding-bottom: 0.675rem;
`;

export default ({ children, sidebar }) => (
  <div className="container h-100">
    <div className="row h-100">
      <Sidebar className="col-2">
        <div>{sidebar}</div>
      </Sidebar>
      <div className="flex-auto">{children}</div>
    </div>
  </div>
);
