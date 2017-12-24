import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";
import { Icon } from "core/components/kit";

const Wrap = styled.div`
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: ${colors.red};
  color: ${colors.white};
  margin-top: -1px;
  font-size: 0.875rem;
  padding: 0.25rem 0.5625rem;
  display: flex;
  align-items: center;
`;

const ErrorIcon = styled(Icon)`
  margin-right: 0.125rem;
`;

export default ({ children }) => (
  <Wrap>
    <ErrorIcon name="warning" size={0.875} />
    {children}
  </Wrap>
);
