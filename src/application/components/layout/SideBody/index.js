import React from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  background-color: #ecf0f1;
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
