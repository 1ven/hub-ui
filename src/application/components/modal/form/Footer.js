import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";

const Wrap = styled.div`
  background-color: ${colors.gray};
  border-top: 1px solid ${colors.darkGray};
  padding: 1rem 1.5rem;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

export default ({ children }) => (
  <Wrap className="flex items-center">{children}</Wrap>
);
