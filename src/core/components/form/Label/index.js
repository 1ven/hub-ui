import React from "react";
import styled from "styled-components";
import { colors } from "core/theme";

const Wrap = styled.div`
  width: 100%;
  margin-right: 0.75rem;
  &:last-child {
    margin-right: 0;
  }
`;

const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${colors.lightBlack};
  margin-bottom: 0.25rem;
`;

const Desc = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export default ({ title, description, children }) => (
  <Wrap>
    <Title>{title}</Title>
    {description && <Desc>{description}</Desc>}
    {children}
  </Wrap>
);
